import React, { useState, useEffect } from "react";
import CreateTask from "../Modals/CreateTask";
import localforage from "localforage";
import CardList from "../Componets/CardList";
import moment from "moment";
import ArhList from "../Componets/ArhList";
function TodoList() { //YS: Indentation! This is way too high
 

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal); //YS: Nice! 
  };
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    async function getNotesFromForage() {  //YS: Since you are not using one of your states in this function, you can declare it outside the useEffect and just call it inside. 
      const getNotes = await localforage.getItem("notes");
      const localForageNotes = getNotes ? getNotes : [];
      if (localForageNotes) {
        setNotes(localForageNotes);
      }
    }
    getNotesFromForage();
  }, []);

  useEffect(() => {
    async function getArchFromStorage() {
      const archiveFromForge = await localforage.getItem("arhive");
      if (archiveFromForge) {
        setArchivedNotes(archiveFromForge);
      }
    }
    getArchFromStorage();
  }, []);

  const editNote = (id, title, description) => {
    const findNoteToEdit = notes.find((note) => note.id === id);
    findNoteToEdit.title = title;  //YS: This is a little DRY. You can give your inputs a name in the HTML and then with object notation using brackets do something like: findNoteToEdit[e.target.name] and you will need only one line
    findNoteToEdit.description = description;
    findNoteToEdit.updateDate = moment().format("MMM Do  h:mm A");
    setNotes(notes);
    localforage.setItem("notes", notes);
    setModal(false);
  };


  function reminder(){
    let noteReminder=[...notes];
    noteReminder.forEach(note=>{
      if((note.dateRemind) &&  (note.dateRemind <=(new Date()))){
       alert(`Reminder for note:${note.title}`)
      }
    })
  }

  setInterval(function() { reminder() }, 2*60*1000); //YS: This reminder will run forever!!!!


  const addNote = (newNote) => {
    const newNotesToAdd = [...notes, newNote];
    setNotes(newNotesToAdd);
    localforage.setItem("notes", newNotesToAdd);
    setModal(false);
  };

  const deleteNote = (index) => {
    const deletedNote = [...notes];
    const noteToArh = deletedNote[index];
    const newArhNote = [...archivedNotes, noteToArh]; //YS: Ok, nice logic
    setArchivedNotes(newArhNote); //YS: Good
    deletedNote.splice(index, 1); //YS: Good 

    setNotes(deletedNote);

    localforage.setItem("notes", deletedNote);
    localforage.setItem("arhive", newArhNote);
  };

  const restoreNotes = (id) => {
    const index = archivedNotes.findIndex((note) => note.id === id);
    const note = archivedNotes[index];
    const restoreNotes = [...notes, note];
    archivedNotes.splice(index, 1);
    setNotes(restoreNotes);
    setArchivedNotes(archivedNotes);
    localforage.setItem("notes", restoreNotes);
    localforage.setItem("arhive", archivedNotes);
  };

  function showTheArchive() {
    if (archivedNotes.length !== 0) {
      setShowArchive(!showArchive);
    } else {
      alert("No deleted notes!");
    }
  }
  return (
    <>
      <div className="header ">
        <h3>Todo List</h3>
        <button className="btn btn-primary " onClick={() => setModal(true)}>
          Create Task
        </button>
        <button onClick={showTheArchive} className="btn btn-primary">
          Show Archive
        </button>
      </div>
      <CreateTask toggle={toggle} modal={modal} addNote={addNote} />
      <CardList notes={notes} deleteNote={deleteNote} editNote={editNote} />
      <h1 className="archive ">Archive</h1>
      {showArchive && (
        <ArhList archivedNotes={archivedNotes} restoreNotes={restoreNotes} />
      )}
    </>
  );
}

export default TodoList;
