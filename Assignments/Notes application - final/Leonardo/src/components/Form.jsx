import React, { useState } from 'react'
import shortid from 'shortid'
import TextareaAutosize from 'react-textarea-autosize'
import Error from './Error'

//In this Component Im going to have the form and save that information in an array
//First of all I create the Form in the "return" and add the event that I gonna use ("onSubmit")

const Form = ({
  createTheNote,
  editTheNote,
  noteKey,
  showModal,
  setShowModal,
  note
}) => {
  //Set the states to save the form information
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)

  //This function is to add a new note
  const submitNote = event => {
    //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
    event.preventDefault()

    //Because the description of the note is required I make a condition:
    if (description.trim() === '') {
      setError(true)
      return
    }

    //If I dont have error, I set the state of the error to False
    setError(false)

    //First I create a variable that is going to store a new object note:
    let newNote = {}
    if (showModal) {
      //When Im editing 
      newNote = {
        title,
        description,
        key: noteKey,
        updateDate: new Date()
      }
      //Save the information of the new note to send to the principal component (App.js)
      editTheNote(newNote, noteKey)

      //Close the Modal
      setShowModal(false)
    } else {
      //When Im creating
      newNote = {
        title,
        description,
        key: shortid.generate(),
        date: new Date()
      }
      //Save the information of the new note to send to the principal component (App.js)
      createTheNote(newNote)
    }

    //I reset the form
    setTitle('')
    setDescription('')
  }

  return (
    <div>
      <form className='form-group' onSubmit={submitNote}>
        {error === true ? (
          <Error message='The description is requiered' />
        ) : null}

        <input
          type='text'
          className='form-control w-50 p-1 form__title'
          placeholder='Please enter a title for the note (optional)'
          value= {title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextareaAutosize
          className='form-control w-50 p-5'
          placeholder='Please enter description for the note'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button
          className='btn btn-success submit__button'
          type='submit'
          value='Add'
        >
          {' '}
          {showModal ? <p>Edit</p> : <p>Add</p>}
        </button>
      </form>
    </div>
  )
}

export default Form
