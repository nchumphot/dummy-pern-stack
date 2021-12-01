import React, { Fragment, useState } from "react";
import { ITodo } from "../ITodo";
import axios from "axios";

export function EditToDoItem(props: { todoItem: ITodo }): JSX.Element {
  const [newDescription, setNewDescription] = useState<string>(
    props.todoItem.description
  );
  const [newDueDate, setNewDueDate] = useState<string>(props.todoItem.due_date);

  const handleEditItem = (id: number, description: string, dueDate: string) => {
    axios.put(`https://nchumphot-todo-app.herokuapp.com/todos/${id}`, {
      description: description,
      due_date: dueDate,
      is_complete: props.todoItem.is_complete,
    });
  };

  return (
    <Fragment>
      {/* <!-- Button to Open the Modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#todo-${props.todoItem.id}`}
      >
        Edit
      </button>

      {/* <!-- The Modal --> */}
      <div className="modal" id={`todo-${props.todoItem.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h4 className="modal-title">Edit to-do</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            {/* <!-- Modal body --> */}
            <div className="modal-body">
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
              <input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
              />
            </div>

            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() =>
                  handleEditItem(props.todoItem.id, newDescription, newDueDate)
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
