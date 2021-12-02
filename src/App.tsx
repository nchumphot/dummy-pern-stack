import { ToDoList } from "./components/ToDoList";
import { PageHeader } from "./components/PageHeader";
import { AddToDoItem } from "./components/AddToDoItem";
import { useState, useEffect } from "react";
import { ITodo } from "./ITodo";
import { fetchData } from "./fetchData";

function App(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const filterOptions = ["All", "Uncompleted", "Overdue"];
  const [filter, setFilter] = useState<string>(filterOptions[1]);

  useEffect(() => {
    fetchData(setAllTodos);
  }, []);

  return (
    <>
      <PageHeader {...{ filter, setFilter }} />
      <AddToDoItem />
      <ToDoList {...{ allTodos, setAllTodos }} filter={filter} />
    </>
  );
}

export default App;
