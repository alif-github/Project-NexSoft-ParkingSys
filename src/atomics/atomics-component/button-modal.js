import React, { Component } from 'react';

class ButtonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type , className , children } = this.props
        return ( 
            <button type={type} className={className} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="modal" aria-label="Close">
                {children}
            </button>
         );
    }
}
 
export default ButtonModal;