function ToDo(props){
return <div style={{ 
    padding: 18,
    width:'150px',
    border: '1px solid white',
    display: 'grid',
    rowGap: 12,
    color: 'white'
    

}}>
    {props.todo}


</div>;
}
export default ToDo