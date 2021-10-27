import "./App.css";
import Form from "./components/form";
import NoteList from "./components/Notelist";
import { useState, useEffect } from "react";
import axios from "axios";

// deploy site https://distracted-bhabha-fb801a.netlify.app/

function App() {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showArchive, setShowArchive] = useState(false);
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  useEffect(() => {
    async function getNotesFromDatabase() { 
      const notesFromDatabase = await axios.get("/notes/getAllNotes")
      console.log(notesFromDatabase.data)
    //   const archiveFromStorage = await localforage.getItem("archivedNotes");
      if (notesFromDatabase.data) {
        setNotes(notesFromDatabase.data);
        notesFromDatabase.data.forEach((notes) => {
          if (notes.dateToRemind === new Date().toISOString().split("T")[0]) {
            alert(`Reminder Due for ${notes.title}!! 
            Note: ${notes.note}`);
          }
        });
      }
    //   if (archiveFromStorage) {
    //     setArchivedNotes(archiveFromStorage);
    //   }
    // }
    }
    getNotesFromDatabase(); 
  }, []);

  // useEffect(() => {
  //   async function saveToLocalForage() {//YS: Same as with the other useEffect - you only need to call the function here
  //     await localforage.setItem("notes", notes);
  //     await localforage.setItem("archivedNotes", archivedNotes);
  //   }
  //   saveToLocalForage();
  // }, [notes, archivedNotes]);

  async function addNote(newNote) {
    const newNotesArray = [...notes, newNote];
    setNotes(newNotesArray);
    const addedNote = await axios.post("/notes/addNote", {
      note: newNote
    })
    alert("Noted Added!");
  }

  function sortNotes(notesArray) {
    notesArray.sort(function (a, b) {
      return new Date(a.readbleDate) - new Date(b.readbleDate);
    });
  }

  function restoreNote(restoredNote, index) {
    const newNotesArray = [...notes, restoredNote];
    sortNotes(newNotesArray);
    setNotes(newNotesArray); 
    const newArchiveArray = [...archivedNotes];
    newArchiveArray.splice(index, 1);
    setArchivedNotes(newArchiveArray);
    alert("Note Restored!");
  }

  async function deleteNote(index, noteID) {
    if (window.confirm("Do you really want to delete?")) {
      // const newNoteArray = [...notes];
      // const noteToArchive = newNoteArray[index];
      // const newArchiveArray = [...archivedNotes, noteToArchive];
      // setArchivedNotes(newArchiveArray);
      // newNoteArray.splice(index, 1);
      const deleteNote = await axios.delete(`/notes/deleteNote/${noteID}`)
      setNotes(deleteNote.data);
      alert("Note Deleted! You can now find it in the archives.");
    }
  }

  function editNote(id, title, note) {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit.title === title && noteToEdit.note === note) {
      alert("Note not Edited!");
      return;
    }
    noteToEdit.note = note;
    noteToEdit.updatedDate = `Updated On: ${new Date()
      .toUTCString()
      .slice(0, -7)}`;
    noteToEdit.title = title;
    setNotes([...notes]);
    alert("Edited Succefully!");
  }

  function showTheArchive() {
    if (archivedNotes.length !== 0) {
      setShowArchive(!showArchive);
    } else {
      alert("No deleted notes!");
    }
  }

  return (
    <div>
      <h1>Notes App</h1>
      <Form addNote={addNote} />
      <h2>My Notes</h2>
      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote} />
      <h2>My Archive</h2>
      <button onClick={showTheArchive}>Show/Hide Archived</button>
      {showArchive && (
        <NoteList notes={archivedNotes} restoreNote={restoreNote} />
      )}
    </div>
  );
}
export default App;