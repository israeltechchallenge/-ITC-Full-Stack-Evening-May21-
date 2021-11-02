import { useState } from 'react'
interface TodoFormProps {
    id: number,
}
function Todo (props: TodoFormProps) {
    const [value, setValue] = useState('')
    return (
        <div>
            {props.id}
            <form>
                <textarea value={value} onChange={(e) => setValue(e.target.value)}></textarea>
            </form>
        </div>
    )
}
export default Todo