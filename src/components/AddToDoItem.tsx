import { useState } from "react";
import axios from "axios";
import { fetchData } from "../util/fetchData";
import { ITodo } from "../util/ITodo";

export function AddToDoItem(props: {
  setAllTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}): JSX.Element {
  const [myDescription, setMyDescription] = useState<string>("");
  const [myDueDate, setMyDueDate] = useState<string>("");

  const handleAddItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    description: string,
    dueDate: string
  ) => {
    e.preventDefault();
    if (description === "" && dueDate === "") {
      alert("Please enter what you want to do and a due date (optional)");
    } else if (description === "") {
      alert("Please enter what you want to do.");
    } else {
      axios
        .post("https://nchumphot-todo-app.herokuapp.com/todos", {
          description: description,
          due_date: dueDate === "" ? null : dueDate,
        })
        .then(() => fetchData(props.setAllTodos));
      setMyDescription("");
      setMyDueDate("");
    }
  };

  return (
    <>
      <p>Add a to-do item:</p>
      <form>
        <input
          type="text"
          value={myDescription}
          placeholder="What do you have to do?"
          onChange={(e) => setMyDescription(e.target.value)}
        />
        <input
          type="date"
          value={myDueDate}
          onChange={(e) => {
            setMyDueDate(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={(e) => handleAddItem(e, myDescription, myDueDate)}
        >
          Add
        </button>
      </form>
    </>
  );
}
