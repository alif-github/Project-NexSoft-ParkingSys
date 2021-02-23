import React from 'react';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom'
import { LoginAdmin , LoginStaff } from '../../organisms/login'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/login-admin">
                    <LoginAdmin/>
                </Route>
                <Route path="/login-staff">
                    <LoginStaff/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;