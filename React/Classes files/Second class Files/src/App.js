import React from 'react'
import './App.css';
import SignUp from './components/signup';
import StopWatch from './components/stopwatch';
import { v4 as uuidv4 } from 'uuid';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clocks: [],
      inputValue: ''
    }
  }
  addClock() {
    this.setState((oldState) => { 
      const c = oldState.clocks
      c.push(uuidv4())
      return c
    })
  }
  
  render() {
  return (
    <div className="App">
      <p>
        <button onClick={() => this.addClock()}>Click me!</button>
      </p>
     {/*this.state.clocks.map(id => <StopWatch key={id} />)*/}
      <input type="text" value={this.state.inputValue} onChange={(e) => this.setState({inputValue:e.target.value})} />
    </div>
  )
  }
}

export default App;
