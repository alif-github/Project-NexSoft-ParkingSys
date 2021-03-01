import React, { Component } from 'react';
import { A,
    Button,
    ContainerSingle,
    H3,
    H5,
    I,
    Image,
    Input,
    Label,
    Span } from '../../atomics/index'
import './style.css'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: 'password',
            array: []
        }
        
        this.handleEye = () => {
            // --------------------------------------------------------------
            // for changing type of password (type or text when icon clicked)
            if (this.state.type === 'password') this.setState({type: 'text'})
            else this.setState({type: 'password'})
            // --------------------------------------------------------------
        } 
    }

    render() { 
        return ( 
            <>
                {/* Border From Login Form to Image Introduction */}

                <ContainerSingle className="container-login-image">
                    <ContainerSingle className="image-login">
                        <Image className="image-logo-login" src="/images/secure-parking-header.png"/>
                    </ContainerSingle>
                    <ContainerSingle className="know-login">
                        <H3 className="title-login">
                            Welcome To Secure Parking Integration System
                        </H3>
                        <H5 className="title-login-text">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </H5>
                    </ContainerSingle>
                </ContainerSingle>

                {/* Change Password */}

                <ContainerSingle className="container-login">
                    <ContainerSingle className="border-login">
                        <ContainerSingle className="mb-3">
                            <H3 className="title-login">Change Password</H3>
                        </ContainerSingle>
                        <ContainerSingle className="mb-3">
                            <Label htmlFor="exampleFormControlInput2" className="form-label">
                                Password :
                            </Label>
                            <ContainerSingle>
                                <ContainerSingle className="password-container">
                                    <Input type={this.state.type} className="form-control" id="exampleFormControlInput2"/>
                                </ContainerSingle>
                                <ContainerSingle className="eye-slash-container">
                                    <I 
                                        className={this.state.type === 'text' ? 'far fa-eye' : 'far fa-eye-slash'} 
                                        id="togglePassword"
                                        onClick={this.handleEye}
                                    ></I>
                                </ContainerSingle>
                            </ContainerSingle>
                        </ContainerSingle>
                        <ContainerSingle className="mb-3">
                            <Label htmlFor="exampleFormControlInput2" className="form-label">
                                Password :
                            </Label>
                            <ContainerSingle>
                                <ContainerSingle className="password-container">
                                    <Input type={this.state.type} className="form-control" id="exampleFormControlInput2"/>
                                </ContainerSingle>
                                <ContainerSingle className="eye-slash-container">
                                    <I 
                                        className={this.state.type === 'text' ? 'far fa-eye' : 'far fa-eye-slash'} 
                                        id="togglePassword"
                                        onClick={this.handleEye}
                                    ></I>
                                </ContainerSingle>
                            </ContainerSingle>
                        </ContainerSingle>
                        <ContainerSingle>
                            <Button className="btn btn-success btn-login">
                                Change
                            </Button>
                            <A className="link-anchor" onClick={() => this.props.history.push("/register")}>
                                <Span className="span-registered">Not Registered?</Span> Create an account.
                            </A>
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
            </>
         );
    }
}
 
export default ChangePassword;