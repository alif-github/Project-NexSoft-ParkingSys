import React, { Component } from 'react';

class H5 extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        const { className , children } = this.props 
        return ( 
            <h5 className={className}>{children}</h5>
         );
    }
}
 
export default H5;