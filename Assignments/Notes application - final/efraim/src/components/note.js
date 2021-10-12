import Modal from 'react-modal';
import Form from './form'
import { useState } from 'react'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

Modal.setAppElement('#root');

function Note({ note, index, deleteNote, editNote }) {

    const [modalIsOpen, setIsOpen] = useState(false);
    // const [titleChange, setTitleChange] = useState(`${note.title}`)
    // const [noteChange, setNoteChange] = useState(`${note.note}`)
    

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation()
    setIsOpen(false);
  }
//   const EditANote = (e) => {
//     e.preventDefault()
//     const title = titleChange
//     const newNote = noteChange
//     editNote(note.id, title, newNote)
// } 



    return <div className="note" onClick={openModal}>
    <h2>{note.title}</h2>
    <h3>{note.readbleDate}</h3>
    <p>{note.note}</p>
    <button onClick={() => deleteNote(index, note.id)}>Delete</button>
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Note Modal"
      >
        <h2>{note.title}</h2>
        <h3>{note.readbleDate}</h3>
        <p>{note.note}</p>
        <label>Edit Note Below!</label>
        <Form editNote={editNote} noteID={note.id} />
        {/* <form className="form" onSubmit={EditANote}>
          <label>Edit Note Below!</label>
            <input type="text" value={titleChange} onChange={(e) => setTitleChange(e.target.value)} />
            <input type="text" value={noteChange} onChange={(e) => setNoteChange(e.target.value)} />
            <button type="submit">Edit!</button>
        </form> */}
        <button onClick={(e)=>closeModal(e)}>close</button>
      </Modal>
</div>
    }
    export default Note