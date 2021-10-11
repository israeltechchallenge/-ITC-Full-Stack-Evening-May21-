import React, { Component } from 'react'
import shortid from 'shortid'
import ListTasks from './ListTasks'
import TextareaAutosize from 'react-textarea-autosize'
import swal from 'sweetalert'

//In this Component Im going to have the form and save that information in an array
//First of all I create the Form in the "return" and add the event that I gonna use ("onSubmit")

export default class Nota extends Component {
  //As it is a class I add the props and the state, that is going to be initialize as an empty array (notes: []):
  constructor (props) {
    super(props)
    this.state = { notes: [] }

    this.addNote = this.addNote.bind(this)
    this.delete = this.delete.bind(this)
  }

  //This function is to add a new note into the array
  addNote (event) {
    //Because the description of the note is required I make a condition:
    if (this._inputElementText.value !== '') {
      //First I create a variable that is going to store a new object note:
      const newNote = {
        title: this._inputElementTitle.value,
        text: this._inputElementText.value,
        key: shortid.generate(),
        date: new Date()
      }

      //I modify the oldState (old array) to a new one that contains the new Note
      this.setState(oldState => {
        return {
          notes: [...oldState.notes, newNote]
        }
      })
      //I reset the form
      this._inputElementText.value = ''
      this._inputElementTitle.value = ''

      //And is going to be focus on the Title to create another Note faster
      this._inputElementTitle.focus()
    } else {
      swal('So sorry!', 'The note should have a description!', 'warning')
      //Is going to be focus on the Description to add a description faster
      this._inputElementText.focus()
    }
    //By default when you submit a form the page reload and clear everything out, so we call preventDefault()
    event.preventDefault()
  }

  //I pass this function by prop and call from the other Component with the "key" of the note I want to delete
  delete (key) {
    const filteredNotes = this.state.notes.filter(note => {
      return note.key !== key
    })

    //The new state (new array of note) is going to be all the array as before but without the note that I deleted
    this.setState({
      notes: filteredNotes
    })
  }

  render () {
    return (
      <div>
        <form className='form-group' onSubmit={this.addNote}>
          <input
            type='text'
            //ref is something that React provide me, so I set the "ref" attribute on the element I like to reference the HTML
            //Typically I set as "ref" a callback function in JavaScript, that function is call automatically when the component housing this "render" method gets mounted
            //Im storing a reference to the input an called as the name "_inputElementTitle"
            ref={a => (this._inputElementTitle = a)}
            className='form-control w-50 p-1 form__title'
            value={this.state.value}
            placeholder='Please enter a title for the note (optional)'
          />
          <TextareaAutosize
            ref={a => (this._inputElementText = a)}
            className='form-control w-50 p-5'
            value={this.state.value}
            placeholder='Please enter description for the note'
          />
          <input
            className='btn btn-success submit__button'
            type='submit'
            value='Add'
          />
        </form>
        <div>
          {/* I need to pass the information to the other component to render it, so I pass all the state of the array Notes and the function to delete a note */}
          {/* As well I do a ternary operator to show a message if the array is empty, that means that I dont have any note to show */}
          {this.state.notes.length ? (
            <ListTasks arrayNotes={this.state.notes} delete={this.delete} />
          ) : (
            <h3 className='text-center'>There are not notes to show</h3>
          )}
        </div>
      </div>
    )
  }
}
