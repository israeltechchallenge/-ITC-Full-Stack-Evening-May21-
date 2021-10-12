import React from 'react';
import AddNote from './components/AddNote'
import NotesList from './components/NotesList'
import 'bootstrap/dist/css/bootstrap.min.css';

import { nanoid } from 'nanoid';

import date from 'date-and-time'
import ordinal from 'date-and-time/plugin/ordinal'

date.plugin(ordinal)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
    this.addNotes = this.addNotes.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.editNotes = this.editNotes.bind(this)
  }

  addNotes(body, title) {

    const now = new Date()

    const newNote = {
      id: nanoid(),
      title: title,
      text: body,
      createdate: date.format(now, 'MMM DDD hh:mm A'),
      updatedate: null
    }

    const newNotes = [...this.state.notes, newNote]

    this.setState({ notes: newNotes })

  }

  editNotes(id, title, body) {
    
    const now = new Date()
    const notes = [...this.state.notes]
    const foundNotes = notes.find(note => note.id === id)
    foundNotes.title = title
    foundNotes.text = body
    foundNotes.updatedate = date.format(now, 'MMM DDD hh:mm A')
    this.setState({ notes: notes })
  }

  deleteNote(id) {
    const newNotes = this.state.notes.filter(note => note.id !== id)
    this.setState({ notes: newNotes })
  }

  render() {
    return (
      <div className="container ">
        <div className="d-flex justify-content-center mt-1">
          <AddNote handleAddNotes={this.addNotes} />
        </div>
        <div className="mt-2">
          <NotesList notes={this.state.notes} handleDeleteNote={this.deleteNote} editNotes={this.editNotes} />
        </div>
      </div>
    )
  }
}

export default App
