function TodoItem({ todoData, completedTodo, removeTodo }) {
  return (
    <tr>
      <th scope="row">{todoData.id}</th>
      <td
        className={todoData.is_completed ? "text-decoration-line-through" : ""}
      >
        {todoData.title}
      </td>
      <td className={todoData.is_completed ? "text-success" : "text-warning"}>
        {todoData.is_completed ? "Completed" : "In progress"}
      </td>
      <td>
        <button
          onClick={() => removeTodo(todoData.id)}
          className="btn btn-danger"
        >
          Delete
        </button>
        <button
          disabled={todoData.is_completed}
          onClick={() => completedTodo(todoData.id)}
          className="btn btn-success ms-1"
        >
          Complete
        </button>
      </td>
    </tr>
  );
}

export default TodoItem;
