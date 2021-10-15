import React from 'react';
import Moment from 'react-moment'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader
} from 'mdb-react-ui-kit'

const NoteArchive = ({note, restoreNote}) => {
    return (
        <div>
          <MDBCard
            background='primary'
            className='text-white mb-3'
            style={{ maxWidth: '18rem' }}
          >
            <MDBCardHeader background='danger'>
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
            <MDBCardBody>
              <MDBCardTitle>{note.title}</MDBCardTitle>
              <MDBCardText>{note.description}</MDBCardText>
            </MDBCardBody>
            <MDBCardHeader>
              {/* Need to add a button with an event that contains the key of the note that Im going to delete */}
              <button
                className='btn btn-success'
                onClick={() => restoreNote(note.key)}
              >
                Restore
              </button>
            </MDBCardHeader>
          </MDBCard>
        </div>
      )
}
 
export default NoteArchive;