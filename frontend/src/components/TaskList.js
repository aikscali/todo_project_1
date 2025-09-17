// frontend/src/components/TaskList.js
export default function TaskList({ tasks = [] }) {
  const list = document.createElement('div');
  list.id = 'task-list';

  if (!Array.isArray(tasks)) tasks = [];

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.detail || ""}</p>
      <p>${task.date || ""} ${task.time || ""}</p>
      <p>Status: ${task.status || "Pendiente"}</p>
    `;
    list.appendChild(card);
  });

  return list;
}
