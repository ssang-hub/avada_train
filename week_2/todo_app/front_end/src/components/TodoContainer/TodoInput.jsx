import { useState } from "react";

/**
 *
 * @param {addTodo}
 * @returns {JSX.Element}
 */

const TodoInput = ({ addTodo }) => {
  const [todoTitle, setTodoTitle] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(todoTitle);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2"
    >
      <div className="col-12">
        <div className="form-outline">
          <input
            type="text"
            id="form1"
            className="form-control"
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
          <label className="form-label" htmlFor="form1">
            Enter a task here
          </label>
        </div>
      </div>

      <div className="col-12">
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};
export default TodoInput;
