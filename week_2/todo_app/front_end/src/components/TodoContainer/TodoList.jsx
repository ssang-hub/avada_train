import TodoItem from "../TodoItem/TodoItem";
function TodoList({ todos, completedTodo, removeTodo }) {


  return (
    <table className="table mb-4" style={{ backgroundColor: "#322f2fa6" }}>
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Todo item</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todoData={todo}
            completedTodo={completedTodo}
            removeTodo={removeTodo}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TodoList;
