import React from 'react';
import ToDo from './toDo';


export default class NotesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          }
        }
        
    
       render() {
        return (
      <div style={{
          display:'grid',
          gridColumnGap: '16px',
          rowGap: 16,
          gridTemplateColumns: 'repeat(4, 1fr)'
      }}>
          {this.props.notes.map((note) => <ToDo todo={note.text} time={note.date}  key={note.id}/>)}
      </div>
          );
         }
 }