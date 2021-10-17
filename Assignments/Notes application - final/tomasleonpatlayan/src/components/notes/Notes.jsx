import React, { useContext } from "react";
import ListAchivedNote from "./ListAchivedNote";

import FormNotes from "./FormNotes";
import ListadoNotes from "./ListadoNotes";

const Notes = () => {
  return (
    <div>
      <div className="container">
        <FormNotes />
        <ListadoNotes />
        <ListAchivedNote />
      </div>
    </div>
  );
};

export default Notes;
