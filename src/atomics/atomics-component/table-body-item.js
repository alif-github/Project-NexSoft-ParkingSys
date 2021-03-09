import React, { Component } from 'react';

class TD extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { colSpan , children } = this.props
        return ( 
            <td colSpan={colSpan}>{children}</td>
         );
    }
}
 
export default TD;