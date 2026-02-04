const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const span = li.querySelector('span');
    tasks.push({ text: span.textContent, completed: span.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => {
    const li = createTaskElement(task.text, task.completed);
    taskList.appendChild(li);
  });
}

// Create task element with buttons
function createTaskElement(taskText, completed = false) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = taskText;
  if (completed) span.classList.add('completed');

  // Toggle completion by clicking text
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
    saveTasks();
  });

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = '✔';
  completeBtn.addEventListener('click', () => {
    span.classList.toggle('completed');
    saveTasks();
  });

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText) {
      span.textContent = newText;
      saveTasks();
    }
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(completeBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

// Add new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const li = createTaskElement(taskText);
  taskList.appendChild(li);
  taskInput.value = '';
  saveTasks();
});

// Load tasks on startup
window.onload = loadTasks;





