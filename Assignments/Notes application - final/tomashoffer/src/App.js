import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import NoteList from "./components/NoteList";
import "./App.css";
import localforage from "localforage";
import ArchivedNotes from "./components/ArchivedNotes";
import { Button } from "react-bootstrap";

const App = () => {
  // ARREGLO DE NOTAS
  const [notes, setNotes] = useState([]);
  const [archived, setArchived] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    async function getNotesData() { //YS: You dont need to write the whole function inside the useEffect, just call it (line 23) - the function declaration should go outside. 
      const notesFromStorage = await localforage.getItem("notes");
      if (notesFromStorage) {
        setNotes(notesFromStorage);
      }
    }
    getNotesData();
  }, []);

  useEffect(() => {
    async function getStoreData() { //YS: same as before
      const archivedNotesStorage = await localforage.getItem("notes");
      if (archivedNotesStorage) {
        setArchived(archivedNotesStorage);
      }
    }
    getStoreData();
  }, []);

  function addNote(newNote) {
    const addNewNote = [...notes, newNote];
    setNotes(addNewNote);
    localforage.setItem("notes", addNewNote);
  }

  function deleteNote(id) {
    let resp = window.confirm(
      "You are going to delete this Note, are you sure?"
    );
    if (resp === true) {
      const deleteNote = notes.filter((note) => note.id !== id);
      setNotes(deleteNote);
      localforage.setItem("notes", deleteNote);
    } else {
      return;
    }
  }

  function editNote(data) {
    const editArray = notes; //YS: You shouldnt use your state directly, you should copy it: const editArray = [...notes]
    const findNoteIndex = editArray.findIndex((note) => note.id === data.id);
    editArray[findNoteIndex].title = data.title;
    editArray[findNoteIndex].note = data.note;
    editArray[findNoteIndex].update = Date.now();
    editArray[findNoteIndex].reminder = data.reminder;
    setNotes(editArray);
    localforage.setItem("notes", editArray);
  }

  function archivedNote(note) {
    const archiveNotes = [...archived, note];
    const deleteNote = notes.filter((notes) => notes.id !== note.id);
    setNotes(deleteNote);
    setArchived(archiveNotes);
    localforage.setItem("notes", deleteNote);
    localforage.setItem("archivedNotes", archiveNotes);
  }

  function unarchiveNote(note) {
    const restoreNote = [...notes, note];
    const unArchiveNote = archived.filter((notes) => notes.id !== note.id);
    setArchived(unArchiveNote);
    setNotes(restoreNote);
    localforage.setItem("notes", restoreNote);
    localforage.setItem("archivedNotes", unArchiveNote);
  }

  function showAchivedNotes() {
    if (showArchived === false && archived.length !== 0) { //YS: Nice
      setShowArchived(true);
    } else {
      setShowArchived(false);
    }
  }

  return (
    <div className="App">
      <h1>Take Notes!</h1>
      <Form addNote={addNote} />
      {archived.length === 0 ? null : (
        <Button
          style={{ marginTop: "20px", color: "white" }}
          type="submit"
          variant="primary"
          onClick={() => showAchivedNotes()}
        >
          SHOW ARCHIVED
        </Button>
      )}

      <NoteList
        notes={notes}
        archivedNote={archivedNote}
        deleteNote={deleteNote}
        editNote={editNote}
      />
      {showArchived ? (
        <ArchivedNotes
          archived={archived}
          unarchiveNote={unarchiveNote}
          addNote={addNote}
        />
      ) : null}
    </div>
  );
};

export default App;
