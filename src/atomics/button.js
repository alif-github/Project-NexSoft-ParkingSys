import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { type , children } = this.props 
        return ( 
            <button type={type}>{children}</button>
         );
    }
}
 
export default Button;