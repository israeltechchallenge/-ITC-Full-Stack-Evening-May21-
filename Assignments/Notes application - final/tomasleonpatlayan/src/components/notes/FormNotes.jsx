import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../../context/notes/noteContext";
import { v4 as uuidv4 } from 'uuid';
const FormNotes = () => {
  //*Get Note Context Function
  const noteContext = useContext(NoteContext);
  const { errornote, addNote, validateNote, selectednote, updateNote } =
    noteContext;

  //*Effect that detect if there a selected Note
  useEffect(() => {
    if (selectednote !== null) {
      setNote(selectednote);
    } else {
      setNote({
        title: "",
        contentNote: "",
      });
    }
  }, [selectednote]);

  //*Stae Form
  const [note, setNote] = useState({
    title: "",
    contentNote: "",
  });

  const { title, contentNote } = note;

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //*Validation
    if (contentNote.trim() === "") {
      validateNote();
      return;
    }
    //* See if is Edit o if a New Note
    if (selectednote === null) {
      //*Add new Note to note State
      note.id = uuidv4();
      addNote(note);
    } else {
      //*Update the Current Note
      updateNote(note);
      
      
    }

    //*Restar Form
    setNote({
      title: "",
      contentNote: "",
    });
  };

  return (
    <div className="form">
      {errornote ? (
        <p className="alert-error">Please Fill the Note Content</p>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="container-input">
          <input
            type="text"
            placeholder="Title Note"
            name="title"
            value={title}
            onChange={handleChange}
          ></input>
          <textarea
            name="contentNote"
            value={contentNote}
            cols="30"
            rows="10"
            placeholder="Content Note"
            onChange={handleChange}
          ></textarea>
          <button type="submit">Add Note</button>
        </div>
      </form>
    </div>
  );
};

export default FormNotes;
