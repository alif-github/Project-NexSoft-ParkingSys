import React, { Component } from 'react';
import { connect } from "react-redux"
import './style.css'
import { ContainerSingle , H3 , I , H5 } from '../atomics';
import Staff from '../moleculs/content-staff'
import Profile from '../moleculs/profile'
import Nav from '../moleculs/navigation'
import Routes from '../config/routes';
import AddStaff from '../moleculs/add-staff';
import { Redirect } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {
        if(this.props.isLogin === false) {
            return <Redirect to="/" />
        }
        return ( 
            <ContainerSingle>
                <ContainerSingle className="header">
                    <H3>
                        Secure Parking Integrated System
                    </H3>
                    <ContainerSingle className="power-off" onClick={() => {this.props.changeStatusLogout(); this.props.history.push("/")}}>
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
                        {this.props.comp}
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="footer">
                    Copyright 2021. Alif Yudha Syahputra
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin
})

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLogout: () => dispatch({ type: 'LOGOUT_SUCCESS' })
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(HomePage);