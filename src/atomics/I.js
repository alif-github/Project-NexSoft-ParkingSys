import React, { Component } from 'react';

class I extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , id , onClick ,children } = this.props
        return ( 
            <i className={className} id={id} onClick={onClick}>{children}</i>
        );
    }
}
 
export default I;