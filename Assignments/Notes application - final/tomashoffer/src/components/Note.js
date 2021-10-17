import React, { useState } from "react";
import autoLineBreaks from "auto-line-breaks"
import Modal from 'react-modal';
import Form from "./Form"
import moment from 'moment'
import swal from 'sweetalert'

Modal.setAppElement('#root')

const Note = (props) => {
  const { title, note, date, id, update, reminder } = props.notes;
  const [modal, setModal] = useState(false)
  const [reminderAlert, setReminderAlert] = useState(true)
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = { //YS: You should add your styles in a separate css file. 
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
  
  function openModal() {  //YS: You can also have one function that toggles the modal by setting the state to the opposite of what it was: setModal(!isOpen)  - you initialize isOpen as false 
    setIsOpen(true);
    setModal(true)
  }

  function closeModal() {
    setIsOpen(false);
  }

  function archiveActualNote(note){
    const {archivedNote} = props;
    archivedNote(note)
  }
  

  if(moment().format("MMM Do YY") === moment(reminder).format("MMM Do YY") && reminderAlert === true){
      swal("Reminder for Today!", `Title: ${title} Note: ${note}`);
      setReminderAlert(false)
  }

  return (
    <div>
      <div style={{ border: "1px solid black", margin: "10px", padding: "10px", alignItems: "center", backgroundColor: '#c9eb9d'}}>
        <h4>Title: {title}</h4>
        <h5>Note: {autoLineBreaks(`${note}`, 30)}</h5>
        <p>Reminder: {moment(reminder).format("MMM Do YY")}</p>
        <p>Created: {moment(date).fromNow()}</p>
        {update !== null ? <p>Updated: {moment(update).fromNow()}</p> : null}
        <button className="btn btn-danger" onClick={() => props.deleteNote(id)} style={{ marginRight: "10px", padding: "10"}}>
          Delete
        </button>
        <button className="btn btn-success" style={{color: "white", marginRight: "10px", padding: "10"}} onClick={openModal}>
          Edit Note
        </button>
        <button className="btn btn-warning" style={{color: "white"}} onClick={() => archiveActualNote(props.notes)}>
          Archive
        </button>
      </div>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h3>Edit this Note:</h3>
        <div>
        <h5>Title: {title}</h5>
        <h5>Note: {autoLineBreaks(`${note}`, 30)}</h5>
        <p>Created: {date}</p>
        </div>
        <Form id={id} modal={modal} editNote={props.editNote} closeModal={closeModal} notaActual={props.notes}/>     
        {/* YS: write everyting in english! (notaActual)    */}
      </Modal>
    </div>
  );
};

export default Note;

