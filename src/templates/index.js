import React, { Component } from 'react';
import './style.css'
import { ContainerSingle , H3 , I , H5 } from '../atomics';
import Staff from '../moleculs/content-staff'
import Profile from '../moleculs/profile'
import Nav from '../moleculs/navigation'
import Routes from '../config/routes';
import BodyContent from '../organisms/body-content';
import AddStaff from '../moleculs/add-staff';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <ContainerSingle>
                <ContainerSingle className="header">
                    <H3>
                        Secure Parking Integrated System
                    </H3>
                    <ContainerSingle className="power-off">
                        <I className="fa fa-power-off logout-icon" aria-hidden="true"></I>
                        <H5 className="logout">
                            Logout
                        </H5>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="body">
                    <ContainerSingle className="navigation">
                        <Profile />
                        <ContainerSingle className="menu">
                            <Nav />
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="content">
                        <BodyContent/>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="footer">
                    Copyright 2021. Alif Yudha Syahputra
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default HomePage;