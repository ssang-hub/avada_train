import { Card, ResourceList } from "@shopify/polaris";
import { useState } from "react";
import TodoItem from "./TodoItem";

/**
 * @param props.todos
 * @param props.setTodos
 * @return {JSX.Element}
 * */
function TodoList({ todos, updateTodos, deleteTodo, deleteMultipleTodo }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleUpdateTodos = async (todoIds, updateData) => {
    await updateTodos("todos", updateData, todoIds);
    setSelectedItems([]);
  };
  const handleDeleteTodo = async (todoId) => {
    await deleteTodo(`todos/${todoId}`, todoId);
  };

  const handleDeleteMultipleTodo = async () => {
    try {
      deleteMultipleTodo(`todos/delete-multiple`, selectedItems);
      setSelectedItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const resourceName = {
    singular: "todo",
    plural: "todos",
  };

  const bulkActions = [
    {
      content: "Complete",
      onAction: () => handleUpdateTodos(selectedItems, { isCompleted: true }),
    },
    {
      content: "Incomplete",
      onAction: () => handleUpdateTodos(selectedItems, { isCompleted: false }),
    },
    {
      destructive: true,
      content: "Delete",
      onAction: () => handleDeleteMultipleTodo(),
    },
  ];

  return (
    <Card>
      <ResourceList
        resourceName={resourceName}
        items={todos}
        renderItem={(item) =>
          TodoItem({ item, handleUpdateTodos, handleDeleteTodo })
        }
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        bulkActions={bulkActions}
      />
    </Card>
  );
}

export default TodoList;
