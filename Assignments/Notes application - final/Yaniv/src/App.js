import { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/noteForm';
import Notes from './components/notes';

import Modal from 'react-modal';
import swal from 'sweetalert';
import localforage from 'localforage';
import sortByDate from './utilities/sortByDate';

Modal.setAppElement('#root');
const customStyles = { //YS: Your CSS should be in a separate file.
  content: {
    inset: 'unset',
    border: 'unset',
    background: 'unset',
    overflow: 'unset',
    borderRadius: 'unset',
    outline: 'unset',
    padding: 'unset',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

function App() {
  const [notes, setNotes] = useState({ active: [], archived: [] });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalNoteIndex, setModalNoteIndex] = useState(null);

  async function getLocalforageNotes() { //YS: It would be better if this function were declared outside your useEffect and in your useEffect you just call it. 
    const getNotes = await localforage.getItem('notes');
    setNotes((getNotes) ? getNotes : { active: [], archived: [] });
  }

  useEffect(() => {


    getLocalforageNotes();
  },[]);


  const handleAdd = async (newNote) => {
    const updatedNotes = { ...notes, ...{ active: [newNote, ...notes.active] } };
    setNotes(updatedNotes);
    await localforage.setItem('notes', updatedNotes);
  }

  const handleUpdate = async (updatedNote) => {  //YS: This is a little DRY. You can give your inputs a name in the HTML and then with object notation using brackets do something like: updatedActive[modalNoteIndex][e.target.name] and you will need only one line
    let updatedActive = [...notes.active];
    if ((updatedActive[modalNoteIndex].title !== updatedNote.title) ||
        (updatedActive[modalNoteIndex].text !== updatedNote.text) ||
        (updatedActive[modalNoteIndex].reminder !== updatedNote.reminder)) {
      updatedActive.splice(modalNoteIndex, 1, updatedNote);
      updatedActive = sortByDate(updatedActive);
      const updatedNotes = { ...notes, ...{ active: updatedActive } };
      setNotes(updatedNotes);
      await localforage.setItem('notes', updatedNotes);
    }
    closeModal();
  }

  const handleToggle = async (updatedActive, updatedArchived) => {
    const updatedNotes = { active: updatedActive, archived: updatedArchived }
    setNotes(updatedNotes);
    await localforage.setItem('notes', updatedNotes);
  }

  const confirmToggle = (toggleIndex, isArchived) => {
    swal({
      title: (isArchived) ? "Restore note?" : "Archive note?",
      icon: (isArchived) ? "info" : "warning",
      buttons: true,
      dangerMode: (isArchived) ? false : true,
    })
    .then((willToggle) => {
      if (willToggle) {
        let updatedArchived, updatedActive;
        if (isArchived) {
          updatedArchived = [...notes.archived];
          const noteToRestore = updatedArchived[toggleIndex];
          updatedActive = [...notes.active, noteToRestore];
          updatedArchived.splice(toggleIndex, 1);
        } else {
          updatedActive = [...notes.active];
          const noteToArchive = updatedActive[toggleIndex];
          updatedArchived = [...notes.archived, noteToArchive];
          updatedActive.splice(toggleIndex, 1);
        }

        updatedActive = sortByDate(updatedActive);
        updatedArchived = sortByDate(updatedArchived);
        
        handleToggle(updatedActive, updatedArchived);
      } else swal(`${(isArchived) ? `Restore` : `Archive`} cancelled`);
    });
  }

  const openModal = (targetElement, updateIndex, isArchived) => {
    if ((targetElement.classList.contains('fa-trash')) || isArchived) return;
    setModalNoteIndex(updateIndex);
    setIsOpen(true);
  }

  const closeModal = () => { //YS: Instead of having a setOpen and setClose you can have only one called toggleModal and initialize a
                            // state for example [isOpen, setIsopen] and in your function write setIsopen(!isOpen) - the opposite of what it was before
    setIsOpen(false);
  }

  const checkReminder = () => {
    let updatedActive = [...notes.active];
    if (!updatedActive.length) return;
    updatedActive.forEach((note, index) => {
      if (notes.active[index] !== note) return;
      if ((note.reminder) && (note.reminder <= (new Date()))) {
        note.reminder = null;  
        const updatedNotes = { ...notes, ...{ active: updatedActive } };
        setNotes(updatedNotes);
        swal("Note Reminder!", "", "info", { button: "Show Note" })
        .then(() => {
          openModal(document.querySelector('.notes'), index, false);
          return;
        });
      }
    });
  }

  setInterval(function() { checkReminder() }, 0.5 * 60 * 1000); //YS: Nice! 

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-h1">Notes Cork Board with React.js</h1>
        <NoteForm onAdd={handleAdd} />
      </header>
      <main className="App-main">
        <Notes notes={notes.active} {...{ confirmToggle, openModal }} />
        <Notes notes={notes.archived} {...{ confirmToggle, openModal }} isArchived />
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <span className="modal__item modal__item--close" onClick={closeModal}>✖</span>
          <NoteForm onUpdate={handleUpdate} existingNote={modalIsOpen ? notes.active[modalNoteIndex] : null} />
        </Modal>

      </main>
      <footer className="App-footer">
        <p>© all rights reserved to <a className="App-link" href="https://www.linkedin.com/in/yaniv-aflalo-8aa92386/" target="_blank" rel="noreferrer">Yaniv Aflalo</a>, full stack developer</p>
      </footer>
    </div>
  );
}

export default App;