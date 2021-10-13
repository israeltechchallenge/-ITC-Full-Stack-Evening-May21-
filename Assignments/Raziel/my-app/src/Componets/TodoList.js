import React, { useState, useEffect } from "react";
import CreateTask from "../Modals/CreateTask";
import localforage from "localforage";
import CardTodo from "../Componets/CardTodo";
import moment from "moment";

function TodoList() {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const[deletedNotes,setDeletedNotes] = useState([])
  const toggle=()=>{setModal(!modal)};





useEffect( () => {

 async function saveDataToStorgae() {
  const taskFromStorage = await localforage.getItem("taskList");
  if (taskFromStorage) {
    setTaskList(taskFromStorage);
  }
  taskFromStorage.map(notes => {
    if(notes.reminderDate ===new Date().toISOString().slice(0, 10) ){
        alert(`Reminder Due for ${notes.name}!! 
    `)

      }
    })

}
saveDataToStorgae();
},[])



useEffect( () => {

  async function saveArchiveToStorage() {
   const deletedNotes = await localforage.getItem("deltedNotes");
   if (deletedNotes) {
    setDeletedNotes(deletedNotes);
  }
 console.log(deletedNotes)
 }
 saveArchiveToStorage();
 },[])

  const submitTask = (task) => {
    let tempList = taskList;
    tempList.push(task);
    setTaskList(tempList);
    localforage.setItem("taskList", tempList);
    setModal(false);
    console.log(tempList)
  };

 


  
  const delteTask = (index) => {
    if (window.confirm("Do you really want to delete?")) {
      const tempList = taskList;  
      tempList.splice(index, 1);
      setTaskList(tempList);
      localforage.setItem("taskList", tempList);
      window.location.reload();
    }
  };

  const updateListArray = (item, index) => {
    let tempList = taskList;
    tempList[index] = item;
    setTaskList(tempList);
    localforage.setItem("taskList", tempList);
    window.location.reload();
  };


  return (
    <>
      <div className="header ">
        <h3>Todo List</h3>
        <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>
          Create Task
        </button>
      </div>
      <div className="task-container">
        { taskList.map((item, index) => (
          <CardTodo
            toDOItem={item}
            key={item.id}
            index={index}
            delteTask={delteTask}
            updateListArray={updateListArray}
          />
        ))}
      </div>
      <CreateTask toggle={toggle} modal={modal} subbmit={submitTask} />
    </>
  );
}

export default TodoList;
