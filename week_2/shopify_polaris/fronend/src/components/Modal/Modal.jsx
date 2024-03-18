import {Frame, Modal, TextField} from "@shopify/polaris";
import {useCallback, useState} from "react";
import {FetchData} from "../../api/fetchData";

/**
 * This is component handle create todo
 * @param props.setTodoes
 * @param props.modalActive - show, hide modal
 * @param props.handleActiveModal
 * @return {JSX.Element}
 * */
function CreateTodoModal(props) {
  const [value, setValue] = useState("");
  const handleChangeInput = useCallback((newValue) => setValue(newValue), []);

  const handleCreateTodo = async () => {
    try {
      const { data } = await FetchData({method: 'POST', payload:{title:value}, url:"todos"});
      props.setTodoes((prevState) => [...prevState, data]);
      setValue("");
      props.handleActiveModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ height: "40px" }}>
      <Frame>
        <Modal
          open={props.modalActive}
          onClose={props.handleActiveModal}
          title="Create todo"
          primaryAction={{
            content: "create",
            onAction: handleCreateTodo,
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: handleCreateTodo,
            },
          ]}
        >
          <Modal.Section>
            <TextField
              label="Title"
              value={value}
              onChange={handleChangeInput}
              autoComplete="off"
            />
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}
export default CreateTodoModal;
