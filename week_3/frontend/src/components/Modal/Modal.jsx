import { Modal, TextField } from "@shopify/polaris";
import { useCallback, useState } from "react";

/**
 * This is component handle create todo
 * @param props.setTodoes
 * @param props.modalActive - show, hide modal
 * @param props.handleActiveModal
 * @return {JSX.Element}
 * */
function CreateTodoModal({
  modalActive,
  createTodo,
  handleActiveModal,
  setToastActive,
}) {
  const [value, setValue] = useState("");
  const handleChangeInput = useCallback((newValue) => setValue(newValue), []);

  const handleCreateTodo = async () => {
    value === "" ? setToastActive(true) : createTodo({ title: value }, "todos");
    setValue("");
    handleActiveModal(false);
  };

  return (
    <Modal
      open={modalActive}
      onClose={() => handleActiveModal(false)}
      title="Create todo"
      primaryAction={{
        content: "create",
        onAction: handleCreateTodo,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: () => handleActiveModal(false),
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
  );
}

export default CreateTodoModal;
