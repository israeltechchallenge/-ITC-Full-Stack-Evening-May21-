import '../App.css';
import { render } from '@testing-library/react'
import React from 'react'


import TextareaAutosize from 'react-textarea-autosize';

class Form extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            noteValue: '',
            titleValue:''
        }
        this.submitNote = this.submitNote.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }
    handleNoteChange(e){
        this.setState({noteValue: e.target.value})
    }
    handleTitleChange(e){
        this.setState({titleValue: e.target.value})
    }
    handleDateChange(e){
        this.setState({date: e.target.value})
       
    }
    submitNote(e) {
        e.preventDefault();
        const title = this.state.titleValue
        const note = this.state.noteValue
        const dateToRemind = this.state.date
        const readbleDate = new Date().toUTCString().slice(0, -7)
        const id = "id" + Math.random().toString(16).slice(2)
        let newNote = {}
        if(this.state.titleValue !== ''){
            newNote= {title: title, note: note, readbleDate: readbleDate, dateToRemind: dateToRemind, id: id}
        }else{
            newNote= {note: note, readbleDate: readbleDate, dateToRemind: dateToRemind, id: id}
        }
        this.props.addNote(newNote)
        this.setState({noteValue: '', titleValue: ''})
    }
   
render() {

  
    return <div>
        <form className="form" onSubmit={this.submitNote}>
            <label>title</label>
            <input type="text" placeholder="title" value={this.state.titleValue} onChange={this.handleTitleChange}/>
            <label>Note</label>
            <TextareaAutosize  type="text" placeholder="note" required value={this.state.noteValue} onChange={this.handleNoteChange} />
            <label>Date to Remind</label>
            <input type="date"  onChange={this.handleDateChange}/>
            <button type="submit" >Add</button>
        </form>    
             </div>
}
}

export default Form