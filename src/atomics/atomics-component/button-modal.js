import React, { Component } from 'react';

class ButtonModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { type , className , onClick , children } = this.props
        return ( 
            <button type={type} className={className} onClick={onClick} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-dismiss="modal" aria-label="Close">
                {children}
            </button>
         );
    }
}
 
export default ButtonModal;