import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";

function EditTask({ modal, toggle, updateTasks, item }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");

  const handelChange = (e) => {
    const { name, value } = e.target;
    if (name === "taskName") {
      setTaskName(value);
    } else {
      setDescription(value);
    }
  };

  useEffect(()=>{
      setTaskName(item.name);
      setDescription(item.description);
  },[])

  const updateTask = (e) => {
    e.preventDefault();

    let taskUpdate = {
      name: taskName,
      description: description,
     
    };

    updateTasks(taskUpdate);
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Update Task</label>
            <input
              type="text"
              className="form-control tm-2"
              name="taskName"
              value={taskName}
              onChange={handelChange}
            />
          </div>
          <label> Update Description</label>
          <div className="form-group">
            <textarea
              className="form-control"
              name="description"
              value={description}
              onChange={handelChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={updateTask}>
          Update Task
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditTask;
