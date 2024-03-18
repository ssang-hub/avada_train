import TodoForm from "./TodoInput";
import TodoList from "./TodoList";
import { FetchData } from "../../api/fetchData";
import useFetchAPI from "../../hooks/useFetchAPI";

function TodoContainer() {
  const {data, setData, isLoading} = useFetchAPI(`/todos`)
  const addTodo = async (todoTitle) => {
    try {
      const new_todo = {
        title: todoTitle,
      };
      const res = await FetchData({method:"POST", url:"/todos", payload:new_todo});
      setData([...data, res.data]);
    } catch (error) {}
  };

  const completedTodo = async (id) => {
    try {
      await FetchData({method:"PUT", url:`/todos/${id}`, payload:{is_completed: true}});
      setData(
          data.map((item) => {
            if (item.id === parseInt(id)) {
              return { ...item, is_completed: true };
            }
            return item;
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await FetchData({method:"DELETE", url:`/todos/${id}`});
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100 rounded ">
          <div className="col col-lg-9 col-xl-9 ">
            <div
              className="card rounded-3"
              style={{ backgroundColor: "#40464d" }}
            >
              <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">To Do App</h4>

                <TodoForm addTodo={addTodo} />

                <TodoList todos={data} completedTodo={completedTodo} removeTodo={removeTodo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodoContainer;
