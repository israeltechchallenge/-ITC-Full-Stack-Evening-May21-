import React from "react";
import ArhNote from "./ArhNote"
function ArhList({archivedNotes,restoreNotes}) {
  return <div className="task-container">
      {archivedNotes.map((arhItem,index) => 
<ArhNote arhItem={arhItem} index={index} key={arhItem.id} restoreNotes={restoreNotes}   />
      )}
  </div>;
}

export default ArhList;
