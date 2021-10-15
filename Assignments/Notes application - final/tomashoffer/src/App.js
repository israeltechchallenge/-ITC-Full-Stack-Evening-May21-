import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import NoteList from "./components/NoteList";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import localforage from "localforage";


const App = () => {
  let notesFromStorage = localforage.getItem('notes')
  if(!notesFromStorage){
    notesFromStorage = [];
  }
    // ARREGLO DE NOTAS
  const [notes, setNotes] = useState([]);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
useEffect(() => {
  async function getNotes(){
    const notesFromStorage = await localforage.getItem('notes')
    if(notesFromStorage){
      setNotes(notesFromStorage)
}}
      getNotes()
}, [notesFromStorage])

  function addNote(title, note) {
    const newData = {
      title: title,
      note: note,
      date: new Date().toLocaleString("en-GB"),
      id: uuidv4(),
      update: null
    };
    setNotes([...notes, newData]);
    const setAdd = localforage.setItem('notes', newData)
    console.log("setAdd", setAdd)
  
  }

  function deleteNote(id) {
    let r = window.confirm("You are going to delete this Note, are you sure?");
    if (r === true) {
      const deleteNote = notes.filter((note) => note.id !== id);
      setNotes(deleteNote)
      const setDelete = localforage.setItem('notes', deleteNote)
      console.log("setDelete", setDelete)
    } else {
      return;
    }
  }

  function editNote(data){
    console.log(data)
    const editArray = notes;
    const findNoteIndex = editArray.findIndex((note) => note.id === data.id);
    editArray[findNoteIndex].title = data.title;
    editArray[findNoteIndex].note = data.note;
    editArray[findNoteIndex].update = new Date().toLocaleString("en-GB");

    // this.setState((oldState) => ({ ...oldState, notes: editArray }));

    setNotes(editArray)
    const setEdit = localforage.setItem('notes', editArray)
    console.log("setDelete", setEdit)
  }

    return (
      <div className="App">
        <h1>Take Notes!</h1>
        <Form 
        addNote={addNote}
        />
        <NoteList 
              notes={notes} 
              deleteNote={deleteNote} 
              editNote={editNote} 
          />
      </div>
    );

}

export default App;

// useEffect( () => {
//   let citasIniciales = localforage.getItem('notes');
// console.log('get', notasEnLocalForage)
//   if(citasIniciales) {
//     localforage.setItem('notes', notes)
    
//   } else {
//     localforage.setItem('notes', []);
//   }
// }, [notes, notasEnLocalForage] );

// useEffect(() => {
//   async function getNotes(){
//     const notesFromStorage = await localforage.getItem('notes')
//     if(notesFromStorage){
//       setNotes(notesFromStorage)
// }}
//       getNotes()
// }, [])