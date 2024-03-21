import { useState } from "react";
import { Button, Page, Toast } from "@shopify/polaris";
import TodoList from "../Todo/TodoList";
import CreateTodoModal from "../Modal/Modal";
import useFetchAPI from "../../hooks/useFetchAPI";

function Home() {
  const [modalActive, setModalActive] = useState(false);
  const [toastActive, setToastActive] = useState(false);

  const { data, createData, deleteMultiple, updateData, deleteData } =
    useFetchAPI(`todos`);

  const toggleActiveToast = () => {
    setToastActive((prevState) => !prevState);
  };
  const toastMarkup = toastActive ? (
    <Toast content="Input is required" error onDismiss={toggleActiveToast} />
  ) : null;

  return (
    <Page
      title="Todoes"
      primaryAction={
        <Button variant="primary" onClick={() => setModalActive(true)}>
          Create
        </Button>
      }
    >
      <CreateTodoModal
        modalActive={modalActive}
        createTodo={createData}
        handleActiveModal={setModalActive}
        setToastActive={setToastActive}
      />

      <TodoList
        todos={data}
        deleteTodo={deleteData}
        updateTodos={updateData}
        deleteMultipleTodo={deleteMultiple}
      />
      {toastMarkup}
    </Page>
  );
}

export default Home;
