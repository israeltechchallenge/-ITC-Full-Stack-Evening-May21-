import React from "react";
import autoLineBreaks from "auto-line-breaks"


const Note = (props) => {
  const { title, note, date, id } = props.notes;

  return (
    <div>
      <div style={{ border: "1px solid black", margin: "10px", padding: "10px", alignItems: "center"}}>
        <h4>Title: {title}</h4>
        <h4>Note: {autoLineBreaks(`${note}`, 30)}</h4>
        <h4>Date: {date}</h4>
        <button className="btn btn-danger" onClick={() => props.deleteNote(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Note;

