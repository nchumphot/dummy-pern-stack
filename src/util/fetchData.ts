import { ITodo } from "./ITodo";

export const fetchData = async (
  setAllTodos: React.Dispatch<React.SetStateAction<ITodo[]>>
) => {
  const response = await fetch(
    "https://nchumphot-todo-app.herokuapp.com/todos"
  );
  const jsonBody = await response.json();
  setAllTodos(jsonBody.result.rows);
};
