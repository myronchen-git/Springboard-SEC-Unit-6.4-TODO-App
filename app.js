const form = document.getElementById("formAddToDo");
const listToDo = document.getElementById("listToDo");

const buttonClassNameCompleted = "btnMarkComplete";
const buttonClassNameRemove = "btnRemove";

const todos = [];

// Retrieving To-Dos from local storage.
const storedTodos = JSON.parse(localStorage.getItem("todos"));
if (storedTodos !== null) {
  for (let todo of storedTodos) {
    addNewToDo(todo[0], todo[1]);
  }
}

// Adding event listener for submit.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addNewToDo(document.getElementById("inputToDo").value, false);
  form.reset();
});

// Adding event listeners for clicking on the complete and remove buttons.
listToDo.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.parentElement;
  const listOfToDos = Array.from(document.querySelectorAll("#listToDo > li"));
  const listPosition = listOfToDos.indexOf(parentEl);

  if (targetEl.tagName === "BUTTON") {
    if (targetEl.classList.contains(buttonClassNameCompleted)) {
      parentEl.classList.toggle("completed");
      todos[listPosition][1] = parentEl.classList.contains("completed")
        ? true
        : false;
    } else if (targetEl.classList.contains(buttonClassNameRemove)) {
      parentEl.remove();
      todos.splice(listPosition, 1);
    }
  }
});

// Creates the To-Do row with buttons.
function addNewToDo(text, completed) {
  const itemNewToDo = document.createElement("li");
  if (completed) {
    itemNewToDo.classList.add("completed");
  }
  itemNewToDo.innerText = text;

  const btnMarkComplete = document.createElement("button");
  btnMarkComplete.innerText = "Mark Complete";
  btnMarkComplete.classList.add(buttonClassNameCompleted);
  itemNewToDo.append(btnMarkComplete);

  const btnRemove = document.createElement("button");
  btnRemove.innerText = "Remove";
  btnRemove.classList.add(buttonClassNameRemove);
  itemNewToDo.append(btnRemove);

  listToDo.append(itemNewToDo);

  todos.push([text, completed]);
}

// Stores data once, on exit, for efficiency.
onbeforeunload = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
