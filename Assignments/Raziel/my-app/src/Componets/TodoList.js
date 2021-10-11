import React,{useState} from 'react';
import CreateTask from '../Modals/CreateTask'


function TodoList() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [taskList,setTaskList]=useState([]);
    
    const submitTask = (task) =>{
     let tempList=taskList;
     tempList.push(task);
     setTaskList(tempList);
     setModal(false);
    }

    return (
        <>
         <div className="header ">
            <h3>Todo List</h3>
            <button className='btn btn-primary mt-2' onClick={()=> setModal(true)}>Create Task</button>
        </div>
        <div className='task-container'>
        {taskList.map((item)=><li>{item.name} {item.description} {item.date}</li>
        )}
        </div>

      <CreateTask    toggle={toggle} modal={modal}  subbmit={submitTask}/>
      </>
    
    )
}

export default TodoList
