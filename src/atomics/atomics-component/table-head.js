import React, { Component } from 'react';

class THead extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { children } = this.props
        return ( 
            <thead>
                {children}
            </thead>
         );
    }
}
 
export default THead;