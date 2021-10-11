import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function AddNewTodo (props) {

    const [text, setText] = useState('')
    
    const addTodoGo = (e) => {
        e.preventDefault()
        //Somehow add the new to too to the list
        const newTodo = {id:uuidv4(), text}
        props.addTodo(newTodo)
        setText('')
    }

    return <div style={{marginTop:10}}>
        <form onSubmit={addTodoGo}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <input type="submit" value="Add Note" />
        </form>
    </div>
}
export default AddNewTodo