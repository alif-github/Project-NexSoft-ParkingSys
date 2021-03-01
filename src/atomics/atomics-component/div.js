import React, { Component } from 'react';

class ContainerSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const { className , children , onClick , id } = this.props 
        return ( 
            <div className={className} onClick={onClick} id={id}>
                {children}
            </div>
         );
    }
}
 
export default ContainerSingle;