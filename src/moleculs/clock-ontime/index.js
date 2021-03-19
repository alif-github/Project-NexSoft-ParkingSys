import React, { Component } from 'react';
import { ContainerSingle, H5 } from '../../atomics';
var dateFormat = require("dateformat");

class ClockOnTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: dateFormat(new Date())
        }
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        var now = new Date();
        this.setState({
            time: dateFormat(now)
        });
    }

    render() { 
        return ( 
            <ContainerSingle>
                <H5>
                    {this.state.time.toLocaleString()}
                </H5>
            </ContainerSingle>
         );
    }
}
 
export default ClockOnTime;