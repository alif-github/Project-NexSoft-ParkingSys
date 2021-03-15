import React from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import { ChangePassword, HomePage, InternalServerError, Register , HomePageStaff } from '../../organisms/login'
import Login from '../../moleculs/login-mat-ui/login'
import { connect } from "react-redux"

import DashBoardAdmin from '../../moleculs/content-dashboard'
import Staff from '../../moleculs/content-staff'
import Member from '../../moleculs/content-member'
import UpdateStaff from '../../moleculs/update-staff';
import AddStaff from '../../moleculs/add-staff'
import AddMember from '../../moleculs/add-member'

import Page404 from "../../moleculs/404-Not-Found";
import ProfileDet from "../../moleculs/profile-detail"
import ChangePasswordProfile from '../../moleculs/change-password-profile';


const Routes = (props) => {
    if (props.isLogin && props.cekRole === "Admin") {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={(props) => <HomePage {...props} comp={<DashBoardAdmin/>}/>}/>
                    <Route path="/staff/add" exact component={(props) => <HomePage {...props} comp={<AddStaff {...props}/>}/>}/>
                    <Route path="/staff/update/:id" exact component={(props) => <HomePage {...props} comp={<UpdateStaff {...props}/>}/>}/>
                    <Route path="/staff" exact component={(props) => <HomePage {...props} comp={<Staff {...props}/>}/>}/>
                    <Route path="/profile/change-password" exact component={(props) => <HomePage {...props} comp={<ChangePasswordProfile {...props}/>}/>}/>
                    <Route path="/profile" exact component={(props) => <HomePage {...props} comp={<ProfileDet {...props}/>}/>}/>
                    <Route path="/member/add" exact component={(props) => <HomePage {...props} comp={<AddMember {...props}/>}/>}/>
                    <Route path="/member" exact component={(props) => <HomePage {...props} comp={<Member {...props}/>}/>}/>
                    <Route component={Page404}></Route>
                </Switch> 
            </Router>
        )
    } else if (props.isLogin && props.cekRole === "Staff" && props.cekStatus === true){
        return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePageStaff}/>
                <Route component={Page404}></Route>
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
                    <Route component={Page404}></Route>
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    cekRole: state.auth.user.posisi,
    cekStatus: state.auth.user.status
})

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Routes);