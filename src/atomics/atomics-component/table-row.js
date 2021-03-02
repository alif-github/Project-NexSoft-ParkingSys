import React, { Component } from 'react';

class TRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <tr className={className}>{children}</tr>
         );
    }
}
 
export default TRow;