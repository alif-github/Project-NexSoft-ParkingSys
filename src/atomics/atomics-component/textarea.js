import React, { Component } from 'react';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , placeholder , id , children } = this.props
        return ( 
            <textarea className={className} placeholder={placeholder} id={id}>{children}</textarea>
         );
    }
}
 
export default TextArea;