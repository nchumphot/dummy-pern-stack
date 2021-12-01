import { ToDoList } from "./components/ToDoList";
import { PageHeader } from "./components/PageHeader";
import { AddToDoItem } from "./components/AddToDoItem";
import { useState, useEffect } from "react";

function App(): JSX.Element {
  const [allTodos, setAllTodos] = useState<any[]>([]);

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
      <PageHeader />
      <AddToDoItem />
      <ToDoList todos={allTodos} />
    </>
  );
}

export default App;
