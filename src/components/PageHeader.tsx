export function PageHeader(props: {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  sorting: string;
  setSorting: React.Dispatch<React.SetStateAction<string>>;
  filterOptions: string[];
  sortOptions: string[];
}): JSX.Element {
  const radioButton = (
    option: string,
    state: string,
    key: number,
    groupName: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    return (
      <>
        {" "}
        <input
          type="radio"
          name={groupName}
          value={option}
          key={key}
          checked={state === option}
          onChange={() => {
            setState(option);
          }}
        />
        <label htmlFor={option}>{option}</label>
      </>
    );
  };

  return (
    <>
      <h1>Welcome to my To-do App!</h1>
      <label>Show:</label>
      {props.filterOptions.map((item, idx) =>
        radioButton(item, props.filter, idx, "filter-options", props.setFilter)
      )}
      <br />
      <label>Sort by:</label>
      {props.sortOptions.map((item, idx) =>
        radioButton(item, props.sorting, idx, "sort-options", props.setSorting)
      )}
    </>
  );
}
