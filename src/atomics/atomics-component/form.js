import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { children } = this.props
        return (
            <form>
                { children }
            </form>
         );
    }
}
 
export default Form;