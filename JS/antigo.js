const tarefa = document.querySelector("#tarefa")
const btnTatefa = document.querySelector("#btn-tarefa")
const containerTarefa = document.querySelector(".container-06")
const pesquisa = document.querySelector("#pesquisa")
const filtro = document.querySelector("#filtro")

btnTatefa.addEventListener("click", (e) => {
    e.preventDefault()
    const hour = new Date()
    const chave = hour * 2
    let tarefaValue = tarefa.value
    if (!tarefaValue) return
    localStorage.setItem(chave, (tarefaValue))
    tarefaValue = ""
    window.location.reload()
})


// function buscaStorage() {
//     for (let i = 0; i < localStorage.length; i++) {
//         const chave = (localStorage.key(i))
//         const valor = (localStorage.getItem(chave))

//         const containerTAG = document.createElement("div")
//         containerTAG.classList.add("ativo")
//         containerTAG.innerHTML = `
//         <div class="tarefa"><p>${valor}</p></div>
//         <div class="buttons">
//         <i class="fa-solid fa-check"></i>
//         <i class="fa-solid fa-pen"></i>
//         <i class="fa-solid fa-xmark"></i>
//         </div>`
//         containerTarefa.appendChild(containerTAG)

        const checkBtn = containerTAG.querySelector(".fa-check").addEventListener("click", () => {
            containerTAG.classList.toggle("completa")
        })

        const deleteBtn = containerTAG.querySelector(".fa-xmark").addEventListener("click", () => {
            localStorage.removeItem(chave)
            window.location.reload()
        })

        pesquisa.addEventListener("keyup", (e) => {
            const search = e.target.value.toLowerCase()
            console.log(search)

            const titleEl = containerTAG.querySelector("p").innerText.toLowerCase()

            containerTAG.style.display = "flex"

            if (!titleEl.includes(search)) {
                containerTAG.style.display = "none"
                console.log(search, titleEl)
            }
        })
        const btnLimpaPesquisa = document.querySelector(".fa-delete-left").addEventListener("click", (e) => {
            e.preventDefault()
            pesquisa.value = ""

            pesquisa.dispatchEvent(new Event("keyup"))

        })
        filtro.addEventListener("click", () => {
                switch (filtro.value) {
                case "todos":
                    containerTAG.style.display = "flex"
                    break
                case "concluidos":
                    (containerTAG.classList.contains("completa"))
                        ? containerTAG.style.display = "flex"
                        : containerTAG.style.display = "none"
                    break
                case "nao-concluidos":
                    (containerTAG.classList.contains("completa"))
                        ? containerTAG.style.display = "none"
                        : containerTAG.style.display = "flex"
                    break
            }
        })

    }
}


buscaStorage()



// localStorage.clear()