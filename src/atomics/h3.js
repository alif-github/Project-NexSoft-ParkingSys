import React, { Component } from 'react';

class H3 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const { className , children } = this.props 
        return ( 
            <h3 className={className}>{children}</h3>
         );
    }
}
 
export default H3;