import React from "react";
import ArhNote from "./ArhNote"
function ArhList({archivedNotes}) {
  return <div className="task-container">
      {archivedNotes.map((arhItem,index) => 
<ArhNote arhItem={arhItem} index={index} key={arhItem.key}    />
      )}
  </div>;
}

export default ArhList;
