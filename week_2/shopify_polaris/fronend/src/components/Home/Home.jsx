import { useCallback, useState } from "react";
import { Button, Page, Text } from "@shopify/polaris";
import TodoList from "../Todo/TodoList";
import CreateTodoModal from "../Modal/Modal";
import useFetchAPI from "../../hooks/useFetchAPI";

function Home() {
  const [modalActive, setModalActive] = useState(false);
  const { data, setData, isLoading } = useFetchAPI(`todos`);
  const handleActiveModal = useCallback(
    () => setModalActive(!modalActive),
    [modalActive]
  );

  return (
    <>
      <Page>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Text variant="headingMd" as="h1">
            Todos
          </Text>
          <Button variant="primary" onClick={handleActiveModal}>
            Create
          </Button>
        </div>
        <CreateTodoModal
          modalActive={modalActive}
          setTodoes={setData}
          handleActiveModal={handleActiveModal}
        />

        <TodoList todos={data} setTodos={setData} />
      </Page>
    </>
  );
}

export default Home;
