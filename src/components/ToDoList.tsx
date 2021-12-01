import { ITodo } from "../ITodo";
import axios from "axios";
import { EditToDoItem } from "./EditToDoItem";

export function ToDoList(props: { todos: ITodo[] }): JSX.Element {
  const handleDeleteItem = (id: number) => {
    axios.delete(`https://nchumphot-todo-app.herokuapp.com/todos/${id}`);
  };

  const handleMarkAsCompleted = (
    id: number,
    description: string,
    dueDate: string,
    isCompleted: boolean
  ) => {
    axios.put(`https://nchumphot-todo-app.herokuapp.com/todos/${id}`, {
      description: description,
      due_date: dueDate,
      is_complete: isCompleted === true ? false : true,
    });
    console.log(isCompleted === true ? false : true);
  };

  const todoItem = (item: ITodo): JSX.Element => {
    return (
      <tr key={item.id}>
        <td>
          <input
            type="checkbox"
            defaultChecked={item.is_complete}
            onClick={() =>
              handleMarkAsCompleted(
                item.id,
                item.description,
                item.due_date,
                item.is_complete
              )
            }
          />
        </td>
        <td>{item.description}</td>
        <td>{item.due_date === null ? "None" : item.due_date.substr(0, 10)}</td>
        <td>
          <EditToDoItem todoItem={item} />
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteItem(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <>
      <h2>My to-do list:</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Checkbox</th>
            <th scope="col">Description</th>
            <th scope="col">Due date</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{props.todos.map((item) => todoItem(item))}</tbody>
      </table>
    </>
  );
}
