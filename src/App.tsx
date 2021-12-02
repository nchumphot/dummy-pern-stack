import { ToDoList } from "./components/ToDoList";
import { PageHeader } from "./components/PageHeader";
import { AddToDoItem } from "./components/AddToDoItem";
import { useState, useEffect } from "react";
import { ITodo } from "./util/ITodo";
import { fetchData } from "./util/fetchData";
import { trackPromise } from "react-promise-tracker";

function App(): JSX.Element {
  const [allTodos, setAllTodos] = useState<ITodo[]>([]);
  const filterOptions = ["Uncompleted", "All", "Overdue"];
  const [filter, setFilter] = useState<string>(filterOptions[0]);
  const sortOptions = ["Due date", "Creation date"];
  const [sorting, setSorting] = useState<string>(sortOptions[0]);

  useEffect(() => {
    trackPromise(fetchData(setAllTodos));
  }, []);

  return (
    <>
      <PageHeader
        {...{ filter, setFilter }}
        {...{ sorting, setSorting }}
        filterOptions={filterOptions}
        sortOptions={sortOptions}
      />
      <AddToDoItem setAllTodos={setAllTodos} />
      <ToDoList
        {...{ allTodos, setAllTodos }}
        filter={filter}
        sorting={sorting}
      />
    </>
  );
}

export default App;
