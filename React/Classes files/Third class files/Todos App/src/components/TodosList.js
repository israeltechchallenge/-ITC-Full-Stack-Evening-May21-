import React from 'react'
import Todo from './Todo'
function TodosList ({ todos, deleteTodo }) {
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