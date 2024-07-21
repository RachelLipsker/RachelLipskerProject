let list = JSON.parse(localStorage.getItem("todolist")) || [];
let tableBody = document.getElementById("todoListBody");
addTasksToScreen(list);

class Todo {
  static id = 0;
  description;
  isComplete = false;
  constructor(description) {
    this.description = description;
    this.id = Todo.id;
    Todo.id++;
  }
}

class TodoManager {
  tasks;
  constructor() {
    this.tasks = list;
  }

  addTask(description) {
    let newTask = new Todo(description);
    this.tasks.push(newTask);
    addTasksToScreen(this.tasks);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    addTasksToScreen(this.tasks);
  }

  updateTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    addTasksToScreen(this.tasks);
  }

  toggleIsComplete(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    addTasksToScreen(this.tasks);
  }
}

let taskManager = new TodoManager();

function addTaskToScreen(task, index) {
  //create the element
  let row;
  if (task.isComplete) {
    row = `<tr class="todo-row done-task" id="row${index}">
      <td class="todo-cell"><input type="checkbox" onchange="taskManager.toggleIsComplete(${index})" checked></td>
      <td class="todo-cell">${task.description}</td>
          <td class="todo-cell">
          </td>
          <td class="todo-cell">
           <img src="./images/redbin.png" alt="delete" onclick="taskManager.removeTask(${index})">
          </td>
        </tr>
`;
  } else {
    row = `<tr class="todo-row" id="row${index}">
      <td class="todo-cell"><input type="checkbox" onchange="taskManager.toggleIsComplete(${index})"></td>
      <td class="todo-cell">${task.description}</td>
          <td class="todo-cell">
          <img src="./images/blueedit.png" alt="edit" onclick="makeRowEditable('${task.description}',${index})">
          </td>
          <td class="todo-cell">
          <img src="./images/redbin.png" alt="delete" onclick="taskManager.removeTask(${index})">
          </td>
        </tr>
`;
  }
  //append child
  tableBody.innerHTML += row;
}

function addTasksToScreen(tasks) {
  tableBody.innerHTML = "";
  tasks.forEach((task, index) => {
    addTaskToScreen(task, index);
  });
  localStorage.setItem("todolist", JSON.stringify(tasks));
}

function makeRowEditable(description, index) {
  let rowOnHtml = document.getElementById("row" + index);
  let newRow = `<td class="todo-cell"></td>
    <td class="todo-cell">
          <input id="editInput${index}" value="${description}"/>
          </td>
          <td class="todo-cell">
          <img src="./images/greenvi.png" alt="save" onclick="editTask(${index})">
          </td>
          <td class="todo-cell">
           <img src="./images/redbin.png" alt="delete" onclick="taskManager.removeTask(${index})">
          </td>
`;
  rowOnHtml.innerHTML = newRow;
}

function editTask(index) {
  let editInput = document.getElementById("editInput" + index);
  if (editInput.value) {
    taskManager.updateTask(index, editInput.value);
  }
}

document.querySelector('form').addEventListener("submit", (e) => {
  e.preventDefault();
  let txtInput = document.getElementById("newTaskInput");
  if (txtInput.value) {
    taskManager.addTask(txtInput.value);
    txtInput.value = "";
  }
});
