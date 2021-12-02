import { ToDoList } from "./components/ToDoList";
import { PageHeader } from "./components/PageHeader";
import { AddToDoItem } from "./components/AddToDoItem";
import { useState, useEffect } from "react";
import { ITodo } from "./ITodo";
import { fetchData } from "./fetchData";

function App(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const filterOptions = ["Uncompleted", "All", "Overdue"];
  const [filter, setFilter] = useState<string>(filterOptions[0]);
  const sortOptions = ["Due date", "Creation date"];
  const [sorting, setSorting] = useState<string>(sortOptions[0]);

  useEffect(() => {
    fetchData(setAllTodos);
  }, []);

  return (
    <>
      <PageHeader
        {...{ filter, setFilter }}
        {...{ sorting, setSorting }}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />
      <AddToDoItem />
      <ToDoList
        {...{ allTodos, setAllTodos }}
        filter={filter}
        sorting={sorting}
      />
    </>
  );
}

export default App;
