import { useState, useEffect } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import Note from './components/note';

import Modal from 'react-modal';
import swal from 'sweetalert';
import localforage from 'localforage';

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

function App(props) {
  // localforage.clear()
  let localforageNotes = { active: [], archived: [] };

  const [notes, setNotes] = useState(localforageNotes);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalNoteIndex, setModalNoteIndex] = useState(null);

  useEffect(() => {
    async function getLocalforageNotes() {
      const getNotes = await localforage.getItem('notes');
      localforageNotes = (getNotes) ? getNotes : { active: [], archived: [] };
      setNotes(localforageNotes);
    }

    getLocalforageNotes();
  },[]);


  const handleAdd = async (newNote) => {
    const updatedNotes = { ...notes, ...{ active: [...notes.active, newNote] } };
    setNotes(updatedNotes);
    await localforage.setItem('notes', updatedNotes);
  }

  const handleUpdate = async (updatedNote) => {
    const updatedActive = [...notes.active];
    updatedActive.splice(modalNoteIndex, 1, updatedNote);
    const updatedNotes = { ...notes, ...{ active: updatedActive } };
    setNotes(updatedNotes);
    await localforage.setItem('notes', updatedNotes);
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
        handleToggle(updatedActive, updatedArchived);
      } else {
        swal(`${(isArchived) ? `Restore` : `Archive`} cancelled`);
        return;
      }
    });
  }

  const openModal = (e, updateIndex, isArchived) => {
    if ((e.target.classList.contains('note__item--close')) || isArchived) return;
    setModalNoteIndex(updateIndex);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-h1">Notes Cork Board with React.js</h1>
        <NoteForm
          onAdd={handleAdd}
          title={''}
          text={''} />
      </header>
      <main className="App-main">
        <h2 className="text-bg">Active Notes</h2>
        <section className="active">
          {notes.active.length ?
          notes.active.map((note, index) =>
            <Note
              key={note.id}
              index={index}
              onToggleArchive={confirmToggle}
              isArchived={false}
              onOpenModal={openModal}
              title={note.title}
              createdAt={note.createdAt}
              updatedAt={note.updatedAt}
              text={note.text}
              id={note.id} />) :
          <p className="text-bg">No active notes</p>}
        </section>
        <h2 className="text-bg">Archived Notes</h2>
        <section className="archived">
          {notes.archived.length ?
            notes.archived.map((note, index) =>
              <Note
                key={note.id}
                index={index}
                onToggleArchive={confirmToggle}
                isArchived={true}
                onOpenModal={openModal}
                title={note.title}
                createdAt={note.createdAt}
                updatedAt={note.updatedAt}
                text={note.text}
                id={note.id} />) :
            <p className="text-bg">No archived notes</p>}
        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Note Modal"
        >
          <span className="modal__item modal__item--close" onClick={closeModal}>✖</span>
          <NoteForm
            onUpdate={handleUpdate}
            id={modalIsOpen ? notes.active[modalNoteIndex].id : null}
            title={modalIsOpen ? notes.active[modalNoteIndex].title : null}
            text={modalIsOpen ? notes.active[modalNoteIndex].text : null}
            createdAt={modalIsOpen ? notes.active[modalNoteIndex].createdAt : null}
            updatedAt={modalIsOpen ? notes.active[modalNoteIndex].updatedAt : null} />
        </Modal>

      </main>
      <footer className="App-footer">
        <p>© all rights reserved to <a className="App-link" href="https://www.linkedin.com/in/yaniv-aflalo-8aa92386/" target="_blank" rel="noreferrer">Yaniv Aflalo</a>, full stack developer</p>
      </footer>
    </div>
  );
}

export default App;