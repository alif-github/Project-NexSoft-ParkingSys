import React, { Component } from 'react';

class ContainerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , id , tabIndex , children } = this.props
        return ( 
            <div className={className} id={id} tabIndex={tabIndex} aria-labelledby="exampleModalLabel" aria-hidden="true">
                {children}
            </div>
         );
    }
}
 
export default ContainerModal;