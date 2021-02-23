import React, { Component } from 'react';

class H1 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const { className , children } = this.props 
        return ( 
            <h1 className={className}>{children}</h1>
         );
    }
}
 
export default H1;