import React, { Component } from 'react';
import ContainerSingle from '../../atomics/div'
import Label from '../../atomics/label'
import Input from '../../atomics/input'
import Image from '../../atomics/img'
import H3 from '../../atomics/h3'
import H5 from '../../atomics/h5'
import I from '../../atomics/I'
import './style.css'

class LoginStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: 'password'
        }
        
        this.handleEye = () => {
            console.log("handle eye");
            if (this.state.type === 'password') this.setState({type: 'text'})
            else this.setState({type: 'password'})
        }
    }

    render() { 
        return ( 
            <>
                <ContainerSingle className="container-login">
                    <ContainerSingle className="border-login">
                        <ContainerSingle className="mb-3">
                            <H3 className="title-login">Login Staff</H3>
                        </ContainerSingle>
                        <ContainerSingle className="mb-3">
                            <Label htmlFor="exampleFormControlInput1" className="form-label">
                                Email :
                            </Label>
                            <ContainerSingle className="email-container">
                                <Input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Input your username"/>
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
                                        className={this.state.type === 'text' ? 'far fa-eye-slash' : 'far fa-eye'} 
                                        id="togglePassword"
                                        onClick={this.handleEye}
                                    ></I>
                                </ContainerSingle>
                            </ContainerSingle>
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>

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
            </>
         );
    }
}
 
export default LoginStaff;