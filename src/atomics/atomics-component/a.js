import React, { Component } from 'react';

class A extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { href , style, className , children , onClick } = this.props
        return ( 
            <a href={href} style={style} className={className} onClick={onClick}>{children}</a>
         );
    }
}
 
export default A;