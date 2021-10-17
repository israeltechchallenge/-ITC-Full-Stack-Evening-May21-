import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import NoteContext from "../../context/notes/noteContext";
import { v4 as uuidv4 } from "uuid";
const FormNotes = () => {
  //*Get Note Context Function
  const noteContext = useContext(NoteContext);
  const { errornote, addNote, validateNote, selectednote, updateNote } =
    noteContext;

  //*Effect that detect if there a selected Note
  useEffect(() => {
    if (selectednote !== null) {
      setNote(selectednote);
    }
  }, [selectednote]);

  //*Stae Form
  const [note, setNote] = useState({
    title: "",
    contentNote: "",
    reminderDate: "",
  });

  const { title, contentNote, reminderDate } = note;

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
      note.date =new Date().getFullYear() + "-" + (new Date().getMonth() + 1)+ "-" + new Date().getDate() 
      moment(reminderDate).format("MMM Do YY");
      addNote(note);
    } else {
      //*Update the Current Note
      updateNote(note);
    }

    //*Restar Form
    setNote({
      title: "",
      contentNote: "",
      reminderDate: "",
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
            format="MMM Do h:mm:ss a"
            placeholder="Content Note"
            onChange={handleChange}
          ></textarea>
          <input
            type="date"
            name="reminderDate"
            value={reminderDate}
            onChange={handleChange}
          />
          <button type="submit">Add Note</button>
        </div>
      </form>
    </div>
  );
};

export default FormNotes;
