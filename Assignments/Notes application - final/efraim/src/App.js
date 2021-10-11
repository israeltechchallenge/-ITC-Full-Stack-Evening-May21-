import './App.css';
import Form from './components/form'
import NoteList from './components/notelist'
import {useState} from 'react'


function App(){
  
  const [notes, setNotes] = useState([])

  function addNote (newNote) {
    setNotes([...notes, newNote])
  }

  function deleteNote (index) {
      if (window.confirm("Do you really want to delete?")) {
      const newNoteArray = [...notes]
      newNoteArray.splice(index, 1)
      setNotes(newNoteArray)
    }}

  function editNote(id, title, note) {
    const noteToEdit = notes.find(note=> note.id === id)
    noteToEdit.note = note
    noteToEdit.date = new Date().toUTCString().slice(0, -7)
    noteToEdit.title = title
    setNotes([...notes])
  }

      return (
     <div>
      <Form addNote={addNote} />
      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote}/>
     </div>
  );
}
export default App;
