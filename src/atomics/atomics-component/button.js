import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const { className , children , onClick } = this.props 
        return ( 
            <button type="button" className={className} onClick={onClick}>{children}</button>
         );
    }
}
 
export default Button;