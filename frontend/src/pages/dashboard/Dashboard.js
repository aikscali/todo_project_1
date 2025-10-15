// frontend/src/pages/dashboard/Dashboard.js
import TaskForm from '../../components/TaskForm.js';
import TaskList from '../../components/TaskList.js';

export default function Dashboard() {
  const container = document.createElement('div');

  const formHost = document.createElement('div');    // columna izquierda (form)
  const listHost = document.createElement('div');    // columna derecha (lista)

  container.appendChild(formHost);
  container.appendChild(listHost);

  let tasks = [];

  const handleTaskCreated = (newTask) => {
    tasks = [...tasks, newTask];
    renderTasks();
  };

  function renderTasks() {
    listHost.innerHTML = '';
    listHost.appendChild(TaskList({ tasks }));
  }

  formHost.appendChild(TaskForm(handleTaskCreated));
  renderTasks();

  return container;
}
