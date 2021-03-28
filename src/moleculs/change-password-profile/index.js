import React, { Component } from 'react';
import {
    H5, A, Span} from '../../atomics/index'
import { 
    Grid,
    Paper,
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Button,
    FormHelperText } from '@material-ui/core'
import { 
    Visibility, 
    VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Swal from 'sweetalert2'
import './style.css'
import { connect } from 'react-redux'

class ChangePasswordProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            showPasswordConfirm: false, 
            password: '',
            passwordConfirm: '',
            errorPassword: false,
            errorPasswordConfirm: false,
            helperTextPassword: ' ',
            helperTextPasswordConfirm: ' ',
        }

        this.handleSetValue = (event) => {
            this.setState({ 
                ...this.state, 
                [event.target.name]: event.target.value,
            },() => this.handleCheckErrorPatern(event.target.name));
        };
        this.handleCheckErrorPatern = name => {
            if (name === 'password') {
                let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,8}$/;
                let validationPassword = passwordPattern.test(this.state.password)
                if (!validationPassword && this.state.password !== '') {
                    this.setState({
                        ...this.state,
                        errorPassword: true,
                        helperTextPassword: 'password minimal 6-8 character minimal 1 Uppercase font, Lowercase font, and number'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorPassword: false,
                        helperTextPassword: ' '
                    })
                }
            } else if (name === 'passwordConfirm') {
                let passwordConfirmPattern = this.state.passwordConfirm;
                let passwordPatternTest = this.state.password;
                if (passwordConfirmPattern !== passwordPatternTest && this.state.passwordConfirm !== '') {
                    this.setState({
                        ...this.state,
                        errorPasswordConfirm: true,
                        helperTextPasswordConfirm: 'password must be same above, check your input'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorPasswordConfirm: false,
                        helperTextPasswordConfirm: ' '
                    })
                }
            } else {

            }
        }
        this.handleClickShowPassword = () => {
            this.setState({ ...this.state, showPassword: !this.state.showPassword });
        };
        this.handleClickShowPasswordConfirm = () => {
            this.setState({ ...this.state, showPasswordConfirm: !this.state.showPasswordConfirm });
        };
        this.handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        this.handleMouseDownPasswordConfirm = (event) => {
            event.preventDefault();
        };
        this.handleBackToLogin = () => {
            this.props.history.push('/profile')
        };
        this.handleChangePasswordAPI = () => {
            
            const { password } = this.state
            const { errorPassword , errorPasswordConfirm } = this.state
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
                fetch("http://localhost:8080/parkir/change-password/?username="+this.props.profileUser.username+"", requestOptions)
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
                                let logout = setTimeout(() => this.handleLogout(), 2000);
                                Toast.fire({
                                    icon: 'success',
                                    title: result.successMessage,
                                })
                                .then(logout)
                            }
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            // this.props.history.push('/500-internal-server-error')
                        }
                    )
            }
        };
        this.handleLogout = () => {
            this.props.changeStatusLogout();
            this.props.history.push("/");
        }
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
            marginTop: '5px',
            marginBottom: '5px'
        }
        const paperStyle = {
            padding: 13,
            height: '60vh',
            width: '40%',
            margin: '50px auto',
            borderRadius: '1vh'
        } 
        const judulProfileStyle = {
            textAlign: 'center',
            backgroundColor: '#fcb134',
            borderRadius: '1vh',
            padding: '1vh',
            marginBottom: '30px'
        }
        const buttonStyle = {
            width: '25ch',
            marginTop: '50px',
            marginBottom: '20px'
        }

        return ( 
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid item xs={12} style={judulProfileStyle}>
                                <H5>Change Password</H5>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <FormControl 
                                        error={this.state.errorPassword === true} 
                                        fullWidth 
                                        style={inputStyle} 
                                        className={clsx(useStyles.margin, useStyles.textField)}>
                                        <InputLabel required htmlFor="standard-adornment-password">Password</InputLabel>
                                        <Input
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
                                        <FormHelperText>{this.state.helperTextPassword}</FormHelperText>
                                    </FormControl>
                                    <FormControl 
                                        error={this.state.errorPasswordConfirm === true}
                                        fullWidth 
                                        style={inputStyle} 
                                        className={clsx(useStyles.margin, useStyles.textField)}>
                                        <InputLabel required htmlFor="standard-adornment-password">Confirmation Password</InputLabel>
                                        <Input
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
                                        <FormHelperText>{this.state.helperTextPasswordConfirm}</FormHelperText>
                                    </FormControl>
                                    <center>
                                    <Button 
                                        style={buttonStyle}
                                        onClick={() => this.handleChangePasswordAPI()} 
                                        variant="contained" 
                                        color="primary">
                                        Change Password
                                    </Button>
                                    </center>
                                    <center>
                                    <A 
                                        className='linkStyle' 
                                        onClick={() => this.handleBackToLogin()}>
                                        <Span className="span-registered">Back to profile</Span>
                                    </A></center>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    profileUser: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLogout: () => dispatch({ type: 'LOGOUT_SUCCESS' })
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ChangePasswordProfile);