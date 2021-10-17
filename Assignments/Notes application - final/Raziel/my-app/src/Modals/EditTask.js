import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function EditTask({ modal, toggle,notes,editNote}) {
  const [titleChange, setTitle] = useState("");
  const [descriptionChange, setDescription] = useState("");
  

  const handelTitleChange=(e)=>{
    setTitle(e.target.value)
  }

  
  const handelDescriptionChange=(e)=>{
    setDescription(e.target.value)
  }

  const submitUpdate=(e)=>{
e.preventDefault();
const title = titleChange;
const description = descriptionChange;
editNote(notes.id,title,description)

  }


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
              value={titleChange}
              onChange={handelTitleChange}
            />
          </div>
          <label> Update Description</label>
          <div className="form-group">
            <textarea
              className="form-control"
              value={descriptionChange}
              onChange={handelDescriptionChange}
            />
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitUpdate}>
          Update Task
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditTask;
