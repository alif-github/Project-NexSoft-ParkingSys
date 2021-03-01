import React, { Component } from 'react';

class Hr extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <label className={className}>{children}</label>
         );
    }
}
 
export default Hr;