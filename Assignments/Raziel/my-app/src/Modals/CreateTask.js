import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import TextareaAutosize from 'react-textarea-autosize';

function CreateTask({ modal, toggle, subbmit }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date,setDate] = useState("");

  const handelChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName" ) {
      setTaskName(value);
     
    } else if(name==="date"){
      setDate(value);
    }
     else {
      setDescription(value);
    }
   
  };

  const createTask = (e) => {
    e.preventDefault();

    if (taskName === "" && description === "" ) {
      alert("Cannot creat an empty task");
      return;
    }

    let task = {
      name: taskName,
      description: description,
      id: uuidv4(),
      date: moment().format("MMM Do  h:mm A"),
      reminderDate:date,
      updateDate:""
     
    };
    
    subbmit(task);
     
    setDescription('');
    setTaskName('');
    setDate('');

  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create your task</ModalHeader>
      <ModalBody>
        <form >
          <div className="form-group">
            <label>Task name</label>
            <input
              type="text"
              className="form-control tm-2"
              name="taskName"
              value={taskName}
              onChange={handelChange}
            />
          </div>
          <label>Description</label>
          <div className="form-group">
            <TextareaAutosize
              className="form-control"
              name="description"
              value={description}
              onChange={handelChange}
            />
          </div>
          <label>Date to remind</label>
          <div className="form-group">
            <input type="date"
              className="form-control"
              name="date"
              value={date}
              onChange={handelChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={createTask}>
          Add task
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CreateTask;
