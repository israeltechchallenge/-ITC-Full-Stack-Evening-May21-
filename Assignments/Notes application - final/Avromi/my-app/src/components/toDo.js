import dateFormat from "dateformat";
import ReactModal from 'react-modal';
import TextInput from './textInput';
import React, { useState } from "react"



function ToDo(props){
  const [currentState, setStateFunc] = useState(false)
  function handleOpenModal (e) {
      e.preventDefault()
    setStateFunc(!currentState)
  }
function handleCloseModal (e) {
  
    setStateFunc(!currentState)
  }

return <div style={{ 
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
  <button onClick={handleOpenModal}  >Edit Note </button> 
        <ReactModal
           isOpen={currentState}
           contentLabel="Minimal Modal Example">
               <div>
                    <button onClick={handleCloseModal}>Close Modal</button>
                    <TextInput/>
                </div>
        </ReactModal>
</div>;
}
// ()=>props.editNote(props.index)

export default ToDo
