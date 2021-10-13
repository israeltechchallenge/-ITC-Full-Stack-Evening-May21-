import { useState, useEffect } from 'react';
import AddNote from './components/AddNote'
import NotesList from './components/NotesList'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as localForage from "localforage";

import { nanoid } from 'nanoid';

import date from 'date-and-time'
import ordinal from 'date-and-time/plugin/ordinal'

date.plugin(ordinal)

const App = () => {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function getNotesFromForage() {
      const savedNotes = await localForage.getItem('notes-app')
      if (savedNotes) {
        setNotes(savedNotes)
      }
    }
    getNotesFromForage()
  }, [])


  

  function addNotes(body, title) {

    const now = new Date()

    const newNote = {
      id: nanoid(),
      title: title,
      text: body,
      createdate: date.format(now, 'MMM DDD hh:mm A'),
      updatedate: null
    }

    const newNotes = [...notes, newNote]

    setNotes(newNotes)

    localForage.setItem('notes-app', newNotes)
  }

  function editNotes(id, title, body) {

    const now = new Date()
    const foundNotes = notes.find(note => note.id === id)
    foundNotes.title = title
    foundNotes.text = body
    foundNotes.updatedate = date.format(now, 'MMM DDD hh:mm A')
    setNotes(notes)
    localForage.setItem('notes-app', notes)
  }

  function deleteNote(id) {
    const newNotes = notes.filter(note => note.id !== id)
    setNotes(newNotes)
    localForage.setItem('notes-app', newNotes)
  }


  return (
    <div className="container ">
      <div className="d-flex justify-content-center mt-1">
        <AddNote handleAddNotes={addNotes} />
      </div>
      <div className="mt-2">
        <NotesList notes={notes} handleDeleteNote={deleteNote} editNotes={editNotes} />
      </div>
    </div>
  )

}

export default App
