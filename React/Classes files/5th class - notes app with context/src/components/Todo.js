

function Todo({ todo, index, deleteTodo }) {
    console.log(` todo ${index} rendered`)
return <div style={{
    padding:18,
    width:'150px',
    border:"1px solid black",
    display: 'grid',
    rowGap: 12
}}>
    {todo.text} <br />
    <button onClick={() => deleteTodo(index)}>Delete</button>
</div>
}
export default Todo