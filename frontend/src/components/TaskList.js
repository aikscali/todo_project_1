// frontend/src/components/TaskList.js
export default function TaskList({ tasks = [] }) {
  const list = document.createElement('div');
  list.id = 'task-list';

  if (!Array.isArray(tasks)) tasks = [];

  const badgeClass = (status) => {
    const map = { 'todo':'todo', 'doing':'doing', 'done':'done',
                  'Por hacer':'todo', 'Haciendo':'doing', 'Hecho':'done' };
    return map[status] || 'todo';
  };

  tasks.forEach(task => {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.detail || ""}</p>
      <p>${task.date || ""} ${task.time || ""}</p>
      <span class="badge ${badgeClass(task.status)}">
        ${task.status === 'todo' ? 'Por hacer' :
           task.status === 'doing' ? 'Haciendo' :
           task.status === 'done' ? 'Hecho' : (task.status || 'Por hacer')}
      </span>
    `;
    list.appendChild(card);
  });

  return list;
}
