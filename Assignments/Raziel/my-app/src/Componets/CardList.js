import React from 'react'
import CardTodo from "./CardTodo"
function CardList({notes,deleteNote,editNote}) {
    return (
        <div className="task-container">
            {notes.map((note,index) => <CardTodo notes={note} key={notes.id} index={index} deleteNote={deleteNote} editNote={editNote}  />)}
        </div>
    )
}

export default CardList
