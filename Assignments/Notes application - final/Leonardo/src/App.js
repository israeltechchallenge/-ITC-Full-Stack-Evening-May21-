import { useState, useEffect } from 'react';
import Form from './components/Form'
import ListNotes from './components/ListNotes';
import * as localForage from "localforage";
import shortid from 'shortid'
import swal from 'sweetalert'

//LINK TO THE PAGE: /* https://notesreminder.netlify.app/ */

function App() {

  //All the notes:
  const [notesList, setNotesList] = useState([])
  //All the archive notes:
  const [archiveList, setArchiveList] = useState([])
  //Boolean to show or not archive notes:
  const [showArchiveList, setShowArchiveList] = useState(false)

  //Save the information in localForage when the state of "notesList" or "archiveList" change
  useEffect(() => { //YS: Nice

    const saveNotesList = async () => {
      await localForage.setItem('notes', notesList);
      await localForage.setItem('notesArchived', archiveList);
    }
    saveNotesList()
  }, [notesList, archiveList])

  //Get the information from localForage when I initialite the App
  useEffect(() => {
    const getNotesList = async () => {
      const notesListFromForage = await localForage.getItem('notes');
      const archiveListFromForage = await localForage.getItem('notesArchived');
      if (notesListFromForage) {
        setNotesList(notesListFromForage)
      }
      if (archiveListFromForage) {
        setArchiveList(archiveListFromForage)
      }
    }
    getNotesList()
  }, [])

  const addNote = (newNote) => {
    //Copy the old array of notes and add the note that I recieve from the Form with an Id and a created date
    setNotesList([...notesList, { ...newNote, key: shortid.generate(), date: new Date() }])
  }

  const updateNote = (noteInformation, index) => {
    //Copy the array of notes, then update the element on that index, and save the array
    const copyNotesList = [...notesList]
    copyNotesList[index] = { ...noteInformation, updateDate: new Date() }
    setNotesList(copyNotesList)
  }

  const archiveNote = key => {
    //Delete the note from the list of notes array
    const filteredNotes = notesList.filter(note => note.key !== key)
    setNotesList(filteredNotes);

    //Add the note into the archive array
    const newArchiveNote = notesList.find(note => note.key === key)
    const newArchiveArray = [...archiveList, newArchiveNote]
    setArchiveList(newArchiveArray)
  }

  const restoreNote = key => {
    //Add the note into the list of notes array
    const newRestoreNote = archiveList.find(note => note.key === key)
    const newNotesArray = [...notesList, newRestoreNote]
    setNotesList(newNotesArray)

    //Delete the note from the archive array
    const filteredArchivedNotes = archiveList.filter(note => note.key !== key)
    setArchiveList(filteredArchivedNotes);
  }

  const changeStatusShowArchive = () => {
    setShowArchiveList(!showArchiveList)
  }

  const sortNotesByReminderDate = () => {
    notesList.sort((a, b) => a.reminderDate - b.reminderDate)
  }
  sortNotesByReminderDate()


  const alertNoteReminder = () => {
    notesList.forEach(note => {
      if ((note.reminderDate.getHours() === new Date().getHours()) && (note.reminderDate.getMinutes() === new Date().getMinutes()) && (note.reminderDate.getSeconds() === new Date().getSeconds())) {
        swal({
          title: `Reminder of task ${note.title}`,
          text: `${note.description}!`,
          icon: "info",
          button: "I will do it now!",
        });
      }
    })
  }
  setInterval(alertNoteReminder, 1000); //YS: Nice

  return (
    <div>
      <h1 className="text-center">Notes App</h1>
      <Form {...{ addNote, updateNote }} />
      <div className="text-center mb-3">
        <button onClick={changeStatusShowArchive} className={showArchiveList ? 'btn btn-danger' : 'btn btn-primary'}>{showArchiveList ? 'Hide archived notes' : 'Show archived notes'}</button>
      </div>
      <h2>Notes: </h2>
      {notesList.length ? <ListNotes notes={notesList} {...{ updateNote, restoreNote, archiveNote }} /> : (<h3 className='text-center'>There are not notes to show</h3>)}
      {showArchiveList ? <h2>Archived Notes: </h2> : null}
      {showArchiveList ? <ListNotes notes={archiveList} {...{ updateNote, restoreNote, archiveNote }} archived /> : null}
    </div>
  )
}

export default App;
