import React, { Component } from 'react';
import './style.css'
import { 
    A,
    Span } from '../../atomics/index'
import { 
    Grid,
    Paper,
    Avatar,
    TextField,
    IconButton,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    Button,
    FormHelperText } from '@material-ui/core'
import { 
    LockOutlined as LockOutlinedIcon, 
    Visibility, 
    VisibilityOff } from '@material-ui/icons';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { connect } from 'react-redux'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showPassword: false,
            username: '',
            password: ''
         }
        this.handleSetValue = (event) => {
            this.setState({ ...this.state, [event.target.name]: event.target.value });
        };
        this.handleClickShowPassword = () => {
            this.setState({ ...this.state, showPassword: !this.state.showPassword });
        };
        this.handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        this.handleFetchingAPILogin = () => {
            const { username , password } = this.state
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
                    .then((result) => {
                            const {username} = this.state
                            //do what you want with the response here
                            if (result.successMessage === "Login Success") {
                                Swal.fire({
                                    title: 'Success!',
                                    text: result.successMessage+', Hi '+username+'!',
                                    icon: 'success',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                                //get collect data user
                                this.handleFetchingUserData(username);
                                this.props.changeStatusLogin(username)
                            } else if (result.errorMessage === "Unable Login, Please check your username and password"){
                                Toast.fire({
                                    icon: 'error',
                                    title: result.errorMessage
                                })
                            } else if (result.errorMessage === "Password Default") {
                                this.handleFetchingUserData(username);
                                this.props.changeStatusDefaultPassword()
                                this.props.history.push('/change-password')
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
        };
        this.handleFetchingUserData = username => {
            //method to request API
            const requestOptions = {
                method: 'GET'
            };
            //fetching data to url API Back-End
            fetch("http://localhost:8080/parkir/show-user/?username="+ username +"", requestOptions)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (!result.errorMessage) {
                            this.props.addUser(result)
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

    render() {
        console.log("cek di login :",this.props.isPasswordDefault);
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
            height: '60vh',
            width: 380,
            margin: '130px auto',
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

        return (
            <div className={useStyles.container}>
                <Grid>
                    <Paper elevation={10} style={paperStyle}>
                        <Grid align='center'>
                            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                            <h5 style={titleLoginStyle}>Login User</h5>
                        </Grid>
                        <form className={useStyles.root} noValidate autoComplete="off">
                            <TextField
                                style={inputStyle}
                                id="standard-basic" 
                                label="Username"
                                name="username"
                                onChange={this.handleSetValue}
                                fullWidth
                                required
                                helperText="" 
                            />
                        </form>
                        <FormControl fullWidth style={inputStyle} className={clsx(useStyles.margin, useStyles.textField)}>
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
                        <FormHelperText id="component-error-text"></FormHelperText>
                        </FormControl>
                        <center>
                        <Button 
                            style={buttonStyle}
                            onClick={() => this.handleFetchingAPILogin()} 
                            variant="contained" 
                            color="primary">
                            Login
                        </Button>
                        </center>
                        <center>
                        <A 
                            className='linkStyle' 
                            onClick={() => this.props.history.push("/register")}>
                            <Span className="span-registered">Not Registered?</Span> Create an account.
                        </A></center>
                    </Paper>
                </Grid>
            </div>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    isPasswordDefault: state.auth.isPasswordDefault
})

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLogin: (username) => dispatch({ type: 'LOGIN_SUCCESS' , payload: {username} }),
        addUser: user => dispatch({ type: 'ADD_USER', payload: {user} }),
        changeStatusDefaultPassword: () => dispatch({ type: 'PASSWORD_DEFAULT'})
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Login);