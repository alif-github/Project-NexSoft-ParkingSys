import React, { Component } from 'react';
import {
    ContainerSingle
} from '../../atomics/index'
import './style.css'

class InternalServerError extends Component {
    render() { 
        return ( 
            <ContainerSingle className="body-500">
                <ContainerSingle className="content-body-500">
                    <ContainerSingle className="content-body body-1">
                        500
                    </ContainerSingle>
                    <ContainerSingle className="content-body body-2">
                        Opps.. Internal Server Error
                    </ContainerSingle>
                    <ContainerSingle className="content-body body-3">
                        Please Check Your Connection and Reload The Page
                    </ContainerSingle>
                    <ContainerSingle className="buttonbody" onClick={() => this.props.history.push('/')}>
                        Back To Login
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default InternalServerError;