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
import { connect } from "react-redux"
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            type: 'password',
            array: [],
            //save temporary username and password
            username: '',
            password: '',
        }
        this.handleEye = () => {
            // --------------------------------------------------------------
            // for changing type of password (type or text when icon clicked)
            if (this.state.type === 'password') this.setState({type: 'text'})
            else this.setState({type: 'password'})
            // --------------------------------------------------------------
        }

        this.fetchingAPILogin = () => {
            const { username , password } = this.state

            if (username.length <= 0 && password.length <= 0) {
                alert('Fill Username And Password')
            } else {
                //method to request API
                const requestOptions = {
                    method: 'GET'
                };
                //fetching data to url API Back-End
                fetch("http://localhost:8080/parkir/auth/?username="+ username +"&password="+ password +"", requestOptions)
                    .then((response) => {
                        return response.json()
                    })
                    .then(
                        (result) => {
                            //do what you want with the response here
                            if (result.successMessage === "Login Success") {
                                this.props.changeStatusLogin(username)
                                alert(result.successMessage);
                            } else if (result.errorMessage === "Unable Login, Please check your username and password"){
                                alert(result.errorMessage);
                            }
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            this.props.history.push('/500-internal-server-error')
                        }
                    )
            }

        }

        this.setValue = el => {
            //save username value and password value into state
            this.setState({
                [el.target.name]: el.target.value
            })
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

                {/* Login/Regis */}

                <ContainerSingle className="container-login">
                    <ContainerSingle className="border-login">
                        <ContainerSingle className="mb-3">
                            <H3 className="title-login">Login User</H3>
                        </ContainerSingle>
                        <ContainerSingle className="mb-3">
                            <Label htmlFor="exampleFormControlInput2" className="form-label">
                                Username :
                            </Label>
                            <ContainerSingle className="email-container">
                                <Input 
                                    type="text" 
                                    className="form-control" 
                                    id="exampleFormControlInput1" 
                                    placeholder="Input your username"
                                    name="username"
                                    onChange={this.setValue}/>
                            </ContainerSingle>
                        </ContainerSingle>
                        <ContainerSingle className="mb-3">
                            <Label htmlFor="exampleFormControlInput2" className="form-label">
                                Password :
                            </Label>
                            <ContainerSingle>
                                <ContainerSingle className="password-container">
                                    <Input 
                                        type={this.state.type} 
                                        className="form-control" 
                                        id="exampleFormControlInput2"
                                        name="password"
                                        onChange={this.setValue}/>
                                </ContainerSingle>
                                <ContainerSingle className="eye-slash-container">
                                    <I 
                                        className={this.state.type === 'text' ? 'far fa-eye' : 'far fa-eye-slash'} 
                                        id="togglePassword"
                                        onClick={() => this.handleEye()}
                                    ></I>
                                </ContainerSingle>
                            </ContainerSingle>
                        </ContainerSingle>
                        <ContainerSingle>
                            <Button 
                                className="btn btn-success btn-login"
                                onClick={() => this.fetchingAPILogin()}>
                                Log In
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

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLogin: (username) => dispatch({ type: 'LOGIN_SUCCESS' , payload: {username} })
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Login);