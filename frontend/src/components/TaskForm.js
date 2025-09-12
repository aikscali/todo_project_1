// frontend/src/components/TaskForm.js
export default function TaskForm(onTaskCreated) {
  const wrap = document.createElement('div');
  wrap.className = 'form-container';

  const form = document.createElement('form');
  form.className = 'form-grid';
  form.innerHTML = `
    <input class="input" type="text" name="title" placeholder="Título (máx. 50)" maxlength="50" required />
    <textarea class="input" name="detail" placeholder="Detalle (opcional, máx. 500)" maxlength="500"></textarea>
    <div class="row-2">
      <input class="input" type="date" name="date" required />
      <input class="input" type="time" name="time" required />
    </div>
    <select class="select" name="status" required>
      <option value="todo">Por hacer</option>
      <option value="doing">Haciendo</option>
      <option value="done">Hecho</option>
    </select>
    <button class="btn" type="submit">Guardar tarea</button>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
      title: form.title.value.trim(),
      detail: form.detail.value.trim(),
      date: form.date.value,
      time: form.time.value,
      status: form.status.value
    };
    if (!newTask.title || !newTask.date || !newTask.time || !newTask.status) return;
    onTaskCreated(newTask);
    form.reset();
  });

  wrap.appendChild(form);
  return wrap;
}
