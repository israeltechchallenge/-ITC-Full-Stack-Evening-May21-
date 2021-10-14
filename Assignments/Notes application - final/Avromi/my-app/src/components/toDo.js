import dateFormat from "dateformat";
import ReactModal from 'react-modal';
import React, { useState } from "react"



function ToDo(props){
  const [currentState, setStateFunc] = useState(false)
  function handleOpenModal () {
    setStateFunc(!currentState)
  }
function handleCloseModal () {
    setStateFunc(!currentState)
  }

return <div onClick={handleOpenModal} style={{ 
    padding: 18,
    width:'150px',
    border: '1px solid white',
    display: 'grid',
    rowGap: 12,
    color: 'white'
    

}}>
     

  <h3> {props.title}</h3>
    {props.todo}
  <p style={{fontSize:'12px'}}>{dateFormat(props.time).toLocaleString()}</p>
  <button onClick={()=>props.deleteNote(props.index)}>Delete </button>
  <ReactModal 
           isOpen={currentState}
           contentLabel="Minimal Modal Example">
          <button onClick={handleCloseModal}>Close Modal</button>
          <h3> {props.title}</h3>
    {props.todo}
  <p style={{fontSize:'12px'}}>{dateFormat(props.time).toLocaleString()}</p>
  <button onClick={()=>props.editNote(props.index)}>Edit Note </button>
        </ReactModal>
</div>;
}


export default ToDo
