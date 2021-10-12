
function dateRemind ({setDateValue, dateValue}) {
    
    function handleDateChange(e){
        setDateValue(e.target.value)
    }
        return <div><label>Date to Remind</label>
        <input type="date" value={dateValue} onChange={handleDateChange}/>
        </div>
}
export default dateRemind