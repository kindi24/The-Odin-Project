import { Project } from './project.js'
import { Todo } from './todo.js'
import { saveProjects, loadProjects } from './storage.js'

let projects = loadProjects();

/* Projects (get all, get one, add, delete) */
export function getProjects() {
    return loadProjects();
}

export function getProject(projectName) {
    return projects.find(p => p.name === projectName);
}

export function addProject(name) {
    let projects = getProjects();
    if (!projects.find(p => p.name === name)) {
        const newProject = new Project(name);
        projects.push(newProject);
        saveProjects(projects);
    }
}

export function deleteProject(projectName) {
    let projects = getProjects();
    projects = projects.filter(project => project.name !== projectName);
    saveProjects(projects);  
    
    return true;
}

/* Todo (add, delete) */
export function addTodoToProject(name, todoData) {
    const projects = getProjects();
    const project = projects.find(p => p.name === name);

    const inputDate = new Date(todoData.dueDate);
    const currentDate = new Date();

    /* Check for valid due date */
    if (inputDate <= currentDate) {
            alert('The input due date is in the past or today.');
    } else {
        if (project) {
            const newTodoInstance = new Todo(
                todoData.title,
                todoData.description,
                todoData.dueDate,
                todoData.priority,
                todoData.notes
            );

            project.todos.push(newTodoInstance);
            saveProjects(projects);
        }
    }
}

export function deleteTodoFromProject(name, title) {
    const projects = getProjects();

    const project = projects.find(p => p.name === name);

    if (project) {
        project.todos = project.todos.filter(todo => todo.title !== title);
        saveProjects(projects);
    }
}