import { ITodo } from "../ITodo";

export function ToDoList(props: { todos: ITodo[] }): JSX.Element {
  const todoItem = (item: ITodo): JSX.Element => {
    return (
      <>
        <h3>{item.description}</h3>
        <p>Due date: {item.due_date.substr(0, 10)}</p>
      </>
    );
  };

  return (
    <>
      <h2>My to-do list:</h2>
      {props.todos.map((item) => todoItem(item))}
    </>
  );
}
