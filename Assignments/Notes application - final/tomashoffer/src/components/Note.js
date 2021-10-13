import React, { useState } from "react";
import autoLineBreaks from "auto-line-breaks"
import Modal from 'react-modal';
import Form from "./Form"
Modal.setAppElement('#root')

const Note = (props) => {
  const { title, note, date, id } = props.notes;
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
      <div style={{ border: "1px solid black", margin: "10px", padding: "10px", alignItems: "center"}}>
        <h4>Title: {title}</h4>
        <h5>Note: {autoLineBreaks(`${note}`, 30)}</h5>
        <p>Created: {date}</p>
        <button className="btn btn-danger" onClick={() => props.deleteNote(id)} style={{ margin: "10px", padding: "10"}}>
          Delete
        </button>
        <button className="btn btn-danger" onClick={openModal}>
          Edit
        </button>
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <Form id={id} modal={modal} editNote={props.editNote} />
      </Modal>
      </div>
    </div>
  );
};

export default Note;

