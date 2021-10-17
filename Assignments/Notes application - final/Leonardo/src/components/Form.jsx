import { useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import Error from './Error'
import DateTimePicker from 'react-datetime-picker'

const Form = ({
  addNote,
  updateNote,
  index,
  showModal,
  handleCloseModal,
  note
}) => {
  const editMode = note && Object.keys(note).length > 0 ? true : false
  const emptyNote = { title: '', description: '', reminderDate: '' }
  const [noteValue, setNoteValue] = useState(editMode ? note : emptyNote)
  const [error, setError] = useState(false)
  
  const handleTitleChange = e =>
    setNoteValue({ ...noteValue, title: e.target.value })
  const handledDescriptionChange = e =>
    setNoteValue({ ...noteValue, description: e.target.value })
  const handledReminderDateChange = e => {
    setNoteValue({ ...noteValue, reminderDate: e })
  }

  const submitNote = event => {
    //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
    event.preventDefault()

    if (noteValue.description === '') {
      setError(true)
      return
    }
    //If I dont have error, I set the state of the error to False
    setError(false)

    if (!showModal) {
      addNote(noteValue)
      setNoteValue(emptyNote)
    } else {
      //Save the information of the new note to send to the principal component (App.js)
      updateNote(noteValue, index)
      //Close the Modal
      handleCloseModal()
    }
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
          value={noteValue.title}
          onChange={handleTitleChange}
        />
        <TextareaAutosize
          className='form-control w-50 p-5'
          placeholder='Please enter description for the note'
          value={noteValue.description}
          onChange={handledDescriptionChange}
        />
        <DateTimePicker
          className='form-control w-50 p-1 form__date'
          id='datetime'
          name='datetime'
          value={noteValue.reminderDate}
          onChange={handledReminderDateChange}
          required
        />
        <button
          className='btn btn-success submit__button'
          type='submit'
          value='Add'
        >
          {showModal ? <p>Edit</p> : <p>Add</p>}
        </button>
      </form>
    </div>
  )
}

export default Form
