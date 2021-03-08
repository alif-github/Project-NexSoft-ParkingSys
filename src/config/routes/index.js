import React, { Component } from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import { ChangePassword, HomePage, InternalServerError, Register } from '../../organisms/login'
import Login from '../../moleculs/login-mat-ui/login'
import { connect } from "react-redux"

import DashBoardAdmin from '../../moleculs/content-dashboard'
import Staff from '../../moleculs/content-staff'
import UpdateStaff from '../../moleculs/update-staff';
import AddStaff from '../../moleculs/add-staff'


const Routes = (props) => {
    if (props.isLogin) {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={(props) => <HomePage {...props} comp={<DashBoardAdmin/>}/>}/>
                    <Route path="/staff/add" exact component={(props) => <HomePage {...props} comp={<AddStaff {...props}/>}/>}/>
                    <Route path="/staff/update/:id" exact component={(props) => <HomePage {...props} comp={<UpdateStaff {...props}/>}/>}/>
                    <Route path="/staff" exact component={(props) => <HomePage {...props} comp={<Staff {...props}/>}/>}/>
                </Switch> 
            </Router>
        )
    } else {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={(props) => <Login {...props}/>} />
                    <Route path="/register" component={Register} />
                    <Route path="/change-password" component={(props) => <ChangePassword {...props}/>} />
                    <Route path="/500-internal-server-error" component={InternalServerError} />
                    <Route path="/staff/update/:id" exact component={(props) => <HomePage {...props} comp={<UpdateStaff {...props}/>}/>}/>
                    <Route path="/staff" exact component={(props) => <HomePage {...props} comp={<Staff {...props}/>}/>}/>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Routes);