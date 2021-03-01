import React, { Component } from 'react';

class TRow extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { children } = this.props
        return ( 
            <tr>{children}</tr>
         );
    }
}
 
export default TRow;