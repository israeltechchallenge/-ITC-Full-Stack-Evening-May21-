
import React from 'react'
import Text from './text';
class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            name: '',
            email: ''
        }
    }
    updateProperty(updatedProperty) {
        this.setState((oldState => ({...oldState,...updatedProperty})))
    }
    componentDidMount() {
        console.log('component mounted')
    }
    componentDidUpdate() {
        console.log('component did update: component rendered')
    }
    render() {
        
     return <div>
        <p>
            {this.props.text} 
        </p>
        <form>
            Username: <input type="text" value={this.state.username} onChange={(e) => this.updateProperty({username:e.target.value})} /> <br />
            Name: <input type="text" value={this.state.name} onChange={(e) => this.updateProperty({name:e.target.value})} /> <br />
            <input type="submit" value="Go"/>
        </form>
        <Text text={this.state.username} />
    </div>
    }
}

export default SignUp