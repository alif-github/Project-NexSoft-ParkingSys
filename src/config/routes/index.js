import React from 'react';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom'
import { Login , Register , ChangePassword , HomePage } from '../../organisms/login'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/change-password" component={ChangePassword} />
                <Route path="/home-page" component={HomePage} />
            </Switch>
        </Router>
    )
}

export default Routes;