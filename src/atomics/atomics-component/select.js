import React, { Component } from 'react';

class SelectSm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <select className={className} aria-label=".form-select-sm example">{children}</select>
         );
    }
}
 
export default SelectSm;