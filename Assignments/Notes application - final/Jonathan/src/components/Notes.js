import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { BiArchiveIn } from 'react-icons/bi'
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

const Notes = ({ note, handleDeleteNote, editNotes, handleArchiveNote }) => {
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
      <div className="note" onDoubleClick={openModal}>
        <h2>{(title.length > 0) ? `Title: ${title}` : ''}</h2>
        <span className="mt-3">{text}</span>
        <div className="note-footer mt-4">
        <div className="d-flex flex-column">
          <small>Created: {createdate}</small>
          {updatedate === null ? null : <small>Updated: {updatedate}</small>}
          </div>
          <MdDeleteForever color="#e65175" className="icon" size='1.3em' onClick={() => {
            (window.confirm('Are you sure you want to delete this note')) ?
              handleDeleteNote(id) : alert('Deleted Cancelled')
          }} />
          <BiArchiveIn  color = "#3B5998" className="icon" size='1.3em' onClick={() => {
            (window.confirm('Are you sure you want to archive this note')) ?
              handleArchiveNote(id) : alert('Archive Cancelled')
          }} />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="close">✖️</button>
        <Form
          handleSumbit={handleEdit}
          handleData={editFormData}
          handleChangeTitle={handleEditFormChange}
          handleChangeBody={handleEditFormChange}
          buttonLabel="Update" />

      </Modal>

    </>
  )
}

export default Notes
