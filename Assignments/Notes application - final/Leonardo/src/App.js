import React, { useState, Fragment } from 'react';
import Form from './components/Form'
import ListNotes from './components/ListNotes';

function App() {

  //Set the state to create and save ALL the notes, initialize as an empty array:
  const [notes, setNotes] = useState([])

  //Add the note to the array of notes
  const createTheNote = (newNote) => {
    //Add the new note to the previous array
    setNotes([
      ...notes, newNote
    ])
  }


  //I pass this function by prop and call from the other Component with the "key" of the note I want to delete
  const deleteTheNote = key => {
    const filteredNotes = notes.filter(note => note.key !== key)
    //The new state (new array of note) is going to be all the array as before but without the note that I deleted
    setNotes(filteredNotes)
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
  }

  return (
    <Fragment>
      <div>
        <h1 className="text-center">Note App</h1>
        <Form createTheNote={createTheNote} />
      </div>
      {   /* I need to pass the information to the other component to render it, so I pass the array of Notes and the function to delete a note
            Also I pass the function to Edit a Note, and the state and set state of the Editing
            As well I do a ternary operator to show a message if the array is empty, that means that I dont have any note to show */}
      {
        notes.length ? (
          <ListNotes
            notes={notes}
            deleteTheNote={deleteTheNote}
            editTheNote={editTheNote}
          />
        ) : (
          <h3 className='text-center'>There are not notes to show</h3>
        )
      }
    </Fragment>
  )
}

export default App;
