import dateFormat from "dateformat";
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
  <p style={{fontSize:'12px'}}>{dateFormat(props.time).toLocaleString()}</p>


</div>;
}
export default ToDo
