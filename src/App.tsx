import { ToDoList } from "./components/ToDoList";
import { PageHeader } from "./components/PageHeader";
import { AddToDoItem } from "./components/AddToDoItem";
import { useState, useEffect } from "react";
import { ITodo } from "./ITodo";

function App(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const filterOptions = ["All", "Uncompleted", "Overdue"];
  const [filter, setFilter] = useState<string>(filterOptions[1]);

  const fetchData = async () => {
    const response = await fetch(
      "https://nchumphot-todo-app.herokuapp.com/todos"
    );
    const jsonBody = await response.json();
    // console.log(jsonBody.result.rows);
    setAllTodos(jsonBody.result.rows);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <PageHeader {...{ filter, setFilter }} />
      <AddToDoItem />
      <ToDoList todos={allTodos} />
    </>
  );
}

export default App;
