import React, { Component } from 'react';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , value , children } = this.props
        return ( 
            <option className={className} value={value}>{children}</option>
         );
    }
}
 
export default Option;