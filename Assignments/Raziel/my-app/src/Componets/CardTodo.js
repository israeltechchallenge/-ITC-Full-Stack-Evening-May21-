import React, { useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";

import EditTask from "../Modals/EditTask";
const colors = [
  {
    primaryColor: "#5D93E1",
    secondaryColor: "#ECF3FC",
  },
  {
    primaryColor: "#F9D288",
    secondaryColor: "#FEFAF1",
  },
  {
    primaryColor: "#5DC250",
    secondaryColor: "#F2FAF1",
  },
  {
    primaryColor: "#F48687",
    secondaryColor: "#FDF1F1",
  },
  {
    primaryColor: "#B964F7",
    secondaryColor: "#F3F0FD",
  },
];
function CardTodo({ notes, index, deleteNote, editNote }) {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div className="card-wrapper ">
      <div
        className="card-top"
        style={{ "background-color": colors[index % 5].primaryColor }}
      ></div>
      <div className="task-holder">
        {notes.title.length !== 0 ? (
          <span
            className="card-header"
            style={{
              "background-color": colors[index % 5].secondaryColor,
              "border-radius": "10px",
            }}
          >
            {notes.title}
          </span>
        ) : (
          <div className="empty"></div>
        )}

        <p className="mt-3">{notes.description}</p>
        <span className="date">{notes.date}</span>
        {notes.updateDate ? (
          <span
            style={{ color: colors[index % 5].primaryColor }}
            className="dateUpdate"
          >
            {" "}
            Last update at: {notes.updateDate}
          </span>
        ) : null}
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <AiFillEdit
            className="icon"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => setModal(true)}
          />
          <AiOutlineDelete
            className="icon"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={() => {
              window.confirm("Are you sure you want to delete this note")
                ? deleteNote(index, notes.id)
                : alert("Delete Cancelled");
            }}
          />
        </div>
      </div>
      <EditTask
        modal={modal}
        toggle={toggle}
        notes={notes}
        editNote={editNote}
      />
    </div>
  );
}

export default CardTodo;
