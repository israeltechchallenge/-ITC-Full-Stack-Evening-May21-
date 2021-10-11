import React from "react";
import Form from "./components/Form";
import Note from "./components/Note";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
    this.addNote = this.addNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote(title, note) {
    const newData = {
      title: title,
      note: note,
      date: new Date().toLocaleString("en-GB"),
      id: uuidv4(),
    };
    this.setState((oldState) => {
      const newNotes = [...oldState.notes, newData];
      return { ...oldState, notes: newNotes };
    });
  }

  deleteNote(id) {
    let r = window.confirm("You are going to delete this Note, are you sure?");
    if (r === true) {
      const newNotes = this.state.notes.filter((note) => note.id !== id);
      this.setState({ notes: newNotes });
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="App">
        <h1>Take Notes!</h1>
        <Form addNote={this.addNote} />
        <div style={{display: 'grid', gridTemplateColumns:'repeat(3, 1fr)'}}>
          {this.state.notes.length === 0
            ? null
            : this.state.notes.map((notes) => (
                <Note key={notes.id} notes={notes} deleteNote={this.deleteNote} />
            ))}
        </div>
      </div>
    );
  }
}

export default App;
