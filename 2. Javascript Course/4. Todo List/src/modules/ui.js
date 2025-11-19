import { getProjects, addProject, addTodoToProject, deleteTodoFromProject, deleteProject } from './appLogic.js';
import { format } from 'date-fns'; 

let currentProject = 'Inbox';

/* Show Projects */
function renderProjects() {
    const projectListDiv = document.getElementById('project-list');
    projectListDiv.innerHTML = '';
    
    getProjects().forEach(project => {
        const btn = document.createElement('button');
        btn.textContent = project.name;
        btn.dataset.projectName = project.name;
        
        if (project.name === currentProject) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            currentProject = project.name;
            renderAll();
        });
        
        projectListDiv.appendChild(btn);
    });
}

/* Delete Project */
function setupDeleteProject() {
    const deleteBtn = document.getElementById('delete-project-btn');
    
    if (!deleteBtn) return;

    deleteBtn.addEventListener('click', () => {
        // Check if the current project is Inbox (It's default and cannot be removed)
        if (currentProject === 'Inbox') {
            alert('You cannot delete the default project "Inbox".');
            return;
        }

        // Confrim Message
        if (confirm(`Are you sure you want to delete the project "${currentProject}" and all its todos?`)) {
            deleteProject(currentProject);
            currentProject = 'Inbox';
            
            // Update UI
            renderAll();
        }
    });
}

/* Show Todos */
function renderTodos() {
    const todosContainer = document.getElementById('todo-list');
    const currentProjectTitle = document.getElementById('current-project-title');
    todosContainer.innerHTML = '';
    
    const project = getProjects().find(p => p.name === currentProject);
    if (!project) return;
    
    currentProjectTitle.textContent = project.name;

    (project.todos || []).forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item', todo.priority);
        todoItem.dataset.title = todo.title; 

        const displayDiv = document.createElement('div');
        displayDiv.innerHTML = `
            <strong>${todo.title}</strong>
            <span>(Due: ${format(new Date(todo.dueDate), 'MMM do, yyyy')})</span>
        `;
        
        const actionsDiv = document.createElement('div');
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodoFromProject(currentProject, todo.title);
            renderAll();
        });
        
        actionsDiv.appendChild(deleteBtn);
        
        todoItem.appendChild(displayDiv);
        todoItem.appendChild(actionsDiv);

        todoItem.addEventListener('click', () => {
            showTodoDetails(todo);
        });

        todosContainer.appendChild(todoItem);
    });
}

/* Create new Todo */
function setupTodoModal() {
    const modal = document.getElementById('todo-modal');
    const form = document.getElementById('todo-form');
    const addTodoBtn = document.getElementById('add-todo-btn');
    const cancelBtn = document.getElementById('cancel-todo-btn');

    addTodoBtn.addEventListener('click', () => modal.showModal());
    cancelBtn.addEventListener('click', () => modal.close());

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);

        const newTodo = {
            title: formData.get('title'),
            description: formData.get('description'),
            dueDate: formData.get('dueDate'),
            priority: formData.get('priority'),
            notes: formData.get('notes')
        };

        addTodoToProject(currentProject, newTodo);
        
        form.reset();
        modal.close();
        renderAll();
    });
}

/* Create new Project */
function setupProjectCreation() {
    const addProjectBtn = document.getElementById('add-project-btn');
    addProjectBtn.addEventListener('click', () => {
        const projectName = prompt("Enter new project name:");
        if (projectName && projectName.trim() !== '') {
            addProject(projectName.trim());
            currentProject = projectName.trim();
            renderAll();
        }
    });
}

/* Display Todo Details */
function showTodoDetails(todo) {
    const detailsModal = document.getElementById('details-modal');
    const detailsContainer = document.getElementById('todo-details-container');
    
    const formattedDueDate = format(new Date(todo.dueDate), 'MMMM do, yyyy');

    detailsContainer.innerHTML = `
        <h2>Details: ${todo.title}</h2>
        <hr>
        <p><strong>Priority:</strong> <span class="${todo.priority}">${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</span></p>
        <p><strong>Due Date:</strong> ${formattedDueDate}</p>
        
        <div style="margin-top: 15px;">
            <h4>Description:</h4>
            <p>${todo.description || 'No description.'}</p>
        </div>
        <div style="margin-top: 15px;">
            <h4>Notes:</h4>
            <p>${todo.notes || 'No notes.'}</p>
        </div>
        
        <div style="margin-top: 20px; text-align: right;">
            <button id="close-details-btn">Close</button>
        </div>
    `;
    
    const closeBtn = document.getElementById('close-details-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            detailsModal.close();
        });
    }

    detailsModal.showModal();
}

/* Show both Projects and Todos */
export function renderAll() {
    renderProjects();
    renderTodos();
}

/* Create UI */
export function initUI() {
    setupProjectCreation();
    setupDeleteProject();
    setupTodoModal();
    renderAll();
}