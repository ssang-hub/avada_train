import {Card, ResourceList,} from '@shopify/polaris';
import {useState} from 'react';
import TodoItem from "./TodoItem";
import {FetchData} from "../../api/fetchData";

/**
 * @param props.todos
 * @param props.setTodos
 * @return {JSX.Element}
 * */
function TodoList(props) {

  const [selectedItems, setSelectedItems] = useState([])

  const updateTodo = async (todoIds, is_completed)=>{
    try {
      await FetchData({method: 'PUT',payload: {data: {items: todoIds, is_completed}}, url: 'todos'})
      props.setTodos(prevState => prevState.map( item => {
        if(todoIds.includes(item.id)){
          return {...item, is_completed}
        }
        return item
      }))
      setSelectedItems([])

    }
    catch (error){
      console.log(error)
    }
  }
  const deleteTodo = async (todoId)=>{
    try {
      await FetchData({method: 'DELETE', url:`todos/${todoId}`})
      props.setTodos(prevState => prevState.filter(todo=>todo.id!==todoId))
    }
    catch (error){
      console.log(error)
    }
  }

  const deleteMultipleTodo = async () =>{
    try {
      await FetchData({method: 'PUT', payload: selectedItems,url: `todos/delete-multiple`})
      props.setTodos(prevState => prevState.filter(todo=>!selectedItems.includes(todo.id)))
      setSelectedItems([])
    }
    catch (error){
      console.log(error)
    }
  }

  const resourceName = {
    singular: 'todo',
    plural: 'todos',
  };

  const bulkActions = [
    {
      content: 'Complete',
      onAction: () => updateTodo(selectedItems, true),
    },
    {
      content: 'Incomplete',
      onAction: () => updateTodo(selectedItems, false),
    },
    {
      destructive: true,
      content: 'Delete',
      onAction: () => deleteMultipleTodo(),
    },
  ];

  return (
      <Card>
        <ResourceList
            resourceName={resourceName}
            items={props.todos}
            renderItem={(item)=>TodoItem({item, updateTodo, deleteTodo})}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            bulkActions={bulkActions}
        />
      </Card>
  );
}

export default TodoList
