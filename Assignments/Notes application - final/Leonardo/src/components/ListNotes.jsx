import React from 'react'
import swal from 'sweetalert'
import Note from './Note'

const ListNotes = ({ notes, updateNote, archiveNote, archived, restoreNote }) => {
  const deleteNote = key => {
    swal({
      title: 'Are you sure?',
      text:
        'Once archived, you will be able to recover this note from archived section!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        archiveNote(key)
        swal('Poof! Your note has been archived!', {
          icon: 'success'
        })
      } else {
        swal('Your note is safe!')
      }
    })
  }

  return (
    <div className='task__wrapper'>
      {notes && notes.map((note,index) => <Note key={note.key} {...{note, index ,deleteNote, updateNote, archived, restoreNote}} /> )}
    </div>
  )
}

export default ListNotes
