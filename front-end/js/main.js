const btnNewTodo = document.getElementById("btnNewTodo");
const btnCloseModal = document.getElementById("btnCloseModal");
const btnSendData = document.getElementById("btnSendData");

const modalBackground = document.querySelector(".modal-background");
const modalContainer = document.querySelector(".modal-container");

const inputId = document.getElementById("inputId");
const inputTitulo = document.getElementById("inputTitulo");
const inputDescripcion = document.getElementById("inputDescripcion");

const todoContainer = document.querySelector(".todo-container");
const messages = document.querySelector(".mensajes");

const getPostDataPath = "http://localhost:8000/api/todos";

function openModal() {
  modalBackground.classList.add("show-modal-background");
  modalContainer.classList.add("show-modal");
}

btnNewTodo.addEventListener("click", ()=>{
  openModal();
  btnSendData.innerText="Agregar"
});

btnCloseModal.addEventListener("click", () => {
  modalBackground.classList.remove("show-modal-background");
  modalContainer.classList.remove("show-modal");
  inputId.value = "0";
  inputTitulo.value = "";
  inputDescripcion.value = "";
});

btnSendData.addEventListener("click", async () => {
  if (inputId.value=='0') {
    const response = await fetch(getPostDataPath, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
      }),
    });
    mostrarMensaje("Nueva tarea agregada")
  }else{
    const response = await fetch(`http://localhost:8000/api/todos/${inputId.value}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: inputTitulo.value,
        descripcion: inputDescripcion.value,
      }),
    })
    mostrarMensaje("Tarea modificada")
  }
  
  //console.log(await response.json());
  loadData(getPostDataPath);

  modalBackground.classList.remove("show-modal-background");
  modalContainer.classList.remove("show-modal");
  inputId.value = "0";
  inputTitulo.value = "";
  inputDescripcion.value = "";
});

function crearTodo(todo) {
  const divTodo = document.createElement("DIV");
  const title = document.createElement("H4");
  const description = document.createElement("P");
  const actions = document.createElement("DIV");
  const btnModifyTodo = document.createElement("BUTTON");
  const btnCheckTodo = document.createElement("BUTTON");
  const btnDeleteTodo = document.createElement("BUTTON");

  divTodo.classList.add("todo");
  title.innerText = todo.titulo;
  description.innerText = todo.descripcion;
  actions.classList.add("todo-actions-container");

  btnModifyTodo.innerHTML = "<i class='fas fa-pen'></i>";
  btnCheckTodo.innerHTML = "<i class='fas fa-check'></i>";
  btnDeleteTodo.innerHTML = "<i class='fas fa-trash-alt'></i>";
  const dataTodo = {
    titulo: todo.titulo,
    descripcion: todo.descripcion,
    terminada: 1,
  };

  btnModifyTodo.addEventListener("click", () => {
    openModal();
    btnSendData.innerText="Modificar"
    inputId.value = todo.id;
    inputTitulo.value = todo.titulo;
    inputDescripcion.value = todo.descripcion;
  });
  btnCheckTodo.addEventListener("click", () => {
    checkTodo(`http://localhost:8000/api/todos/${todo.id}`, dataTodo);
  });
  btnDeleteTodo.addEventListener("click", () => {
    deleteTodo(`http://localhost:8000/api/todos/${todo.id}`);
  });

  actions.appendChild(btnModifyTodo);
  actions.appendChild(btnCheckTodo);
  actions.appendChild(btnDeleteTodo);

  divTodo.appendChild(title);
  divTodo.appendChild(description);
  divTodo.appendChild(actions);
  return divTodo;
}

onload = loadData(getPostDataPath);

async function loadData(url) {
  const response = await fetch(url);
  const data = await response.json();
  if (data.length > 0) {
    todoContainer.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (const element of data) {
      fragment.appendChild(crearTodo(element));
    }
    todoContainer.appendChild(fragment);
    const todo = document.querySelectorAll(".todo");
    setTimeout(() => {
      todo.forEach((e) => {
        e.classList.add("animate-show-todo");
      });
    }, 300);
  } else {
    todoContainer.innerHTML = "<p>No hay tareas para mostrar</p>";
  }
}

async function checkTodo(url, todo) {
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  //console.log(await response.json());
  loadData(getPostDataPath);
  mostrarMensaje("Tarea marcada como terminda");
}

async function deleteTodo(url) {
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  loadData(getPostDataPath);
  mostrarMensaje("Tarea eliminada");
}
function mostrarMensaje(mensaje) {
  messages.classList.add("show-message");
  messages.innerText = mensaje;
  setTimeout(() => {
    messages.classList.remove("show-message");
    messages.innerText = "";
  }, 1500);
}
