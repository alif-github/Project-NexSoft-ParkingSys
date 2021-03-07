import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type , className , id , value, placeholder, name, onChange } = this.props
        return ( 
            <input type={type} className={className} id={id} value={value} placeholder={placeholder} name={name} onChange={onChange} />
         );
    }
}
 
export default Input;