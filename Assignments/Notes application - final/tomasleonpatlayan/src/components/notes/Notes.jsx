import React, { useContext } from "react";
import FormNotes from "./FormNotes";
import ListadoNotes from "./ListadoNotes";


const Notes = () => {

  return (
    <div>
      <div className="container">
        <FormNotes />
        <ListadoNotes />
      </div>
    </div>
  );
};

export default Notes;
