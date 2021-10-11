import { useEffect } from 'react'
import Todo from './Todo'
function TodosList ({ todos, deleteTodo }) {
    useEffect(() => {
        const preventLeave = (e) => {
            e.preventDefault();
            e.returnValue = '';      
        }
        console.log('trying to prevent leaving')
        window.addEventListener('beforeunload',preventLeave)
         return () => {
            window.removeEventListener('beforeunload',preventLeave)
         }
    })
        return <div style={{
            display:'grid',
            gridColumnGap: '16px',
            rowGap:16,
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginTop:10
        }}>
            
            {todos.map((todo, index) => <Todo todo={todo} key={`todo_${index}`} index={index} deleteTodo={deleteTodo} />)}
        </div>
}
export default TodosList