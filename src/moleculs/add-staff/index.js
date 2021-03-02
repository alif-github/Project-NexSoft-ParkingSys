import React, { Component } from 'react';
import {
    Button,
    ContainerSingle,
    H5,
    I,
    Input,
    Label,
    Span,
    TextArea } from '../../atomics'
import './style.css'

class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.handleCancelAdd = () => {
            const confirmCancel = window.confirm("Are you sure to leave this changes ?")
            if (confirmCancel) this.props.history.push('/adm-home/staff')
        }
    }
    render() { 
        return ( 
            <ContainerSingle className="container-add">
                <ContainerSingle className="judul-container-add">
                    <H5>Input New Staff</H5>
                </ContainerSingle>
                <ContainerSingle className="container-add-left mbt-content">
                    <ContainerSingle className="mb-3">
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            New Staff Name :
                        </Label>
                        <ContainerSingle className="email-container">
                            <Input type="text" className="form-control input-control" id="exampleFormControlInput1" placeholder="Input your name"/>
                        </ContainerSingle>
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Username :
                        </Label>
                        <ContainerSingle className="email-container">
                            <Input type="text" className="form-control input-control" id="exampleFormControlInput1" placeholder="Input your username"/>
                        </ContainerSingle>
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Email :
                        </Label>
                        <ContainerSingle className="email-container">
                            <Input type="text" className="form-control input-control" id="exampleFormControlInput1" placeholder="Input your username"/>
                        </ContainerSingle>
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Address :
                        </Label>
                        <ContainerSingle className="email-container">
                            <TextArea className="form-control input-control" placeholder="Input your address" id="floatingTextarea"></TextArea>
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="tombol-control">
                        <Button className="btn btn-success btn-float i-float">
                            <Span><I className="fa fa-cloud fa-icon" aria-hidden="true"></I></Span>
                            Save Changes
                        </Button>
                        <Button className="btn btn-danger btn-float" onClick={() => this.handleCancelAdd()}>
                            <Span><I className="fa fa-times fa-icon" aria-hidden="true"></I></Span>
                            Cancel
                        </Button>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="container-add-right">
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default AddStaff;