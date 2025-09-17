export function initDashboard() {
  // CORREGIDO: getElementById solo necesita el ID sin '#'
  const logoutButton = document.getElementById('logout-button');
  // CORREGIDO: querySelectorAll para múltiples elementos con clase
  const navLinks = document.querySelectorAll('.nav-link');
  const addTaskButtons = document.querySelectorAll('.add-task-btn');
  const modal = document.getElementById('task-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const taskForm = document.getElementById('task-form');
  const taskNameInput = document.getElementById('task-name');
  const taskDescriptionInput = document.getElementById('task-description');
  const taskStatusSelect = document.getElementById('task-status');
  const cancelTaskButton = document.getElementById('cancel-task');

  let currentEditingTask = null;
  let tasks = [
    { id: 1, name: 'Tarea pendiente', description: '', status: 'todo' },
    { id: 2, name: 'Tarea en curso', description: '', status: 'progress' },
    { id: 3, name: 'Tarea completada', description: '', status: 'done' }
  ];

  // Event Listeners con verificación de existencia
  if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
  }
  
  if (navLinks.length > 0) {
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavigation);
    });
  }

  if (addTaskButtons.length > 0) {
    addTaskButtons.forEach(button => {
      button.addEventListener('click', handleAddTask);
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (cancelTaskButton) {
    cancelTaskButton.addEventListener('click', closeModal);
  }

  if (taskForm) {
    taskForm.addEventListener('submit', handleTaskSubmit);
  }

  // Close modal when clicking outside
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Functions
  function handleLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      window.location.hash = '#/login';
    }
  }

  function handleNavigation(e) {
    e.preventDefault();
    
    // Remove active class from all nav items
    navLinks.forEach(link => link.parentElement.classList.remove('active'));
    
    // Add active class to clicked item
    e.target.parentElement.classList.add('active');
    
    const section = e.target.dataset.section;
    
    if (section === 'perfil') {
      console.log('Mostrar perfil');
    } else if (section === 'tareas') {
      console.log('Mostrar tareas');
    }
  }

  function handleAddTask(e) {
    currentEditingTask = null;
    if (modalTitle) modalTitle.textContent = 'Agregar Tarea';
    if (taskNameInput) taskNameInput.value = '';
    if (taskDescriptionInput) taskDescriptionInput.value = '';
    if (taskStatusSelect) taskStatusSelect.value = e.target.dataset.status || 'todo';
    if (modal) modal.style.display = 'flex';
    if (taskNameInput) taskNameInput.focus();
  }

  function handleEditTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    currentEditingTask = taskId;
    if (modalTitle) modalTitle.textContent = 'Editar Tarea';
    if (taskNameInput) taskNameInput.value = task.name;
    if (taskDescriptionInput) taskDescriptionInput.value = task.description || '';
    if (taskStatusSelect) taskStatusSelect.value = task.status;
    if (modal) modal.style.display = 'flex';
    if (taskNameInput) taskNameInput.focus();
  }

  function handleDeleteTask(taskId) {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      tasks = tasks.filter(t => t.id !== taskId);
      renderTasks();
    }
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
    currentEditingTask = null;
    if (taskForm) taskForm.reset();
  }

  function handleTaskSubmit(e) {
    e.preventDefault();
    
    if (!taskNameInput) return;
    
    const taskName = taskNameInput.value.trim();
    if (!taskName) {
      showTaskError('El nombre de la tarea es obligatorio');
      return;
    }

    const taskData = {
      name: taskName,
      description: taskDescriptionInput ? taskDescriptionInput.value.trim() : '',
      status: taskStatusSelect ? taskStatusSelect.value : 'todo'
    };

    if (currentEditingTask) {
      const taskIndex = tasks.findIndex(t => t.id === currentEditingTask);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
      }
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData
      };
      tasks.push(newTask);
    }

    renderTasks();
    closeModal();
  }

  function showTaskError(message) {
    // CORREGIDO: Eliminé el "container" que estaba mal escrito
    const errorElement = document.getElementById('task-name-error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    if (taskNameInput) {
      taskNameInput.classList.add('invalid');
    }
  }

  function renderTasks() {
    // CORREGIDO: Sin '#' en getElementById
    const todoColumn = document.getElementById('todo-column');
    const progressColumn = document.getElementById('progress-column');
    const doneColumn = document.getElementById('done-column');

    // Verificar que existan los elementos
    if (!todoColumn || !progressColumn || !doneColumn) {
      console.error('No se encontraron las columnas del dashboard');
      return;
    }

    // Clear columns
    todoColumn.innerHTML = '';
    progressColumn.innerHTML = '';
    doneColumn.innerHTML = '';

    // Render tasks in their respective columns
    tasks.forEach(task => {
      const taskCard = createTaskCard(task);
      
      if (task.status === 'todo') {
        todoColumn.appendChild(taskCard);
      } else if (task.status === 'progress') {
        progressColumn.appendChild(taskCard);
      } else if (task.status === 'done') {
        doneColumn.appendChild(taskCard);
      }
    });
  }

  function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.setAttribute('draggable', 'true');
    card.dataset.taskId = task.id;

    card.innerHTML = `
      <h4 class="task-title">${task.name}</h4>
      ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
      <div class="task-actions">
        <button class="task-btn edit-btn" title="Editar">✏️</button>
        <button class="task-btn delete-btn" title="Eliminar">🗑️</button>
      </div>
    `;

    // Add event listeners for edit and delete
    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');

    if (editBtn) editBtn.addEventListener('click', () => handleEditTask(task.id));
    if (deleteBtn) deleteBtn.addEventListener('click', () => handleDeleteTask(task.id));

    // Add drag and drop functionality
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);

    return card;
  }

  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
    e.target.style.opacity = '0.5';
  }

  function handleDragEnd(e) {
    e.target.style.opacity = '1';
  }

  // Setup drag and drop for columns
  // CORREGIDO: querySelectorAll para múltiples elementos
  const columns = document.querySelectorAll('.column-content');
  columns.forEach(column => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('drop', handleDrop);
  });

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(e) {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    const column = e.currentTarget;
    let newStatus;

    if (column.id === 'todo-column') newStatus = 'todo';
    else if (column.id === 'progress-column') newStatus = 'progress';
    else if (column.id === 'done-column') newStatus = 'done';

    // Update task status
    const task = tasks.find(t => t.id === taskId);
    if (task && task.status !== newStatus) {
      task.status = newStatus;
      renderTasks();
    }
  }

  // Initial render
  console.log('Iniciando dashboard...');
  renderTasks();
}