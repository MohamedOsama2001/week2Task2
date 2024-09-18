let taskText = document.querySelector(".task-text");
let taskBtn = document.querySelector(".task-btn");
let tasksList = document.querySelector(".tasks-list");
let message = document.querySelector(".message");
// get all added tasks from local storage
let getTasks = JSON.parse(localStorage.getItem("tasks"));
let tasks = getTasks ? [...getTasks] : [];
// function to draw html for added tasks
function drawTasks(tasks) {
  let task = tasks.map((item, index) => {
    const taskTitle = item.completed == true ? "completed" : "";
    return `
    <li>
    <span class="${taskTitle}">${item.title}</span>
    <div>
    <button class="edit" onClick="editTask(${index})">Edit</button>
    <button class="delete" onClick="deleteTask(${index})">Delete</button>
    <button class="comolete" onClick="completedTask(${index})">completed</button>
    </div>
    </li>
        `;
  });
  tasksList.innerHTML = task.join("");
}
drawTasks(tasks);
/*    add new task    */
taskBtn.addEventListener("click", addNewTask);
function addNewTask() {
  const taskTextValue = taskText.value.trim();
  if (taskTextValue == "") {
    alert("Empty field!");
    return;
  }
  const newTask = {
    title: taskTextValue,
    completed: false,
  };
  tasks.push(newTask);
  taskId();
  localStorage.setItem("tasks", JSON.stringify(tasks));
  drawTasks(tasks);
  taskText.value = "";
  showMessage("Task added successfuly");
}
/*       delete task        */
const deleteTask = (index) => {
  if (confirm("Are you want to delete this task?")) {
    tasks.splice(index, 1);
    taskId();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    drawTasks(tasks);
    showMessage("Task deleted successfully");
  }
};
// update task
const editTask = (index) => {
  const newTitle = prompt("Edit your task: ", tasks[index].title);
  if (newTitle !== null) {
    tasks[index].title = newTitle;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    drawTasks(tasks);
    showMessage("Task updated successfully");
  }
};
// complete task
const completedTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  drawTasks(tasks);
};
//  show message function
const showMessage = (msg) => {
  message.innerHTML = msg;
  message.style.display = "block";
  setTimeout(() => {
    message.innerHTML = "";
    message.style.display = "none";
  }, 2000);
};
const taskId = () => {
  tasks = tasks.map((task, index) => ({
    ...task,
    id: index + 1,
  }));
};
