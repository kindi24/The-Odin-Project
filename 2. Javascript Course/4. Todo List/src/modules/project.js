export class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }

    addTodo(todo) {
        this.todoList.push(todo);
    }

    deleteTodo(todoTitle) {
        const len = this.todoList.length;
        this.todoList = this.todoList.filter(todo => todo.title !== todoTitle);
        return this.todoList.length < len;
    }
}