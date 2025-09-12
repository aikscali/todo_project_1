// frontend/src/pages/Dashboard.js
import TaskForm from '../../components/TaskForm.js';
import TaskList from '../../components/TaskList.js';

export default function Dashboard() {
  const container = document.createElement('div');
  container.innerHTML = `
    <h1>Mi Lista de Tareas</h1>
    <div id="task-form-container"></div>
    <div id="task-list-container"></div>
  `;

  const formContainer = container.querySelector('#task-form-container');
  const listContainer = container.querySelector('#task-list-container');

  let tasks = [];

  const handleTaskCreated = (newTask) => {
    tasks.push(newTask);
    renderTasks();
  };

  function renderTasks() {
    listContainer.innerHTML = "";
    listContainer.appendChild(TaskList({ tasks }));
  }

  formContainer.appendChild(TaskForm(handleTaskCreated));
  renderTasks();

  return container;
}
