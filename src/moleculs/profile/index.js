import React, { Component } from 'react';
import {
    ContainerSingle,
    I} from '../../atomics'
import './style.css'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <ContainerSingle className="container-profile">
                <ContainerSingle className="container-profile-kiri">
                    <I className="fa fa-user-circle user-icon" aria-hidden="true"></I>
                </ContainerSingle>
                <ContainerSingle className="container-profile-kanan">
                    <ContainerSingle>
                        Welcome,
                    </ContainerSingle>
                    <ContainerSingle>
                        Alif Yudha Syahputra
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default Profile;