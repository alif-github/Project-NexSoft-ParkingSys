import React, { Component } from 'react';
import {
    ContainerSingle,
    H5 } from '../../atomics'
import { Link } from 'react-router-dom'
import './style.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ContainerSingle className="menu-border-admin">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <ContainerSingle className="menu-item">
                        <H5 className="menu-content">
                            Dashboard
                        </H5>
                    </ContainerSingle>
                </Link>
                <Link to="/member" style={{textDecoration: 'none'}}>
                    <ContainerSingle className="menu-item">
                        <H5 className="menu-content">
                            Member
                        </H5>
                    </ContainerSingle>
                </Link>
                <Link to="/staff" style={{textDecoration: 'none'}}>
                    <ContainerSingle className="menu-item">
                        <H5 className="menu-content">
                            Staff
                        </H5>
                    </ContainerSingle>
                </Link>
                <Link to="/report-admin" style={{textDecoration: 'none'}}>
                    <ContainerSingle className="menu-item">
                        <H5 className="menu-content">
                            Report
                        </H5>
                    </ContainerSingle>
                </Link>
            </ContainerSingle> 
         );
    }
}
 
export default Nav;