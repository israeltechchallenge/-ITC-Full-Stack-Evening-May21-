import { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/noteForm';
import Notes from './components/notes';

import Modal from 'react-modal';
import swal from 'sweetalert';
import localforage from 'localforage';
import sortByDate from './utilities/sortByDate';

Modal.setAppElement('#root');
const customStyles = {
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

  useEffect(() => {
    async function getLocalforageNotes() {
      const getNotes = await localforage.getItem('notes');
      setNotes((getNotes) ? getNotes : { active: [], archived: [] });
    }

    getLocalforageNotes();
  },[]);


  const handleAdd = async (newNote) => {
    const updatedNotes = { ...notes, ...{ active: [newNote, ...notes.active] } };
    setNotes(updatedNotes);
    await localforage.setItem('notes', updatedNotes);
  }

  const handleUpdate = async (updatedNote) => {
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

  const closeModal = () => {
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

  setInterval(function() { checkReminder() }, 0.5 * 60 * 1000);

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