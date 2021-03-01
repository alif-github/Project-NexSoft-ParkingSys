import React, { Component } from 'react';

class TH extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <th className={className}>{children}</th>
         );
    }
}
 
export default TH;