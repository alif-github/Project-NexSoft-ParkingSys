import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type , className , id , placeholder } = this.props
        return ( 
            <input type={type} className={className} id={id} placeholder={placeholder} />
         );
    }
}
 
export default Input;