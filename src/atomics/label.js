import React, { Component } from 'react';

class Label extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { htmlFor , className , children } = this.props
        return ( 
            <label htmlFor={htmlFor} className={className}>{children}</label>
         );
    }
}
 
export default Label;