import './App.css';
import TodosList from './Componets/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() { //YS: This is usually the main component (App)
  return (
    <div className="App">
   <TodosList/>
    </div>
  );
}

export default App;
