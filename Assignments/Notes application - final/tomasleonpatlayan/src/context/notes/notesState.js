import React, { useReducer } from "react";
import NoteContext from "./noteContext";
import NoteReducer from "./notesReducer";

import {
  ADD_NOTES,
  NOTE_VALIDATE,
  CURRENT_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE,
  ACHIVED_NOTE,
} from "../../types/index";
const NoteState = (props) => {
  // set Initial State
  const initialState = {
    notes: [],
    selectednote: null,
    errornote: false,
    achivednotes: [],
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

  //*Delete Note by Id
  const deleteNote = (id) => {
    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });
  };

  //* Update a Note
  const updateNote = (note) => {
    dispatch({
      type: UPDATE_NOTE,
      payload: note,
    });
  };

  //* Achived Note

  const achivedCurrentNote = (note) => {
    dispatch({
      type: ACHIVED_NOTE,
      payload: note,
    });
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        errornote: state.errornote,
        selectednote: state.selectednote,
        achivednotes: state.achivednotes,
        addNote,
        validateNote,
        setCurrentNote,
        updateNote,
        deleteNote,
        achivedCurrentNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
