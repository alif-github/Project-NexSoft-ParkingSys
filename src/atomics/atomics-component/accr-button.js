import React, { Component } from 'react';

class ButtonAcr extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <button className={className} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                {children}
            </button>
         );
    }
}
 
export default ButtonAcr;