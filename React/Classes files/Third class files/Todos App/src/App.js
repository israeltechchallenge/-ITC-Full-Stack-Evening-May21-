import React from 'react'
import axios from 'axios'
import AddNewTodo from './components/AddNewTodo'
import './App.css';
import TodosList from './components/TodosList';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {id:1, text:'hello'},
        {id:2, text:'hello'},
        {id:3, text:'hello'}
        ],
        todosLoaded : false
    }

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  addTodo (newTodo) {
    axios.post('http://localhost:5500/todos',newTodo)
    this.setState((oldState) => {
      const newTodos = [...oldState.todos, newTodo]
      return {...oldState, todos:newTodos}
    }) 
  }
  deleteTodo (index) {
    const newTodosList = this.state.todos
    newTodosList.splice(index, 1)
    this.setState({todo:newTodosList})
  }
  componentDidMount() {
    this.getTodosFromServer()
  }
  async getTodosFromServer() {
    const todos = await axios.get('http://localhost:5500/todos')
    this.setState({todos:todos.data, todosLoaded:true})
  }
render () {
  return (
    <div className="App">
      {this.state.todosLoaded ? 
        <div>
          <AddNewTodo addTodo={this.addTodo} />
          <TodosList todos={this.state.todos} deleteTodo={this.deleteTodo}/>
        </div> : 'Loading...' 
      }
    </div>
  );
}
}
export default App;
