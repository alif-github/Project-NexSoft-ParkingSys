import React, { Component } from 'react';
import {Switch , Route} from 'react-router-dom'
import AddStaff from '../../moleculs/add-staff';
import DashBoardAdmin from '../../moleculs/content-dashboard'
import Staff from '../../moleculs/content-staff'
import UpdateStaff from '../../moleculs/update-staff';

class BodyContent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <Switch>
                {/* <Route exact path="/" component={props => <DashBoardAdmin {...props} />}/>
                <Route path="/staff/add" component={props => <AddStaff {...props} />}/> */}
                {/* <Route path="/staff/update/:id" component={(props) => <Staff {...props} comp={<UpdateStaff/>} />}/> */}
                {/* <Route path="/staff" component={props => <Staff {...props} />}/> */}
            </Switch>
         );
    }
}
 
export default BodyContent;