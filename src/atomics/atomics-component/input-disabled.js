import React, { Component } from 'react';

class InputDisabled extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type , className , id , value, placeholder } = this.props
        return ( 
            <input type={type} className={className} id={id} value={value} placeholder={placeholder} disabled />
         );
    }
}
 
export default InputDisabled;