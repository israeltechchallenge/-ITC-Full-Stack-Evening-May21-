import React, { Component } from 'react'
import Moment from 'react-moment'
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader
} from 'mdb-react-ui-kit'
import swal from 'sweetalert'

//In this Component Im going to render all the information of the notes

export default class ListTasks extends Component {
  constructor (props) {
    super(props)

    this.createNotes = this.createNotes.bind(this)
  }

  createNotes (note) {
    return (
      <div key={note.key}>
        <MDBCard
          background='primary'
          className='text-white mb-3'
          style={{ maxWidth: '18rem' }}
        >
          <MDBCardHeader background='success'>
            <Moment format='MMM Do h:mm:ss a'>{note.date}</Moment>
          </MDBCardHeader>
          <MDBCardBody>
            <MDBCardTitle>{note.title}</MDBCardTitle>
            <MDBCardText>{note.text}</MDBCardText>
          </MDBCardBody>
          <MDBCardHeader>
            {/* Need to add a button with an event that contains the key of the note that Im going to delete */}
            <button
              className='btn btn-danger'
              onClick={() => this.deleteNote(note.key)}
            >
              Delete
            </button>
          </MDBCardHeader>
        </MDBCard>
      </div>
    )
  }

  //This function is called by the onClick Event and is reciving the "key" of the note that Im going to delete
  deleteNote (key) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this note!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        //I use the function "delete" that Im sending by the props from the another Component and pass the "key" of the note that I want to delete
        this.props.delete(key)
        swal('Poof! Your note has been deleted!', {
          icon: 'success'
        })
      } else {
        swal('Your note is safe!')
      }
    })
  }

  render () {
    //Get the "prop (array of notes)" that Im passing from the other Component
    const todoNotes = this.props.arrayNotes

    //Then I need to convert that array of notes into JSX/HTML elements, I do that doing a map and relying on the CreateNote function
    //The new variable listNotes will contain all the elements ready to show
    const listNotes = todoNotes.map(this.createNotes)

    return <div className='task__wrapper'>{listNotes}</div>
  }
}
