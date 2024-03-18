import { Badge, Button, ResourceItem, Text } from "@shopify/polaris";

/**
 * @param props.item - todo Element
 * @param props.updateTodo - handle update todos
 * @param props.deleteTodo - handle delete todos
 * @return {JSX.Element}
 * */
const TodoItem = (props) => {
  return (
    <ResourceItem key={props.item.id} id={props.item.id}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {props.item.title}
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <Badge tone={props.item.is_completed ? "success" : "attention"}>
            {" "}
            {props.item.is_completed ? "Complete" : "Incomplete"}
          </Badge>
          <Button onClick={() => props.updateTodo([props.item.id], true)}>
            Complete
          </Button>
          <Button
            tone="critical"
            onClick={() => props.deleteTodo(props.item.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </ResourceItem>
  );
};
export default TodoItem;
