import Modal from 'react-modal';
import Form from './form'
import { useState } from 'react'
import DisplayNote from './DisplayNote'

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

function Note({ note, index, deleteNote, editNote, restoreNote  }) {

    const [modalIsOpen, setIsOpen] = useState(false);

    
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(e) {
    e.stopPropagation()
    setIsOpen(false);
  }

    return <div className="note" onClick={openModal}>
    <DisplayNote note={note} />

    {deleteNote && <button onClick={() => deleteNote(index, note.id)}>Delete</button>}
    {restoreNote && <button onClick={() => restoreNote(note, index)}>Restore</button>}

    {deleteNote && <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Note Modal"
      >
       <DisplayNote note={note} />
        <label>Edit Note Below!</label>
        <Form editNote={editNote} closeModal={closeModal} note={note} />
        <button onClick={(e)=>closeModal(e)}>close</button>
      </Modal>}
      
</div>
    }
    export default Note