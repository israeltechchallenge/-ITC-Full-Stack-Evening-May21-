import React from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
const colors = [
    {
      primaryColor: "#5D93E1",
      secondaryColor: "#ECF3FC",
    },
    {
      primaryColor: "#F9D288",
      secondaryColor: "#FEFAF1",
    },
    {
      primaryColor: "#5DC250",
      secondaryColor: "#F2FAF1",
    },
    {
      primaryColor: "#F48687",
      secondaryColor: "#FDF1F1",
    },
    {
      primaryColor: "#B964F7",
      secondaryColor: "#F3F0FD",
    },
  ];
function CardTodo({ toDOItem, index, delteTask }) {
 
  const handelDelete = (index) => {
    delteTask(index);
  };

  return (
    <div class="card-wrapper ">
      <div
        class="card-top"
        style={{ "background-color": colors[index % 5].primaryColor }}
      ></div>
      <div class="task-holder">
        <span
          class="card-header"
          style={{
            "background-color": colors[index % 5].secondaryColor,
            "border-radius": "10px",
          }}
        >
          {toDOItem.name}
        </span>
        <p className="mt-3">{toDOItem.description}</p>
        <span className="date">{toDOItem.date}</span>
        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
          <AiFillEdit
            className="icon"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
          />
          <AiOutlineDelete
            className="icon"
            style={{ color: colors[index % 5].primaryColor, cursor: "pointer" }}
            onClick={handelDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default CardTodo;
