import React, { Component } from 'react';
import { ContainerSingle } from '../../atomics';
import moment from 'moment'

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            date: null
         }
        this.getDateWithMoment = () => {
            return moment().format('dddd, DD MMMM YYYY');
        }
    }
    componentDidUpdate() {
        let counter = setInterval(timer , 1000)
            function timer() {
                this.setState({
                    date: new Date()
                })
            }
    }
    render() {
        console.log("render") 
        return ( 
            <ContainerSingle>
                {
                    this.getDateWithMoment()
                }
                | 
                {
                    this.state.date.toLocaleTimeString()
                }
            </ContainerSingle>
         );
    }
}
 
export default Clock;