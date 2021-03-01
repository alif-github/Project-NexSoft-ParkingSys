import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { className , children } = this.props
        return ( 
            <table className={className}>
                {children}
            </table>
         );
    }
}
 
export default Table;