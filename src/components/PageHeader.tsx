export function PageHeader(props: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  return (
    <>
      <h1>Welcome to my To-do App!</h1>
      Show:{" "}
      <input
        type="radio"
        name="filter"
        value={0}
        checked={props.filter === "All"}
        onClick={() => props.setFilter("All")}
      />
      <label htmlFor="All">All</label>{" "}
      <input
        type="radio"
        name="filter"
        value={1}
        checked={props.filter === "Uncompleted"}
        onClick={() => props.setFilter("Uncompleted")}
      />
      <label htmlFor="Uncompleted">Uncompleted</label>{" "}
      <input
        type="radio"
        name="filter"
        value={2}
        checked={props.filter === "Overdue"}
        onClick={() => props.setFilter("Overdue")}
      />
      <label htmlFor="Overdue">Overdue</label>
    </>
  );
}
