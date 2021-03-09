import React, { Component } from 'react';

class SelectSm extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , onClick , onChange , children } = this.props
        return ( 
            <select className={className} aria-label=".form-select-sm example" onClick={onClick} onChange={onChange}>{children}</select>
         );
    }
}
 
export default SelectSm;