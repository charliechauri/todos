const createTodo = require('./todo');

function TodoList(defaultTodos = []) {
  const todos = defaultTodos.map((todo) => createTodo(todo));

  this.get = () => todos;

  this.getByMessage = (message) => {
    const filtered = this.get().filter((todo) => todo.message === message);

    return filtered.length > 0 ? filtered[0] : null;
  };

  this.count = () => todos.length;

  this.getFiltered = ({
    completed = false,
  }) => this.get().filter((todo) => todo.completed === completed);

  this.add = (message) => {
    const newTodo = createTodo((message));
    todos.push(newTodo);
    return newTodo;
  };

  this.toggleComplete = (message) => {
    const indexOfTodoToComplete = todos.map((todo) => todo.message).indexOf(message);
    const todoToComplete = todos[indexOfTodoToComplete];

    todoToComplete.completed = !todoToComplete.completed;

    return todoToComplete;
  };

  this.update = (message, newMessage) => {
    const updatedTodo = this.getByMessage(message);

    updatedTodo.message = newMessage;

    return updatedTodo;
  };

  this.remove = (message) => {
    if (message) {
      const numberOfTodosToRemove = 0;
      const todoIndexToRemove = todos.map((todo) => todo.message).indexOf(message);

      return todos.slice(todoIndexToRemove, numberOfTodosToRemove);
    }

    return todos.pop();
  };
}


module.exports = TodoList;
