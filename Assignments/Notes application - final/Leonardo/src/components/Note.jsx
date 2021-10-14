import React, { useState } from 'react'
import Moment from 'react-moment'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader
} from 'mdb-react-ui-kit'
import Form from './Form'
import Modal from 'react-modal'

const customStyles = {
  content: {
    width: '80%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
}

Modal.setAppElement('#root')

const Note = ({ note, deleteNote, editTheNote }) => {
  const [showModal, setShowModal] = useState(false)

  function handleOpenModal () {
    setShowModal(true)
  }

  function handleCloseModal () {
    setShowModal(false)
  }

  return (
    <div>
      <MDBCard
        background='primary'
        className='text-white mb-3'
        style={{ maxWidth: '18rem' }}
      >
        <MDBCardHeader background='success'>
          <p>
            Created date: <Moment format='MMM Do h:mm:ss a'>{note.date}</Moment>
          </p>
          {note.updateDate ? (
            <p>
              Updated date:{' '}
              <Moment format='MMM Do h:mm:ss a'>{note.updateDate}</Moment>
            </p>
          ) : null}
        </MDBCardHeader>
        <MDBCardBody onClick={handleOpenModal} className='content'>
          <MDBCardTitle>{note.title}</MDBCardTitle>
          <MDBCardText>{note.description}</MDBCardText>
        </MDBCardBody>
        <MDBCardHeader>
          {/* Need to add a button with an event that contains the key of the note that Im going to delete */}
          <button
            className='btn btn-danger'
            onClick={() => deleteNote(note.key)}
          >
            Delete
          </button>
        </MDBCardHeader>
      </MDBCard>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel='Note Modal'
      >
        <button onClick={handleCloseModal} className='close'>
          ✖️
        </button>
        <Form
          noteKey={note.key}
          showModal={showModal}
          setShowModal={setShowModal}
          editTheNote={editTheNote}
          note={note}
        />
      </Modal>
    </div>
  )
}

export default Note
