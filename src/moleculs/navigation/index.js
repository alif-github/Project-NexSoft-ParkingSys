import React, { Component } from 'react';
import { A,
    Button,
    ContainerSingle,
    Form,
    H1,
    H3,
    H5,
    Hr,
    I,
    Image,
    Input,
    Label,
    Span,
    TextArea,
    ButtonAcr,
    Table,
    THead,
    TRow,
    TH,
    TBody,
    TD } from '../../atomics'
import './style.css'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <ContainerSingle className="menu-border">
                <ContainerSingle className="menu-item">
                    <H5 className="menu-content">
                        Home
                    </H5>
                </ContainerSingle>
                <ContainerSingle className="menu-item">
                    <H5 className="menu-content">
                        Member
                    </H5>
                </ContainerSingle>
                <ContainerSingle className="menu-item">
                    <H5 className="menu-content">
                        Staff
                    </H5>
                </ContainerSingle>
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