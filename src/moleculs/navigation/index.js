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
            <ContainerSingle className="menu-border">
                <Link to="/adm-home" style={{textDecoration: 'none'}}>
                    <ContainerSingle className="menu-item">
                        <H5 className="menu-content">
                            Home
                        </H5>
                    </ContainerSingle>
                </Link>
                <ContainerSingle className="menu-item">
                    <H5 className="menu-content">
                        Member
                    </H5>
                </ContainerSingle>
                <Link to="/adm-home/staff" style={{textDecoration: 'none'}}>
                    <ContainerSingle className="menu-item">
                        <H5 className="menu-content">
                            Staff
                        </H5>
                    </ContainerSingle>
                </Link>
                <ContainerSingle className="menu-item">
                    <H5 className="menu-content">
                        Report
                    </H5>
                </ContainerSingle>
            </ContainerSingle> 
         );
    }
}
 
export default Nav;