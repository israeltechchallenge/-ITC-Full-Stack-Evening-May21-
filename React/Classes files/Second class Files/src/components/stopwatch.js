import React from 'react'
class StopWatch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0
        }

    }
    componentDidMount() {
        this.intervalACtion = setInterval(() => {
            this.setState((oldState => ({time:oldState.time+1})))
        },1000)
    }
    componentWillUnmount() {
        clearInterval(this.intervalACtion)
    }
    render() {
        return( 
            <h1> {this.props.id} <br />
                Time : {this.state.time}
            </h1>
        )
    }
}
export default StopWatch