import React from 'react';
import './App.css';
import TextInput from './components/textInput'
import NotesList from './components/notesList'

class App extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      notes:[],
      }  
      this.addNote = this.addNote.bind(this);
      this.deleteNote = this.deleteNote.bind(this);
      this.editNote = this.editNote.bind(this);
    }
  
    addNote(note){
      this.setState((oldState)=>{
        const newNotes = [...oldState.notes, note]
        
        return {...oldState, notes: newNotes}
        
      })
    }

    deleteNote(index){
      const deleteIsTrue = window.confirm("Are you sure you want to delete this note?")
      if (deleteIsTrue === true) {
        const newNotes = this.state.notes
        newNotes.splice(index,1)
        this.setState({notes:newNotes})
      }
    }
    editNote(index){
      console.log("editing");
    }
    render(){
      console.log(this.state.notes);
  return (
    <div className="App">
      <header className="App-header">
 <TextInput addNote={this.addNote}/>
 <br/>
 <NotesList notes = {this.state.notes} editNote={this.editNote} deleteNote={this.deleteNote}/>
 </header>
 </div>
  );}
}

export default App;
