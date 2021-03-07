import React, { Component } from 'react';
import {
    Button,
    ContainerSingle,
    H5,
    I,
    Input,
    Label,
    Span,
    TextArea,
    InputDisabled, 
    SelectSm,
    Option} from '../../atomics'
import { connect } from "react-redux"
import './style.css'

class UpdateStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.handleCancelAdd = () => {
            const confirmCancel = window.confirm("Are you sure to leave this changes ?")
            if (confirmCancel) this.props.history.push('/staff')
        }
    }
    render() { 
        if (this.props.isLogin === false) {
            return this.props.history.push('/')
        }
        return ( 
            <ContainerSingle className="container-add">
                <ContainerSingle className="judul-container-add">
                    <H5>Update Staff</H5>
                </ContainerSingle>
                <ContainerSingle className="container-add-leftt mbt-content">
                    <ContainerSingle className="mb-3">
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            ID :
                        </Label>
                        <ContainerSingle className="email-container">
                            <InputDisabled type="text" className="form-control input-control" id="exampleFormControlInput1"/>
                        </ContainerSingle>
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Update Name :
                        </Label>
                        <ContainerSingle className="email-container">
                            <Input type="text" className="form-control input-control" id="exampleFormControlInput1"/>
                        </ContainerSingle>
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Update Username :
                        </Label>
                        <ContainerSingle className="email-container">
                            <Input type="text" className="form-control input-control" id="exampleFormControlInput1"/>
                        </ContainerSingle>
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Update E-mail :
                        </Label>
                        <ContainerSingle className="email-container">
                            <Input type="text" className="form-control input-control" id="exampleFormControlInput1"/>
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="container-add-rightt">
                    <Label htmlFor="exampleFormControlInput1" className="form-label">
                        Address :
                    </Label>
                    <ContainerSingle className="email-container">
                        <TextArea className="form-control input-control" id="floatingTextarea"></TextArea>
                    </ContainerSingle>
                    <Label htmlFor="exampleFormControlInput1" className="form-label">
                        Status :
                    </Label>
                    <ContainerSingle className="email-container">
                        <SelectSm className="form-select form-select-sm">
                            <Option>Active</Option>
                            <Option>Non-Active</Option>
                        </SelectSm>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="tombol-controll">
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
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(UpdateStaff);