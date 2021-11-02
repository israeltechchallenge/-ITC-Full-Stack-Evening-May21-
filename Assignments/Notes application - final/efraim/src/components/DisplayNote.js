function DisplayNote({ note }) {
    
    return <div>
                <h2>{note.title}</h2>
                <h3>{note.readbleDate}</h3>
                <h3>{note.updatedDate}</h3>
                <p>{note.note}</p>
</div>
    }
    export default DisplayNote