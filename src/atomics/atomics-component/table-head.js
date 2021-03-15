import React, { Component } from 'react';

class THead extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <thead className={className}>
                {children}
            </thead>
         );
    }
}
 
export default THead;