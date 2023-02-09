let head = document.querySelector(".head")
let form = document.querySelector("form")
let form2 = document.querySelector(".form2")
let modal = document.querySelector(".modal")
let modal1 = document.querySelector(".modal1")
let submit = document.querySelector(".submit")
let thead = document.querySelector(".thead")
let box = document.querySelector(".box")
let close1 = document.querySelector(".close")
let close2 = document.querySelector(".close2")
let yes = document.querySelector(".yes")
let no = document.querySelector(".no")
window.onclick = (event)=>{
    if(event.target == modal || event.target == modal1){
        modal.style.display = "none"
        modal1.style.display = "none"
    }
}
close1.onclick = ()=>{
    modal.style.display = "none"
}
close2.onclick = ()=>{
    modal1.style.display = "none"
}

//////////GET
let getData = async function(){
    try {
        let {data} = await axios.get("https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents")
        getUser(data)
    }
    catch (error) {
        console.log(error);
    }
}
/////////DELETE
let nameDelete = async function(id){
    try {
        
        modal1.style.display = "block"
        yes.onclick = async()=>{
            let {data}= await axios.delete(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents/${id}`)
            getData()
            modal1.style.display = "none"
        }
        no.onclick = async()=>{
            modal1.style.display = "none"
        }
    }
    catch (error) {
        console.log(error);
    }
}
////////////ADD
let addNew = async function(editUser){
    try {
        let {data} = await axios.post(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents/`, editUser)
        getData()   
    }
    catch (error) {
        console.log(error);
    }
}
form.onsubmit =(event) =>{
    event.preventDefault()
    let obj = {
        id:new Date().getTime(),
        type_document:event.target["type"].value,
        description:event.target["description"].value,
        status:event.target["status"].value
    }
    addNew(obj)
    form.reset()
}
/////////////////EDIT

let openModal = async function(id){
    try {
        modal.style.display='block'
        let {data} = await axios.get(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents/${id}`)
        form2["type"].value = data["type_document"]
        form2["description"].value = data["description"]
        form2["status"].value = data["status"]
        form2.onsubmit = (e)=>{
            e.preventDefault();
            let myUser = {
                'type_document':e.target["type"].value,
                'description':e.target["description"].value,
                'status':e.target["status"].value
            }
            change(id, myUser)
            modal.style.display='none'
        }
    }   
    catch (error) {
        console.log(error);
    }
}
let change = async function(id, myUser){
    try {
        let {data} = await axios.put(`https://63d14a1e3f08e4a8ff94b1a5.mockapi.io/documents/${id}`, myUser)
        getData();

    }
    catch (error) {
        console.log(error);    
    }
}

function getUser(ar){
    let table = document.querySelector("table")
    table.innerHTML = ' '
    ar.forEach(element => {
        let TR = document.createElement("tr")
        let id1 = document.createElement("td")
        let type1 = document.createElement("td")
        let description1  = document.createElement("td")
        let status1 = document.createElement("td")
        id1.innerHTML = element["id"]
        type1.innerHTML = element["type_document"]
        description1.innerHTML = element["description"]
        status1.innerHTML = element["status"]
        //DELETE
        let btn = document.createElement("td")
        let Delete = document.createElement("button")
        Delete.innerHTML = "Delete"
        Delete.setAttribute("class","delete")
        Delete.onclick=()=>{
            nameDelete(element.id)
        }
        ///EDIT
        let edit = document.createElement("button")
        edit.setAttribute("class", "edit")
        edit.innerHTML = "Edit"
        edit.onclick = ()=>{
            openModal(element.id)
        }
        TR.appendChild(id1)
        TR.appendChild(type1)
        TR.appendChild(description1)
        TR.appendChild(status1)
        btn.appendChild(Delete)
        btn.appendChild(edit)
        TR.appendChild(btn)
        table.appendChild(TR)
    });
}

getData()