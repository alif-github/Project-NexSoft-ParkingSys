import React, { Component } from 'react';
import { A,ContainerSingle,H3,H5,Image,Span } from '../../atomics/index'
import { Grid,Paper,Avatar,IconButton,Input,InputLabel,InputAdornment,FormControl,Button,FormHelperText } from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import clsx from 'clsx';
import Swal from 'sweetalert2'
import './style.css'

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            showPasswordConfirm: false, 
            errorPassword: false,
            errorPasswordConfirm: false,
            password: '',
            passwordConfirm: '',
            helperTextPassword: ' ',
            helperTextPasswordConfirm: ' ',
        }

        this.handleSetValue = (event) => {
            this.setState({
                [event.target.name]: event.target.value,
            },() => this.handleCheckErrorPatern(event.target.name));
        };
        this.handleCheckErrorPatern = name => {
            if (name === 'password') {
                let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;
                let validationPassword = passwordPattern.test(this.state.password)
                if (!validationPassword && this.state.password !== '') {
                    this.setState({
                        errorPassword: true,
                        helperTextPassword: 'password minimal 6-8 character minimal 1 Uppercase font, Lowercase font, and number'
                    })
                } else {
                    this.setState({
                        errorPassword: false,
                        helperTextPassword: ' '
                    })
                }
            } else if (name === 'passwordConfirm') {
                let passwordConfirmPattern = this.state.passwordConfirm;
                let passwordPatternTest = this.state.password;
                if (passwordConfirmPattern !== passwordPatternTest && this.state.passwordConfirm !== '') {
                    this.setState({
                        errorPasswordConfirm: true,
                        helperTextPasswordConfirm: 'password must be same above, check your input'
                    })
                } else {
                    this.setState({
                        errorPasswordConfirm: false,
                        helperTextPasswordConfirm: ' '
                    })
                }
            }
        }
        this.handleClickShowPassword = () => {
            this.setState({ showPassword: !this.state.showPassword });
        };
        this.handleClickShowPasswordConfirm = () => {
            this.setState({ showPasswordConfirm: !this.state.showPasswordConfirm });
        };
        this.handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        this.handleMouseDownPasswordConfirm = (event) => {
            event.preventDefault();
        };
        this.handleBackToLogin = () => {
            this.props.changeStatusDefaultPassword()
            this.props.history.push('')
        };
        this.handleChangePasswordAPI = () => {
            const { password , errorPassword , errorPasswordConfirm } = this.state
            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            if (errorPassword === true || errorPasswordConfirm === true) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please check error in your form',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            } else {
                //method to request API
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        password:''+password+''
                    })
                };
                fetch("http://localhost:8080/parkir/change-password/?username="+this.props.usernameData+"", requestOptions)
                    .then((response) => {
                        return response.json()
                    })
                    .then(
                        (result) => {
                            //do what you want with the response here
                            if (result.errorMessage) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: result.errorMessage,
                                    icon: 'error',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                            } else {
                                let backToLogin = setTimeout(() => this.handleBackToLogin(), 2000);
                                Toast.fire({
                                    icon: 'success',
                                    title: result.successMessage,
                                })
                                .then(backToLogin)
                            }
                        },
                        (error) => {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Connection Time Out!',
                                icon: 'error',
                                timer: 2000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            })
                        }
                    )
            }
        };
    }

    render() { 
        const useStyles = makeStyles((theme) => ({
            root: {
              '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
                display: 'flex',
                flexWrap: 'wrap',
              },
            },
            container: {
                flexGrow: 1
            },
            margin: {
                margin: theme.spacing(1),
            },
            withoutLabel: {
                marginTop: theme.spacing(3),
            },
            textField: {
                width: '25ch',
            },
          }));
        const inputStyle = {
            marginTop: '10px',
            marginBottom: '10px'
        }
        const paperStyle = {
            padding: 20,
            height: '68vh',
            width: 380,
            margin: '8px auto',
            borderRadius: '2vh'
        }
        const avatarStyle = {
            backgroundColor: '#fcb134'
        }
        const titleLoginStyle = {
            marginBottom: '10px',
            marginTop: '10px'
        }
        const buttonStyle = {
            width: '25ch',
            marginTop: '50px',
            marginBottom: '20px'
        }

        if (!this.props.isPasswordDefault){
            this.props.history.push('')
        }
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
                    <ContainerSingle className={useStyles.container}>
                        <Grid>
                            <Paper elevation={10} style={paperStyle}>
                                <Grid align='center'>
                                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                                    <h5 style={titleLoginStyle}>Change Password</h5>
                                </Grid>
                                <FormControl 
                                    error={this.state.errorPassword === true} 
                                    fullWidth 
                                    style={inputStyle} 
                                    className={clsx(useStyles.margin, useStyles.textField)}>
                                    <InputLabel required htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleSetValue}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                            onMouseDown={this.handleMouseDownPassword}
                                            >
                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                    <FormHelperText id="component-error-text">{this.state.helperTextPassword}</FormHelperText>
                                </FormControl>
                                <FormControl 
                                    error={this.state.errorPasswordConfirm === true}
                                    fullWidth 
                                    style={inputStyle} 
                                    className={clsx(useStyles.margin, useStyles.textField)}>
                                    <InputLabel required htmlFor="standard-adornment-password">Confirmation Password</InputLabel>
                                    <Input
                                        id="standard-adornment-password"
                                        type={this.state.showPasswordConfirm ? 'text' : 'password'}
                                        value={this.state.passwordConfirm}
                                        name="passwordConfirm"
                                        onChange={this.handleSetValue}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleClickShowPasswordConfirm}
                                            onMouseDown={this.handleMouseDownPasswordConfirm}
                                            >
                                            {this.state.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                                <FormHelperText id="component-error-text">{this.state.helperTextPasswordConfirm}</FormHelperText>
                                </FormControl>
                                <center>
                                <Button 
                                    style={buttonStyle}
                                    onClick={() => this.handleChangePasswordAPI()} 
                                    variant="contained" 
                                    color="primary">
                                    Register
                                </Button>
                                </center>
                                <center>
                                <A 
                                    className='linkStyle' 
                                    onClick={() => this.handleBackToLogin()}>
                                    <Span className="span-registered">Back to login</Span>
                                </A>
                                </center>
                            </Paper>
                        </Grid>
                    </ContainerSingle>
                </ContainerSingle>
            </>
         );
    }
}

const mapStateToProps = state => ({
    isPasswordDefault: state.auth.isPasswordDefault,
    usernameData: state.auth.username
})

const mapDispatchToProps = dispatch => {
    return {
        changeStatusDefaultPassword: () => dispatch({ type: 'PASSWORD_STATUS'})
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ChangePassword);