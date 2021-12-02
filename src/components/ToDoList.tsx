import { ITodo } from "../ITodo";
import axios from "axios";
import { EditToDoItem } from "./EditToDoItem";
import { fetchData } from "../fetchData";

export function ToDoList(props: {
  allTodos: ITodo[];
  setAllTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  filter: string;
  sorting: string;
}): JSX.Element {
  const handleDeleteItem = (id: number) => {
    axios.delete(`https://nchumphot-todo-app.herokuapp.com/todos/${id}`);
  };

  const handleMarkAsCompleted = (
    id: number,
    description: string,
    dueDate: string,
    isCompleted: boolean
  ) => {
    const newIsCompleted = !isCompleted;
    axios
      .put(`https://nchumphot-todo-app.herokuapp.com/todos/${id}`, {
        description: description,
        due_date: dueDate,
        is_complete: newIsCompleted,
      })
      .then(() => fetchData(props.setAllTodos));
  };

  const todoItem = (item: ITodo): JSX.Element => {
    return (
      <tr key={item.id}>
        <td>
          <input
            type="checkbox"
            checked={item.is_complete}
            onChange={() => {
              handleMarkAsCompleted(
                item.id,
                item.description,
                item.due_date,
                item.is_complete
              );
            }}
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

  const filterbyOptions = (item: ITodo) => {
    if (props.filter === "All") {
      return item;
    } else if (props.filter === "Uncompleted") {
      return !item.is_complete && item;
    } else if (props.filter === "Overdue") {
      const shouldShow =
        new Date(item.due_date) < new Date() && item.is_complete === false;
      return shouldShow && item;
    }
  };

  const sortByOptions = (a: ITodo, b: ITodo) => {
    if (props.sorting === "Due date") {
      return Date.parse(a.due_date) - Date.parse(b.due_date);
    } else if (props.sorting === "Creation date") {
      return Date.parse(a.creation_date) - Date.parse(b.creation_date);
    } else {
      return 0;
    }
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
        <tbody>
          {props.allTodos
            .filter(filterbyOptions)
            .sort(sortByOptions)
            .map((item) => todoItem(item))}
        </tbody>
      </table>
    </>
  );
}
