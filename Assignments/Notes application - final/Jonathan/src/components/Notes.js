import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

import Form from './Form'


import Modal from 'react-modal';

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

const Notes = ({ note, handleDeleteNote, editNotes }) => {
  const { id, text, createdate, updatedate, title } = note

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);

    const formValues = {
      title: title,
      body: text
    }
    setEditFormData(formValues)
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [editFormData, setEditFormData] = useState(null);

  //edit Click
  const handleEditFormChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute('name')
    const fieldValue = e.target.value;
    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData)
  }

  function handleEdit(e) {
    e.preventDefault()
    editNotes(id, editFormData.title, editFormData.body)
    setIsOpen(false);

  }

  return (
    <>
      <div className="note" onClick={openModal}>
        <h2>{(title.length > 0) ? `Title: ${title}` : ''}</h2>
        <span className="mt-3">{text}</span>
        <div className="note-footer mt-4">
          <small>Created: {createdate}</small>
          {updatedate === null ? null : <small>Updated: {updatedate}</small>}        
          <MdDeleteForever className="delete-icon" size='1.3em' onClick={() => {
            (window.confirm('Are you sure you want to delete this note')) ?
              handleDeleteNote(id) : alert('Deleted Cancelled')
          }} />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Form
          handleSumbit={handleEdit}
          handleData={editFormData}
          handleChangeTitle={handleEditFormChange}
          handleChangeBody={handleEditFormChange}
          buttonLabel="Update" />
        <button onClick={closeModal}>close</button>
      </Modal>
    </>
  )
}

export default Notes
