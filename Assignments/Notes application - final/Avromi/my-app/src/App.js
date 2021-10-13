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
    }
  
    addNote(note){
      this.setState((oldState)=>{
        const newNotes = [...oldState.notes, note]
        
        return {...oldState, notes: newNotes}
        
      })
    }
    render(){
      console.log(this.state.notes);
  return (
    <div className="App">
      <header className="App-header">
 <TextInput addNote={this.addNote}/>
 <NotesList notes = {this.state.notes}/>
 </header>
 </div>
  );}
}

export default App;
