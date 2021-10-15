import React, { useState, useEffect, Fragment } from 'react';
import Form from './components/Form'
import ListNotes from './components/ListNotes';
import * as localForage from "localforage";
import ListArchivedNotes from './components/ListArchivedNotes';

//LINK TO THE PAGE: /* https://notesreminder.netlify.app/ */

function App() {

  //Set the state to save all the notes, initialize as an empty array:
  const [notes, setNotes] = useState([])

  //Set the state to save ALL the archived notes, initialize as an empty array:
  const [archiveNotes, setArchiveNotes] = useState([])

  //State to show the archive Notes
  const [showArchiveNotes, setShowArchiveNotes] = useState(false)

  //Add the note to the array of notes
  const createTheNote = (newNote) => {
    //Add the new note to the previous array
    const newNotesArray = [...notes, newNote]
    setNotes(newNotesArray)
    localForage.setItem('notes', newNotesArray);
  }


  //I pass this function by prop and call from the other Component with the "key" of the note I want to delete
  const archiveTheNote = key => {
    const filteredNotes = notes.filter(note => note.key !== key)
    //The new state (new array of note) is going to be all the array as before but without the note that I archived
    setNotes(filteredNotes);
    localForage.setItem('notes', filteredNotes);

    const newArchiveNote = notes.find(note => note.key === key)
    const newArchiveArray = [...archiveNotes, newArchiveNote]
    setArchiveNotes(newArchiveArray)
    localForage.setItem('notesArchived', newArchiveArray);
  }

  const restoreNote = key => {
    const newRestoreNote = archiveNotes.find(note => note.key === key)
    const newNotesArray = [...notes, newRestoreNote]
    setNotes(newNotesArray)
    localForage.setItem('notes', newNotesArray);

    const filteredArchivedNotes = archiveNotes.filter(note => note.key !== key)
    //The new state (new array of note) is going to be all the array as before but without the note that I archived
    setArchiveNotes(filteredArchivedNotes);
    localForage.setItem('notesArchived', filteredArchivedNotes);
  }

  //I pass this function by prop and call from the other Component with the information of the note I want to edit and the new information
  const editTheNote = (noteInformation, key) => {
    //Search the note in the array
    const noteToEdit = notes.find(note => note.key === key)
    noteToEdit.title = noteInformation.title;
    noteToEdit.description = noteInformation.description;
    noteToEdit.updateDate = noteInformation.updateDate;

    //Update the array of notes
    setNotes(notes)
    localForage.setItem('notes', notes);
  }

  useEffect(() => {
    async function getLocalForage() {
      const notesFromStorage = await localForage.getItem('notes')
      if (notesFromStorage) {
        setNotes(notesFromStorage)
      }
    }
    getLocalForage()
  }, [])

  useEffect(() => {
    async function getLocalForage() {
      const notesFromStorage = await localForage.getItem('notesArchived')
      if (notesFromStorage) {
        setArchiveNotes(notesFromStorage)
      }
    }
    getLocalForage()
  }, [])

  const changeStatusShowArchive = () => {
    setShowArchiveNotes(!showArchiveNotes)
  }

  return (
    <Fragment>
      <div>
        <h1 className="text-center">Note App</h1>
        <Form createTheNote={createTheNote} />
      </div>
      <button onClick={changeStatusShowArchive}>Show/Hide archived notes</button>
      {   /* I need to pass the information to the other component to render it, so I pass the array of Notes and the function to archive a note
            Also I pass the function to Edit a Note, and the state and set state of the Editing
            As well I do a ternary operator to show a message if the array is empty, that means that I dont have any note to show */}
      {notes.length ? (<ListNotes notes={notes} archiveTheNote={archiveTheNote} editTheNote={editTheNote} />) : (<h3 className='text-center'>There are not notes to show</h3>)}
      {showArchiveNotes ? <h1 className="text-center">Archived Notes</h1> : null}
      {showArchiveNotes && archiveNotes.length ? <ListArchivedNotes archiveNotes={archiveNotes} restoreNote={restoreNote} /> : null}
    </Fragment>
  )
}

export default App;
