import './App.css';
import Form from './components/Form'
import NoteList from './components/Notelist'
import localforage from "localforage";
import {useState, useEffect} from 'react'

// deploy site https://distracted-bhabha-fb801a.netlify.app/

function App(){
 
  const [notes, setNotes] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [showArchive, setShowArchive] = useState(false)

  useEffect(() => {
    async function getNotesFromStorage(){
      const notesFromStorage = await localforage.getItem('notes')
      if(notesFromStorage){
        setNotes(notesFromStorage)
        notesFromStorage.forEach(notes => {
        if(notes.dateToRemind === new Date().toISOString().split('T')[0] ){
            alert(`Reminder Due for ${notes.title}!! 
            Note: ${notes.note}`)
          }
        })}}
    getNotesFromStorage()
  }, [])


  useEffect(() => {
    async function getArchiveFromStorage(){
    const archiveFromStorage = await localforage.getItem('archivedNotes')
    if(archiveFromStorage){
      setArchivedNotes(archiveFromStorage)
    }}getArchiveFromStorage()
},[])

useEffect(() => {
  async function saveToLocalForage(){
    await localforage.setItem('notes', notes)
    await localforage.setItem('archivedNotes', archivedNotes)
  }
  saveToLocalForage()
},[notes, archivedNotes])



  function addNote (newNote) {
    const newNotesArray = [...notes, newNote]
    setNotes(newNotesArray)
  }
  
  function sortNotes(notesArray){
    notesArray.sort(function (a, b) {
      return new Date(a.readbleDate) - new Date(b.readbleDate);
  });
  }

  function restoreNote (restoredNote, index) {
    const newNotesArray = [...notes, restoredNote]
    sortNotes(newNotesArray)
    setNotes(newNotesArray)
    const newArchiveArray = [...archivedNotes]
    newArchiveArray.splice(index, 1)
    setArchivedNotes(newArchiveArray)
  }

  function deleteNote (index) {
      if (window.confirm("Do you really want to delete?")) {
      const newNoteArray = [...notes]
      const noteToArchive = newNoteArray[index]
      const newArchiveArray = [...archivedNotes, noteToArchive]
      setArchivedNotes(newArchiveArray)
      newNoteArray.splice(index, 1)
      setNotes(newNoteArray)
    }}

  function editNote(id, title, note) {
    const noteToEdit = notes.find(note=> note.id === id)
    noteToEdit.note = note
    noteToEdit.updatedDate = `Updated On: ${new Date().toUTCString().slice(0, -7)}`
    noteToEdit.title = title
    setNotes([...notes])
  }
  function showTheArchive(){
    if(archivedNotes.length !== 0){
      setShowArchive(!showArchive)
    }else{
      alert("No deleted notes!")
    }
  }
  
      return (
     <div>
       <h1>Notes App</h1>
      <Form addNote={addNote} />
      <h2>My Notes</h2>
      <NoteList notes={notes} deleteNote={deleteNote} editNote={editNote}/>
      <h2>My Archive</h2>
      <button onClick={showTheArchive}>
              Show/Hide Archived
            </button>
      {showArchive && <NoteList notes={archivedNotes} restoreNote={restoreNote}/>}
     </div>
  );
}
export default App;
