import React, { useState } from "react";
import autoLineBreaks from "auto-line-breaks"
import Modal from 'react-modal';
import Form from "./Form"
Modal.setAppElement('#root')

const Note = (props) => {
  const { title, notes, date, id, update } = props;
  const [modal, setModal] = useState(false)

  const [modalIsOpen, setIsOpen] = React.useState(false);
  let subtitle;
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '350px'
    },
  };
  
  function openModal() {
    setIsOpen(true);
    setModal(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.-
    subtitle.style.color = '#f00';
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div style={{ border: "1px solid black", margin: "10px", padding: "10px", alignItems: "center", backgroundColor: '#c9eb9d'}}>
        <h4>Title: {title}</h4>
        <h5>Note: {autoLineBreaks(`${notes}`, 30)}</h5>
        <p>Created: {date}</p>
        {update !== null ? <p>Updated: {update}</p> : null}
        <button className="btn btn-danger" onClick={() => props.deleteNote(id)} style={{ margin: "10px", padding: "10"}}>
          Delete
        </button>
        <button className="btn btn-warning" style={{color: "white"}} onClick={openModal}>
          Edit Note
        </button>
      </div>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3 ref={(_subtitle) => (subtitle = _subtitle)}>Edit this Note:</h3>
        <div>
        <h5>Title: {title}</h5>
        <h5>Note: {autoLineBreaks(`${notes}`, 30)}</h5>
        <p>Created: {date}</p>
        </div>
        <Form id={id} modal={modal} editNote={props.editNote} closeModal={closeModal} notaActual={props.notes}/>
      </Modal>
    </div>
  );
};

export default Note;

