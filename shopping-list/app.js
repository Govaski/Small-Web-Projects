class Item {
    itemName = "";
    status = false;
    constructor(name){
        this.itemName = name
    }
}

const formAdd = document.getElementById("form-add")
const inputItem = document.getElementById("input-item")
const btnAdd = document.getElementById("btn-add")
const btnClear = document.getElementById("btn-clear")
const itemList = document.getElementById("item-list")
const itemQtd = document.getElementById("item-qtd")
const selectOrder = document.getElementById("order")
const selectFilter = document.getElementById("filter")

let items = []
let qtd = 0;

window.addEventListener("DOMContentLoaded", () => {
    const data = localStorage.getItem('ListaCompras')
    if(data) {
        items = JSON.parse(data)
        renderList()
    }
})

btnClear.addEventListener('click', ()=> {
    if (confirm("Deseja realmente limpar toda a lista?")) {
        items = []
        saveData()
        renderList()
    }
})

formAdd.addEventListener("submit", (event) => {
    event.preventDefault()
    const newItem = new Item(inputItem.value.trim())
    newItem.itemName = inputItem.value.trim()
    if (newItem.itemName === '') return;
    items.push(newItem)
    saveData()
    renderList()
    inputItem.value = ''
})

selectOrder.addEventListener("change", (event) => {
    renderList()
})

selectFilter.addEventListener("change", (event) => {
    renderList()
})

function saveData() {
    localStorage.setItem('ListaCompras', JSON.stringify(items))
}

function renderList() {
    switch (selectOrder.value) {
        case "insertion":
            itemsRender(items)
            break;

        case "alphabet":
            let alphabetItems = [...items]

            alphabetItems.sort((a, b) => {
                if(a.itemName > b.itemName) return 1;
                if(a.itemName < b.itemName) return -1;
            })
            itemsRender(alphabetItems)
            break;
        
        case "status": 
            let statusItem = [...items]
            statusItem.sort((a, b) => a.status - b.status)
            itemsRender(statusItem)
            break;

        default:
            break;
    }
    itemQtd.textContent = "Quantidade: " + qtd
}

function removeItem(index){
    items.splice(index, 1)
    saveData()
    renderList()
}

function itemsRender(itemArray) {
    itemList.innerHTML = '';

    switch (selectFilter.value) {
        case "bought":
            itemArray = [...itemArray].filter((item) => item.status == true)
            break;

        case "pendent":
            itemArray = [...itemArray].filter((item) => item.status == false)
            break;
    
        case "all":
            itemArray = [...itemArray]
            break;
    }

    qtd = itemArray.length
    
    itemArray.forEach((item, index) => {    
        const li = document.createElement('li')
        li.textContent = item.itemName

        const checkbox = document.createElement('input')
        checkbox.type = "checkbox"
        checkbox.checked = item.status
        checkbox.addEventListener('click', () => {
           item.status = !item.status
            saveData()
        })
        
        li.appendChild(checkbox)

        /*const label = document.createElement('label')
        label.textContent = "Comprado?"
        li.appendChild(label)*/

        const btnRemove = document.createElement('button')
        btnRemove.innerHTML = "x"
        btnRemove.addEventListener('click', () => {
            removeItem(index)
        })

        li.appendChild(btnRemove)
        itemList.appendChild(li)
    })
}


//Funcionalidades:
//Marcar como comprado e salvar no localstorage - quase feito
//contador de items - mostar quantos items tem na lista - feito
//adicione filtros para items comprados e pendentes - feito
//permitir ordenar alfabeticamente ou por status - feito