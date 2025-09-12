// frontend/src/components/TaskForm.js
export default function TaskForm(onTaskCreated) {
  const form = document.createElement('form');
  form.innerHTML = `
    <input type="text" name="title" placeholder="Título" required />
    <textarea name="detail" placeholder="Detalle"></textarea>
    <input type="date" name="date" required />
    <input type="time" name="time" required />
    <select name="status">
      <option value="pending">Pendiente</option>
      <option value="doing">En progreso</option>
      <option value="done">Hecha</option>
    </select>
    <button type="submit">Agregar</button>
  `;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTask = {
      title: form.title.value,
      detail: form.detail.value,
      date: form.date.value,
      time: form.time.value,
      status: form.status.value,
    };
    onTaskCreated(newTask);
    form.reset();
  });

  return form;
}
