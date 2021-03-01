import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type , className , id , value, placeholder } = this.props
        return ( 
            <input type={type} className={className} id={id} value={value} placeholder={placeholder} />
         );
    }
}
 
export default Input;