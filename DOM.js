
const ADD_BUTTON = document.getElementById('addButton');
const INPUT = document.getElementById('toDoInput');
const TO_DO_LIST_CONTAINER = document.getElementById('toDoListContainer');
//inputButtonContainer

ADD_BUTTON.addEventListener('click', addToDo);

let toDoItems = [];


function ToDo (description) { 
  this.description = description;
  this.complete = false;  
}


ToDo.prototype.completeToDo = function() {
  this.complete = true;
}


function buildToDo(todo, index) {

  const toDoContainer = document.createElement('div');
  toDoContainer.className = 'toDoContainer';
  toDoContainer.id = 'toDoContainer' + index;

  // const toDoText = document.createElement('span'); 
  // toDoText.className = 'toDoText';
  // toDoText.innerHTML = todo.description; ///Si no sirve BORRARLO
  // toDoText.id = index; ///Si no sirve BORRARLO

  const checkboxInput = document.createElement('input'); 
  checkboxInput.setAttribute("type","checkbox");
  checkboxInput.className = 'checkboxInput';
  checkboxInput.id = 'checkbox' + index;

  checkboxInput.addEventListener('click', () => tachar(index));
  
  const toDoText = document.createElement('span'); 
  toDoText.className = 'toDoText';
  toDoText.innerHTML = todo.description;
  toDoText.id = 'texto' + index;

  toDoText.addEventListener('click', event => completeToDo(event));
  
  const iconDelete = document.createElement('img');
  iconDelete.setAttribute("src","./delete.jpg");
  iconDelete.className = 'iconDelete'
  toDoText.id = 'iconDelete' + index;

  iconDelete.addEventListener('click', () => deleteToDo(index));

  if (todo.complete === true) {
    toDoText.className = 'completeText';  //Pasar a verde
  }

  toDoContainer.appendChild(checkboxInput);
  toDoContainer.appendChild(toDoText);
  toDoContainer.appendChild(iconDelete);

  return toDoContainer;
}


function buildToDoList(toDos) { 
    return toDos.map((todo, index) => buildToDo(todo, index)); 
}


function displayToDoList() {

  TO_DO_LIST_CONTAINER.innerHTML = "";

  let toDo = buildToDoList(toDoItems)  //Trae array con tareas construidas
  
  for (let i = 0; i < toDo.length; i++) {
    TO_DO_LIST_CONTAINER.appendChild(toDo[i]);  //Agrega de a una a la pantalla
  }
}


function addToDo() {

  let emptyToDo = document.getElementById('emptyToDo');

  if(!!INPUT.value) {
    emptyToDo.className = 'emptyToDoDesactive'

    let newToDo = new ToDo(INPUT.value);
    toDoItems.push(newToDo);
    INPUT.value = "";
    displayToDoList();

  } else {
    emptyToDo.className = 'emptyToDoActive'
  }
};


function completeToDo(event) {

  const index = event.target.id;

  completeToDo();
  displayToDoList();
}

function tachar(index) {
  let toDoText = document.getElementById("texto" + index)
  
  if (toDoText.className == "lineThroughText") {
    toDoText.className = "text";
    this.complete = false;
  } else {
    toDoText.className = "lineThroughText";
    this.complete = true;
  }
}

function deleteToDo(index) {
  let toDoContainer = document.getElementById('toDoContainer' + index);

  if (this.complete === true) {
    TO_DO_LIST_CONTAINER.removeChild(toDoContainer);
  } 
}


displayToDoList();

