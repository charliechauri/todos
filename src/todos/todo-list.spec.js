const TodoList = require('./todo-list');

describe('Given a new TodoList', () => {
  const todoList = new TodoList();
  const firstTestTodo = 'Bath the dog';
  const secondTestTodo = 'Eat barbacoa tacos';
  const thirdTestTodo = 'Study software complexity (Big O)';
  const fourthTestTodo = 'Explain software complexity 😅';

  it(`When recently created without any item (todo)
      Then should have a count of 0`, () => {
    const count = todoList.count();
    expect(count).toBe(0);
  });

  it(`When added a new todo
      Then should have a 1 count`, () => {
    todoList.add(firstTestTodo);

    expect(todoList.count()).toBe(1);
  });

  it(`When added 3 todos
      Then the count should be 4`, () => {
    todoList.add(secondTestTodo);
    todoList.add(thirdTestTodo);
    todoList.add(fourthTestTodo);

    expect(todoList.count()).toBe(4);
  });

  it(`When called the first element Then it should be
      '${firstTestTodo}'`, () => {
    const [todo] = todoList.get(firstTestTodo);

    expect(todo.message).toBe(firstTestTodo);
  });

  it(`When remove the last element
      Then new count is 3
      and removed todo is '${fourthTestTodo}'
      and last todo is '${thirdTestTodo}'`, () => {
    const removedTodo = todoList.remove();
    const [, , todo] = todoList.get();

    expect(removedTodo.message).toBe(fourthTestTodo);
    expect(todo.message).toBe(thirdTestTodo);
  });
});

const testCaseTodos = [
  'Take a shower',
  'Eat breakfast',
  'Practice coding',
  'Watch `Brooklyn 99`',
  'Rest',
];

describe(`Given a TodoList which values are [${testCaseTodos.join(', ')}]`, () => {
  const todoList = new TodoList(testCaseTodos);
  let filteredRemainingTodosMessages = [];

  it(`When counting the todos
      Then the count should be ${testCaseTodos.length}`, () => {
    expect(todoList.count()).toBe(testCaseTodos.length);
  });

  const expectedIncompletedTodosCount = 4;
  it(`When completing the following todo ${testCaseTodos[0]}
      Then the remaining incompleted are ${expectedIncompletedTodosCount}
      and ${testCaseTodos[0]} should not be present in filtered list`, () => {
    todoList.toggleComplete(testCaseTodos[0]);

    filteredRemainingTodosMessages = todoList
      .getFiltered({ completed: false })
      .map((todo) => todo.message);

    expect(filteredRemainingTodosMessages.length)
      .toBe(expectedIncompletedTodosCount);

    expect(filteredRemainingTodosMessages)
      .toEqual(expect.not.arrayContaining([testCaseTodos[0]]));
  });

  const remainingIncompletedTodosCount = 3;
  it(`When removing last element
      (${testCaseTodos[testCaseTodos.length - 1]})
      then the count for remaining is ${remainingIncompletedTodosCount}`, () => {
    todoList.remove();

    expect(todoList.getFiltered({ completed: false }).length).toBe(3);
  });
});
