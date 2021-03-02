import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { HomePage } from '../../organisms/login'

const Routes = () => {
    // return (
    //     <Router>
    //         <Switch>
    //             <Route exact path="/" component={Login} />
    //             <Route path="/register" component={Register} />
    //             <Route path="/change-password" component={ChangePassword} />
    //             <Route path="/home-page" component={HomePage} />
    //         </Switch>
    //     </Router>
    // )

    return (
        <Router>
            <HomePage/>
        </Router>
    )
}

export default Routes;