import '../App.css';
import DateRemind from './dateRemind'
import {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';

function Form(props)  {
   
    const [noteValue, setNoteValue] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [isAddNote, setIsAddNote] = useState(false)

    useEffect(() => {
        if(props.addNote)
        setIsAddNote(true)
    }, [])
    
    
    function handleNoteChange(e){
        setNoteValue(e.target.value)
    }
    function handleTitleChange(e){
        setTitleValue(e.target.value)
    }
    
    function submitNote(e) {
        e.preventDefault();
        if(props.addNote){
        const title = titleValue
        const note = noteValue
        const dateToRemind = dateValue
        const readbleDate = new Date().toUTCString().slice(0, -7)
        const id = "id" + Math.random().toString(16).slice(2)
        let newNote = {}
        if(titleValue !== ''){
            newNote= {title: title, note: note, readbleDate: readbleDate, dateToRemind: dateToRemind, id: id}
        }else{
            newNote= {note: note, readbleDate: readbleDate, dateToRemind: dateToRemind, id: id}
        }
        props.addNote(newNote)
        setTitleValue('')
        setNoteValue('')
    }else{
        const title = titleValue
        const note = noteValue
        const noteID = props.noteID
        props.editNote(noteID, title, note)
        setTitleValue('')
        setNoteValue('')
    }
}
   

    return <div>
        <form className="form" onSubmit={submitNote}>
            <label>title</label>
            <input type="text" placeholder="title" value={titleValue} onChange={handleTitleChange}/>
            <label>Note</label>
            <TextareaAutosize  type="text" placeholder="note" required value={noteValue} onChange={handleNoteChange} />
            {isAddNote &&<DateRemind dateValue={dateValue} setDateValue={setDateValue}/>}
            <button type="submit" >Add</button>
        </form>    
             </div>
}


export default Form