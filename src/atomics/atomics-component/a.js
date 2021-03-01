import React, { Component } from 'react';

class A extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { href , className , children , onClick } = this.props
        return ( 
            <a href={href} className={className} onClick={onClick}>{children}</a>
         );
    }
}
 
export default A;