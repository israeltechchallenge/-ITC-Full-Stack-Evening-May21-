import React from 'react'
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
function ArhNote({index,arhItem}) {
    return (
        <div className="card-wrapper ">
        <div
          className="card-top"
          style={{ "background-color": colors[index % 5].primaryColor }}
        ></div>
        <div className="task-holder">
          {arhItem.title.length !== 0 ? (
            <span
              className="card-header"
              style={{
                "background-color": colors[index % 5].secondaryColor,
                "border-radius": "10px",
              }}
            >
              {arhItem.title}
            </span>
          ) : (
            <div className="empty"></div>
          )}
  
          <p className="mt-3">{arhItem.description}</p>
          <span className="date">{arhItem.date}</span>
      
          <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
           Restore
          </div>
        </div>
 
      </div>
    )
}

export default ArhNote
