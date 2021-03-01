import React, { Component } from 'react';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { value , children } = this.props
        return ( 
            <option value={value}>{children}</option>
         );
    }
}
 
export default Option;