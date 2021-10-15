import React, { useState, useEffect } from "react";
import CreateTask from "../Modals/CreateTask";
import localforage from "localforage";
import CardList from "../Componets/CardList";
import moment from "moment";
import {AiFillRest} from "react-icons/ai";
import ArhList from "../Componets/ArhList"
function TodoList() {
  // localforage.clear()

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [showArchive, setShowArchive] = useState(false)

  useEffect(() => {
    async function getNotesFromForage() {
      const getNotes = await localforage.getItem("notes");
      const localForageNotes = getNotes ? getNotes : [];
      if (localForageNotes) {
        setNotes(localForageNotes);
        noteReminder(localForageNotes);

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
    findNoteToEdit.title = title;
    findNoteToEdit.description = description;
    findNoteToEdit.updateDate = moment().format("MMM Do  h:mm A");
    setNotes(notes);
    localforage.setItem("notes", notes);
    setModal(false);
  };



function noteReminder(notes) {
  notes.forEach(note => {
   if(note.dateRemind.toLocaleDateString() === new Date().toLocaleDateString()){
     const diffTime=Math.abs(note.dateRemind - new Date().getTime());
     if(diffTime / (1000 * 60 * 60 * 24)<10){
      alert(`Reminder for note:${note.title}`);
     
   }
  }
  })
}
  
  const addNote = (newNote) => {
    const newNotesToAdd = [...notes, newNote];
    setNotes(newNotesToAdd);
    localforage.setItem("notes", newNotesToAdd);
    setModal(false);
  };

  const deleteNote = (index) => {
    const deletedNote = [...notes];
    deletedNote.splice(index, 1);
    setNotes(deletedNote);
    const noteToArh = deletedNote[index];
    const newArhNote = [...archivedNotes, noteToArh];
    setArchivedNotes(newArhNote);
    localforage.setItem("notes", deletedNote);
    localforage.setItem("arhive", newArhNote);
  };



  function showTheArchive(){
    if(archivedNotes.length !== 0){
      setShowArchive(!showArchive)
    }else{
      alert("No deleted notes!")
    }
  }
  return (
    <>
      <div className="header ">
        <h3>Todo List</h3>
        <button className="btn btn-primary " onClick={() => setModal(true)}>
          Create Task
        </button>
        <button  onClick={showTheArchive} className="btn btn-primary" >
         Show Archive
        </button>

      </div>
      {showArchive && <ArhList archivedNotes={archivedNotes}/>}

      <CreateTask toggle={toggle} modal={modal} addNote={addNote} />
      <CardList notes={notes} deleteNote={deleteNote} editNote={editNote} />
    </>
  );
}

export default TodoList;
