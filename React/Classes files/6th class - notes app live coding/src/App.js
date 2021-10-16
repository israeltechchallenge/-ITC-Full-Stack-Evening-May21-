import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import Noteslist from './components/NotesList'
import './App.css';
import { v4 as uuidv4 } from 'uuid'
import localforage from 'localforage';
function App() {
  const [notesList, setNotesList] = useState([])
  const [archivedNotesList, setArchivedNotesList] = useState([])
  const [test, settest] = useState(1)

  useEffect(() => {
    settest(2)
    console.log('effect')
  }, [])

  // useEffect(() => {
  //   const saveNotesLists = async () => {
  //     await localforage.setItem('notesList',notesList)
  //     await localforage.setItem('archivedNotesList',archivedNotesList)
  //   }
  //   saveNotesLists()
  // }, [notesList,archivedNotesList])

  // useEffect(() => {
  //   const getNotesList = async () => {
  //     const notesListFromStorage = await localforage.getItem('notesList')
  //     const archivedNotesListFromStorage = await localforage.getItem('archivedNotesList')
  //     console.log({notesListFromStorage,archivedNotesListFromStorage})
  //     if(notesListFromStorage)
  //       setNotesList(notesListFromStorage)
  //     if(archivedNotesListFromStorage)
  //       setArchivedNotesList(archivedNotesListFromStorage)
  //   }
  //   getNotesList()
  // },[])





  const addNote = (newNote) => setNotesList([...notesList, {...newNote, id:uuidv4(), createdDate:Date.now()}])
  
  const updateNote = (index, updatedNote) => {
    const updatedNoteList = [...notesList]
    updatedNoteList[index] = {...updatedNote, updatedDate:Date.now()}
    setNotesList(updatedNoteList)
  }
  const archiveNote = (index) => {
    const updatedNoteList = [...notesList]
    const newArchivedNotesList = [...archivedNotesList, notesList[index]]
    updatedNoteList.splice(index, 1)
    setNotesList(updatedNoteList)
    setArchivedNotesList(newArchivedNotesList)
  }
  const restoreNote = (index) => {
    const updatedNoteList = [...notesList, archivedNotesList[index]]
    const newArchivedNotesList = [...archivedNotesList]
    newArchivedNotesList.splice(index, 1)
    setNotesList(updatedNoteList)
    setArchivedNotesList(newArchivedNotesList)
  }

  console.log('app redner')
  return (
    <div className="App">
      <h1> Notes App!</h1>
      <NoteForm addNote={addNote} updateNote={updateNote} />
      <h2> Notes:</h2>
      <Noteslist notes={notesList} {...{ updateNote, archiveNote, restoreNote }} />
      <h2>Archived</h2>
      <Noteslist notes={archivedNotesList} {...{ updateNote, archiveNote, restoreNote }} archived/>
      
    </div>
  );
}

export default App;
