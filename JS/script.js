const tarefa = document.querySelector("#tarefa");
const btnTarefa = document.querySelector("#btn-tarefa");
const container06 = document.querySelector(".container-06");
const edit06 = document.querySelector(".edit-06")
const pesquisa = document.querySelector("#pesquisa");
const filtro = document.querySelector("#filtro");
const btnLimpar = document.querySelector("#btn-limpar");
const main = document.querySelector("main");
let tarefaValue;
const editContainer = document.querySelector(".edit-task")
const editInput = document.querySelector("#edit");
const btnEdit = document.querySelector("#btn-edit");
const btnCancelar = document.querySelector("#btn-cancelar")

// Events-------------------
btnTarefa.addEventListener("click", (e) => {
    e.preventDefault();
    tarefaValue = tarefa.value;
    if (!tarefaValue) return;
    criarTarefa(tarefaValue);
})
tarefa.addEventListener("keyup", (e) => {
    tarefaValue = tarefa.value;
    const tecla = e.key;
    if (!tarefaValue) {
        return;
    } else if (tecla === "Enter") {
        criarTarefa(tarefaValue);
    }
})

main.addEventListener("click", (e) => {
    const targetEL = e.target;
    if (targetEL.classList.contains("fa-check")) {
        parentEl = targetEL.closest("div");
        completaTarefa(parentEl);
    }
    if (targetEL.classList.contains("fa-xmark")) {
        parentEl = targetEL.closest("div");
        apagaTarefa(parentEl);
    }
    if (targetEL.classList.contains("fa-pen")) {
        parentEl = targetEL.closest("div");
        editaTarefaTAG(parentEl);
        telaUpdate()
    }
})

btnEdit.addEventListener("click", (e) => {
    e.preventDefault()
    const editValue = editInput.value;
    if (!editValue) return;
    editaTarefa(editValue)

})

pesquisa.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();
    const listaContainer = document.querySelectorAll(".tarefa p");
    listaContainer.forEach((lista) => {
        const novaLista = lista.innerText.toLowerCase();
        if (!novaLista.includes(search)) {
            lista.parentElement.parentElement.style.display = "none";
        } else {
            lista.parentElement.parentElement.style.display = "flex";
        }
    })
})
btnCancelar.addEventListener("click", (e)=>{
    e.preventDefault()
    window.location.reload()
})
filtro.addEventListener("click", () => {
    const listaContainer = document.querySelectorAll(".ativo");
    listaContainer.forEach((lista) => {
        switch (filtro.value) {
            case "todos":
                lista.style.display = "flex";
                break;
            case "concluidos":
                (lista.classList.contains("completa"))
                    ? lista.style.display = "flex"
                    : lista.style.display = "none"
                break
            case "nao-concluidos":
                (lista.classList.contains("completa"))
                    ? lista.style.display = "none"
                    : lista.style.display = "flex"
                break;

        }
    })
})

// function--------------------

const criarTarefa = (texto, done = 0, save = 1) => {
    const containerTarefas = document.createElement("div");
    containerTarefas.classList.add("ativo");
    containerTarefas.innerHTML = `
        <div class="tarefa"><p>${texto}</p></div>
        <span class="buttons">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-pen"></i>
            <i class="fa-solid fa-xmark"></i>
        </span>
        `
    if (done) {
        containerTarefas.classList.add("completa");

    }
    if (save) {
        saveTarefasLocalStorage({ texto, done: 0 });
    }


    container06.appendChild(containerTarefas);
    tarefa.value = "";
    tarefa.focus();

}
const apagaTarefa = () => {
    parentEl.style.display = "none";
    const texto = parentEl.querySelector("p").innerText;
    const tarefas = getTarefasLocalStorage();
    const tarefasFiltro = tarefas.filter((lista) => lista.texto != texto);
    localStorage.setItem("tarefas", JSON.stringify(tarefasFiltro));
}


const completaTarefa = (target) => {
    target.classList.toggle("completa");
    const texto = target.querySelector("p").innerText;
    updateLocalStorage(texto);
}

const editaTarefa = (input) => {
    const divText = edit06.querySelector("p").innerText
    editaLocalStorage(divText, input)
}

const editaTarefaTAG = (div) => {
    edit06.appendChild(div);
}

const telaUpdate = ()=>{
    main.classList.toggle("none")
    editContainer.classList.toggle("none")

}

// LocalStorage--------------------------------

const updateLocalStorage = (texto) => {
    const tarefas = getTarefasLocalStorage();
    tarefas.map((lista) => texto === lista.texto ? (lista.done = !lista.done) : null);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
const editaLocalStorage = (texto, input) => {
    const tarefas = getTarefasLocalStorage();
    tarefas.map((lista) => texto === lista.texto ? (lista.texto = input) : null);
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    window.location.reload()
}
const getTarefasLocalStorage = () => {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    return tarefas;
}

const loadTarefas = () => {
    const tarefas = getTarefasLocalStorage();
    tarefas.forEach((lista) => {
        criarTarefa(lista.texto, lista.done, 0);
    })
}

const saveTarefasLocalStorage = (tarefa) => {
    const tarefas = getTarefasLocalStorage();

    tarefas.push(tarefa);

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
loadTarefas()

console.log(localStorage)

//localStorage.clear()


