import React, { Component } from 'react';
import {
    ContainerSingle
} from '../../atomics/index'
import './style.css'

class Page404 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() { 
        console.log("History saat ini:", this.props.history)
        return ( 
            <ContainerSingle className="body-500">
                <ContainerSingle className="content-body-500">
                    <ContainerSingle className="content-body body-1">
                        404
                    </ContainerSingle>
                    <ContainerSingle className="content-body body-2">
                        Opps.. What are you looking for?
                    </ContainerSingle>
                    <ContainerSingle className="content-body body-3">
                        This page not found
                    </ContainerSingle>
                    <ContainerSingle className="buttonbody" onClick={() => this.props.history.push('/')}>
                        Back
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default Page404;