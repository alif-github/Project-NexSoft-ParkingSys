import React, { Component } from 'react';

class Span extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <span className={className}>{children}</span>
         );
    }
}

export default Span;