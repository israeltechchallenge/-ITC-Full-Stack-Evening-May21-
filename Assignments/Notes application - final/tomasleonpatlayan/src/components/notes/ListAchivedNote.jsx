import React, { useContext, useEffect } from "react";
import NoteContext from "../../context/notes/noteContext";
import AchivedNote from "./AchivedNote";
import * as localForage from "localforage";
const ListAchivedNote = () => {
  //*Get Note Context Function
  const noteContext = useContext(NoteContext);
  const { achivednotes } = noteContext;

  const setAchivesNotes = () => {
    localForage.setItem("achivednotes", achivednotes);
    console.log(achivednotes);
  };

  setAchivesNotes()
 
  return (
    <div>
      <h1>Achived Note</h1>
      <ul>
        {achivednotes.length === 0 ? (
          <li className="notes"> There Are Not Achived Notes Yet</li>
        ) : (
          achivednotes.map((note) => <AchivedNote note={note} key={note.id} />)
        )}
      </ul>
    </div>
  );
};

export default ListAchivedNote;
