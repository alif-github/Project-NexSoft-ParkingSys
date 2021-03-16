import React, { Component } from 'react';
import { connect } from "react-redux"
import './style.css'
import { ContainerSingle , H3 , I , H5 } from '../../atomics';
import NavStaff from '../../moleculs/navigation-staff'
import Swal from 'sweetalert2'
import { Redirect } from 'react-router-dom';
import ProfileStaff from '../../moleculs/profile-staff';

class HomePageStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
        this.handleLogout = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure want to logout ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              })
              .then((result) => {
                if (result.isConfirmed) {
                    this.props.changeStatusLogout();
                    this.props.history.push("/");
                }
              })
        }
    }

    render() {
        if(this.props.isLogin === false) {
            return <Redirect to="/" />
        }
        return ( 
            <ContainerSingle>
                <ContainerSingle className="header-staff">
                    <H3>
                        Secure Parking Control Panel
                    </H3>
                    <ContainerSingle className="power-off" onClick={() => this.handleLogout()}>
                        <I className="fa fa-power-off logout-icon" aria-hidden="true"></I>
                        <H5 className="logout">
                              Logout
                        </H5>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="body">
                    <ContainerSingle className="navigation-staff">
                        <ProfileStaff />
                        <ContainerSingle className="menu">
                            <NavStaff />
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="content-staff">
                        {this.props.comp}
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="footer-staff">
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
 
export default connect(mapStateToProps , mapDispatchToProps)(HomePageStaff);