import React, { useReducer } from "react";
import NoteContext from "./noteContext";
import NoteReducer from "./notesReducer";
import {
  ADD_NOTES,
  NOTE_VALIDATE,
  CURRENT_NOTE,
  UPDATE_NOTE,
} from "../../types/index";
const NoteState = (props) => {
  // set Initial State
  const initialState = {
    notes: [
      { id: 1, title: "HOla 1", contentNote: "Content Note" },
      { id: 2, title: "HOla12", contentNote: "Content Note" },
      { id: 3, title: "HOla 5", contentNote: "Content Note" },
    ],
    selectednote: null,
    errornote: false,
  };

  const [state, dispatch] = useReducer(NoteReducer, initialState);

  //* Add a Note

  const addNote = (note) => {
    dispatch({
      type: ADD_NOTES,
      payload: note,
    });
  };

  //*Validate Note
  const validateNote = () => {
    dispatch({
      type: NOTE_VALIDATE,
    });
  };

  //*Extract a Note to Edit it
  const setCurrentNote = (note) => {
    dispatch({
      type: CURRENT_NOTE,
      payload: note,
    });
  };
  //* Update a Note
  const updateNote = (note) => {
    dispatch({
      type: UPDATE_NOTE,
      payload: note,
    });
  };
  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        errornote: state.errornote,
        selectednote: state.selectednote,
        addNote,
        validateNote,
        setCurrentNote,
        updateNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
