import '../App.css';
import DateRemind from './DateRemind'
import {useState, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';

function Form({addNote, editNote, closeModal, note})  {
   
    const [noteValue, setNoteValue] = useState('')
    const [titleValue, setTitleValue] = useState('')
    const [dateValue, setDateValue] = useState('')
    const [isAddNote, setIsAddNote] = useState(false)

    useEffect(() => {
        if(addNote)
        setIsAddNote(true)
    }, [addNote]) 
 
    
    function handleNoteChange(e){
        setNoteValue(e.target.value)
    }
    function handleTitleChange(e){
        setTitleValue(e.target.value)
    }
    
    function submitNote(e) {
        e.preventDefault();
        let title = titleValue
        let noteText = noteValue
            if(isAddNote === true){
                if(noteValue === '') return
                const dateToRemind = dateValue
                const readbleDate = new Date().toUTCString().slice(0, -7)
                const id = "id" + Math.random().toString(16).slice(2)
                let newNote = {}
                if(titleValue !== ''){
                    newNote= {title: title, note: noteText, readbleDate: readbleDate, dateToRemind: dateToRemind, id: id}
                }else{
                    newNote= {note: noteText, readbleDate: readbleDate, dateToRemind: dateToRemind, id: id}
                }
                addNote(newNote)
            }else{
                if(titleValue === ''){
                    title = note.title
                }
                if(noteValue === ''){
                    noteText = note.note
                }
                const noteID = note.id
                editNote(noteID, title, noteText)
                closeModal(e)
            }
        setTitleValue('')
        setNoteValue('')
}
   
    return <div>
        <form className="form" onSubmit={submitNote}>

            <label>Title</label>
            <input type="text" placeholder="title" value={titleValue} onChange={handleTitleChange}/>
            
            <label>Note</label>
            <TextareaAutosize  type="text" placeholder="note" value={noteValue} onChange={handleNoteChange} />

            {isAddNote && <DateRemind dateValue={dateValue} setDateValue={setDateValue}/>}

            <button type="submit" >{isAddNote ? 'Add' : 'Edit'}</button>
        </form>    
             </div>
}


export default Form