import { Project } from './project.js'
import { Todo } from './todo.js'

const STORAGE_KEY = 'TodoApp';

export function saveProjects(projects) {
    try {
        // Convert array of objects to JSON string
        const serializedProjects = JSON.stringify(projects);
        localStorage.setItem(STORAGE_KEY, serializedProjects);
    } catch (error) {
        console.log("Error at the save of localStorage: ", error);
    }
}

export function loadProjects() {
    try {
        const serializedProjects = localStorage.getItem(STORAGE_KEY);
        if (serializedProjects === null) {
            // Returns a default project, in case of null
            const defaultProject = new Project('Inbox');
            return [defaultProject];
        }

        const projectsData = JSON.parse(serializedProjects);

        if (!Array.isArray(projectsData)) {
            const defaultProject = new Project('Inbox');
            return [defaultProject];
        }

        // Re-instantiation
        return projectsData.map(projectData => {
            const project = new Project(projectData.name);
            project.todos = (projectData.todos || []).map(todoData => {
                // Restart object Todo in class Todo
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.notes
                );
                return todo;
            });
            return project;
        });
    } catch (error) {
        console.log("Error at the load of localStorage: ", error);
        return [new Project('Inbox')];
    }

}