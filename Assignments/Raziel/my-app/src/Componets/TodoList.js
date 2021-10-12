import React,{useState,useEffect} from 'react';
import CreateTask from '../Modals/CreateTask'
import localforage from "localforage";
import CardTodo from '../Componets/CardTodo'

function TodoList() {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [taskList,setTaskList]=useState([]);
    
    const submitTask = (task) =>{
     let tempList=taskList;
     tempList.push(task);
     setTaskList(tempList);
     localforage.setItem('taskList', tempList);

     setModal(false);
    }

    useEffect(async ()=>{
      const taskFromStorage =  await localforage.getItem('taskList');
      if(taskFromStorage){
        setTaskList(taskFromStorage);
      }
    },[])



const delteTask=(index) =>{
  if (window.confirm("Do you really want to delete?")) {
const tempList=taskList;
tempList.splice(index,1)
setTaskList(tempList);
localforage.setItem('taskList', tempList);
window.location.reload();
}
}
    return (
        <>
         <div className="header " >
            <h3>Todo List</h3>
            <button className='btn btn-primary mt-2' onClick={()=> setModal(true)}>Create Task</button>
        </div>
        <div className='task-container'>
        {taskList.map((item,index)=><CardTodo toDOItem={item} key={item.id} index={index}  delteTask={delteTask}/>
        )}
        </div>

      <CreateTask    toggle={toggle} modal={modal}  subbmit={submitTask}/>
      </>
    
    )
}

export default TodoList
