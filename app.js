const BASE_URL = 'https://628b2f177886bbbb37b20cd9.mockapi.io/todos'
let todosArray = [];


function goToTodoPage(id) {
  let urlString = "/todo.html"
  if (id){
    urlString = urlString + '?id=' + id;
  }
  window.location.href = urlString;
}

// function goToTodoPage2(todo) {
//   let urlString = "/todo.html"
//   if (todo) {
//     const todoString = JSON.stringify(todo);
//     sessionStorage.setItem('selectedTodo', todoString);
//   }
//   window.location.href = urlString;
// }

function populateTagContainer(container, tags){
  for (const tag of tags) {
    const span = document.createElement('span');
    span.classList.add('tag');
    const node = document.createTextNode('#' + tag);
    span.appendChild(node);
    container.appendChild(span)
  }
}


function createTodoCard(todo){

  const cardTemplate = `
      <span class="todo-name">#NAME</span>
      <div class="tag-container"></div>
      <span>#CREATIONDATE</span>
      <div class="divider"></div>
      <div class="buttons-container">
        <button class="delete-button"><img width="20px" src="./assets/delete.svg" alt=""></button>
        <button class="edit-button"><img width="20px" src="./assets/edit.svg" alt=""></button>
        <button class="done-button"><img width="20px" src="./assets/check.svg" alt=""></button>
        </div>`
  
  
  //const humanDate = new Date(todo.creationDate * 1000)
  const todoHtml = cardTemplate.replace('#NAME', todo.name)
                               .replace('#CREATIONDATE', todo.creationDate.toLocaleString())

  return todoHtml;
}

function startLoading(){
  const loader = document.getElementById('loader')
  loader.style.display = 'inline-block'
  const refresh = document.getElementById('refresh-button');
  refresh.style.display = 'none';
}

function stopLoading() {
  const loader = document.getElementById('loader')
  loader.style.display = 'none'
  const refresh = document.getElementById('refresh-button');
  refresh.style.display = 'inline-block';
}

function filterTodos(t1, t2){
  return t1.id !== t2.id;
}

function removeTodoAndRefesh(todo){
  stopLoading()
  todosArray = todosArray.filter(t1 => filterTodos(t1, todo))
  displayTodos(todosArray);
}

function deleteTodo(id) {

  startLoading()
  const deleteUrl = BASE_URL + '/' + id;
  const fetchOptions = { method: 'delete' };
  fetch(deleteUrl, fetchOptions)
    .then(response => response.json())
    .then(result => removeTodoAndRefesh(result))
    .catch(error => stopLoading())

}

function requestConfirmToDelete(id) {
  if (confirm('ma cosa combini?')) {
    deleteTodo(id);
  } else {
    alert('meno male')
  }
}

function displayTodos(todos){

  const todosContainer = document.getElementById('todos-container');

  todosContainer.innerHTML = '';

  for (const todo of todos) {

    const todoCard = document.createElement('div');
    todoCard.classList.add('todo-card');

    todoCard.innerHTML = createTodoCard(todo);

    const tagContainer = todoCard.querySelector('.tag-container');

    populateTagContainer(tagContainer, todo.tags)

    const deleteButton = todoCard.querySelector('.delete-button');
    deleteButton.onclick = () => requestConfirmToDelete(todo.id);

    const editButton = todoCard.querySelector('.edit-button');
    editButton.onclick = () => goToTodoPage(todo.id);

    const divider = todoCard.querySelector('.divider');
    divider.style.backgroundColor = todo.priority.color;

    // const span = document.createElement('span');
    // const nameNode = document.createTextNode(todo.name);
    // span.appendChild(nameNode);

    // todoCard.appendChild(span);

    // const button = document.createElement('button');
    // button.onclick = () => deleteTodo(todo.id)
    // const deleteNode = document.createTextNode('delete');
    // button.appendChild(deleteNode);

    // todoCard.appendChild(button);

    todosContainer.appendChild(todoCard);
  }
}

function initTodos(todos){
  stopLoading();
  todosArray = todos.map(obj => Todo.fromDbObj(obj));
  todosArray.sort(Todo.orderToDoByPriority);
  displayTodos(todosArray);
}


function loadTodos(){
  startLoading()
  fetch(BASE_URL)
  .then(response => response.json())
  .then(result => initTodos(result))
  //.catch(error => stopLoading())
}

loadTodos()
