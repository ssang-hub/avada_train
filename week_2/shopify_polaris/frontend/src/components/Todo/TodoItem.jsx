import {
  Badge,
  Button,
  ResourceItem,
  Text,
  InlineStack,
} from "@shopify/polaris";

/**
 * @param props.item - todo Element
 * @param props.updateTodo - handle update todos
 * @param props.deleteTodo - handle delete todos
 * @return {JSX.Element}
 * */
const TodoItem = ({ item, handleUpdateTodos, handleDeleteTodo }) => {
  return (
    <ResourceItem key={item.id} id={item.id}>
      <InlineStack wrap={false} align="space-between">
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {item.title}
        </Text>
        <InlineStack
          gap={{ xs: "200", sm: "300", md: "400", lg: "400", xl: "400" }}
          wrap={false}
          align="space-around"
        >
          <Badge size="large" tone={item.isCompleted ? "success" : "attention"}>
            {" "}
            {item.isCompleted ? "Complete" : "Incomplete"}
          </Badge>
          <Button
            disabled={item.isCompleted}
            onClick={() => handleUpdateTodos([item.id], { isCompleted: true })}
          >
            Complete
          </Button>
          <Button tone="critical" onClick={() => handleDeleteTodo(item.id)}>
            Delete
          </Button>
        </InlineStack>
      </InlineStack>
    </ResourceItem>
  );
};
export default TodoItem;
