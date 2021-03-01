import React, { Component } from 'react';
import { 
    A,
    Button,
    ContainerSingle,
    H3,
    H5,
    I,
    Image,
    Input,
    Label,
    TextArea } from '../../atomics/index'
import './style.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type1: 'password',
            type2: 'password',
            array: []
        }
        
        this.handleEye1 = () => {
            // --------------------------------------------------------------
            // for changing type of password (type or text when icon clicked)
            if (this.state.type1 === 'password') this.setState({type1: 'text'})
            else this.setState({type1: 'password'})
            // --------------------------------------------------------------
        }
        
        this.handleEye2 = () => {
            // --------------------------------------------------------------
            // for changing type of password (type or text when icon clicked)
            if (this.state.type2 === 'password') this.setState({type2: 'text'})
            else this.setState({type2: 'password'})
            // --------------------------------------------------------------
        }
    }

    render() { 
        return ( 
            <>

                {/* Border From Login Form to Image Introduction */}

                <ContainerSingle className="container-registration-image">
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

                {/* Login/Regis */}
                <ContainerSingle className="container-registration">
                    <ContainerSingle className="title-container-regis">
                        <H3 className="title-registration">Create Account</H3>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Name :
                        </Label>
                        <Input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Input your name"/>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Username :
                        </Label>
                        <Input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Input your username"/>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            E-mail :
                        </Label>
                        <Input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Input your email"/>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Label htmlFor="exampleFormControlInput1" className="form-label">
                            Address :
                        </Label>
                        <TextArea className="form-control" placeholder="Input your address" id="floatingTextarea"></TextArea>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Label htmlFor="exampleFormControlInput2" className="form-label">
                            New Password :
                        </Label>
                        <ContainerSingle className="left-box">
                            <Input type={this.state.type1} className="form-control" id="exampleFormControlInput2"/>
                        </ContainerSingle>
                        <ContainerSingle className="right-box">
                            <I 
                                className={this.state.type1 === 'text' ? 'far fa-eye icon' : 'far fa-eye-slash icon'}
                                id="togglePassword"
                                onClick={this.handleEye1}
                            ></I>
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Label htmlFor="exampleFormControlInput2" className="form-label">
                            Confirm Password :
                        </Label>
                        <ContainerSingle className="left-box">
                            <Input type={this.state.type2} className="form-control" id="exampleFormControlInput2"/>
                        </ContainerSingle>
                        <ContainerSingle className="right-box">
                            <I 
                                className={this.state.type2 === 'text' ? 'far fa-eye icon' : 'far fa-eye-slash icon'}
                                id="togglePassword"
                                onClick={this.handleEye2}
                            ></I>
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <Button className="btn btn-success btn-register">
                            Register
                        </Button>
                    </ContainerSingle>
                    <ContainerSingle className="box-form">
                        <A onClick={() => this.props.history.push('/')} className="link-to-login">Back to login</A>
                    </ContainerSingle>
                </ContainerSingle>
            </>
         );
    }
}
 
export default Register;