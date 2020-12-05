const nameForm = document.querySelector(".name");
const todoForm = document.querySelector(".todo");
const helloName = document.querySelector(".helloName");
const toDoListUL = document.querySelector("ul");
const nameKey = "name";
const todoKey = "todo";

let name = "";
let toDoLists = [];
//load하고 delete 할지 append 할지 결정하는거....
function loadingLoaclStorage(){
    name = localStorage.getItem(nameKey);
    toDoLists = JSON.parse(localStorage.getItem(todoKey));
}
function setLocalStorage(){
    localStorage.setItem(nameKey, name);
    localStorage.setItem(todoKey, JSON.stringify(toDoLists));
}

function handleNameSubmit(e){
    e.preventDefault();
    const text = e.target.querySelector("input").value;
    name = text;
    setLocalStorage();
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoListUL.removeChild(li);
    const cleanToDos = toDoLists.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDoLists = cleanToDos;
    setLocalStorage();
  }

function handleToDoSubmit(e){
    e.preventDefault();
    const text = e.target.querySelector("input").value;
    e.target.querySelector("input").value = "";
    paintToDo(text);
    const newId = toDoLists.length;
    const toDoObj = {
        text: text,
        id: newId
    };
    toDoLists.push(toDoObj);
    setLocalStorage();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDoLists.length;
    delBtn.innerText = "D";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoListUL.appendChild(li);
    setLocalStorage();
}


function init(){
    loadingLoaclStorage();
    if(toDoLists==="null" || toDoLists === null){
        toDoLists = [];
    }
    if(name===null){
        nameForm.addEventListener("submit", handleNameSubmit);
    } else{
        nameForm.remove();
        helloName.innerHTML=`<h2>Welcome! ${name}</h2>`;

    }
    todoForm.addEventListener("submit", handleToDoSubmit);
    toDoLists.forEach((toDo)=>{
        paintToDo(toDo.text);
    })
}

init();