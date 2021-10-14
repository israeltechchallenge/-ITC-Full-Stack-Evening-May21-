import React from 'react'
import swal from 'sweetalert'
import Note from './Note'

//In this Component Im going to render all the information of the notes
const ListNotes = ({ notes, deleteTheNote, editTheNote }) => {
  //This function is called by the onClick Event and is reciving the "key" of the note that Im going to delete
  const deleteNote = key => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this note!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        //I use the function "delete" that Im sending by the props from the another Component and pass the "key" of the note that I want to delete
        deleteTheNote(key)
        swal('Poof! Your note has been deleted!', {
          icon: 'success'
        })
      } else {
        swal('Your note is safe!')
      }
    })
  }

  //Then I need to convert that array of notes into JSX/HTML elements, I do that doing a map and relying on the CreateNote function
  //The new variable listNotes will contain all the elements ready to show

  return (
    <div className='task__wrapper'>
      {notes.map(note => (
        <Note
          key={note.key}
          note={note}
          deleteNote={deleteNote}
          editTheNote={editTheNote}
        />
      ))}
    </div>
  )
}

export default ListNotes
