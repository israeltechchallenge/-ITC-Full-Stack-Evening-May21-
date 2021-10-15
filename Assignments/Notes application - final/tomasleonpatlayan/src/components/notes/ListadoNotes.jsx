import React, { Fragment,useContext } from "react";
import Notes from "./Note";
import NoteContext from "../../context/notes/noteContext";
const ListadoNotes = () => {
  //* Get the Note Context Function
  const noteContext = useContext(NoteContext);
  const { notes } = noteContext;

  return (
    <Fragment>
      <div className="note-list">
        <ul>
          {notes.length === 0 ? (
            <li className="notes"> There Are Not Notes Yet</li>
          ) : (
            notes.map((note) => <Notes note={note} />)
          )}
        </ul>
      </div>
    </Fragment>
  );
};

export default ListadoNotes;
