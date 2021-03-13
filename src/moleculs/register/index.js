import React, { Component } from 'react';
import { 
    ContainerSingle,
    H3,
    H5,
    Image,
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
    FormHelperText
} from '@material-ui/core'
import {
    PersonAdd as PersonAddIcon, 
    Visibility, 
    VisibilityOff 
} from '@material-ui/icons';
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import './style.css'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            showPasswordConfirm: false, 
            name: '',
            username: '',
            email: '',
            address: '',
            password: '',
            passwordConfirm: '',
            errorEmail: false,
            errorPassword: false,
            errorPasswordConfirm: false,
            helperTextEmail: ' ',
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
            if (name === 'email') {
                let emailPattern = /[\w-\.]+@([\w-]+\.)+[\w-]{0,}$/;
                let validationEmail = emailPattern.test(this.state.email)
                if (!validationEmail && this.state.email !== '') {
                    this.setState({
                        ...this.state,
                        errorEmail: true,
                        helperTextEmail: 'email must include @ and .'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorEmail: false,
                        helperTextEmail: ' '
                    })
                }
            } else if (name === 'password') {
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
        this.handleFetchingCreateUserAPI = () => {
            const {errorEmail,errorPassword,errorPasswordConfirm} = this.state
            const {name,username,address,email,password} = this.state
            
            if (
                errorEmail === true || 
                errorPassword === true || 
                errorPasswordConfirm === true ||
                name === '' ||
                username === '' ||
                address === '') {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please check your form',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            } else {
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
                //method to request API
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        namaUser: '' + name +'',
                        email: '' + email + '',
                        username: '' + username + '',
                        password: '' + password + '',
                        alamat: '' + address + ''
                    })
                };
                //fetching data to url API Back-End
                fetch("http://localhost:8080/parkir/create-user/", requestOptions)
                    .then((response) => {
                        return response.json()
                    })
                    .then(
                        (result) => {
                            //do what you want with the response here
                            if (result.errors) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: 'Please check your form',
                                    icon: 'error',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                            } else if (result.errorMessage) {
                                Swal.fire({
                                    title: 'Error!',
                                    text: result.errorMessage,
                                    icon: 'error',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                            } else {
                                Toast.fire({
                                    icon: 'success',
                                    title: result.successMessage,
                                })
                                this.props.history.push('/')
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
            padding: 20,
            height: '90vh',
            width: 600,
            margin: '30px auto',
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
            marginTop: '40px',
            marginBottom: '10px'
        }

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
                    <Grid>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid align='center'>
                                <Avatar style={avatarStyle}><PersonAddIcon/></Avatar>
                                <H5 style={titleLoginStyle}>Create An Account</H5>
                            </Grid>
                            <form className={useStyles.root} noValidate autoComplete="off">
                                <TextField
                                    style={inputStyle}
                                    id="standard-basic" 
                                    label="Full Name"
                                    name="name"
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    required
                                    helperText=" "
                                />
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            style={inputStyle}
                                            id="standard-basic" 
                                            label="Username"
                                            name="username"
                                            onChange={this.handleSetValue}
                                            fullWidth
                                            required
                                            helperText=" "
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={this.state.errorEmail === true}
                                            style={inputStyle}
                                            id="standard-basic" 
                                            label="Email"
                                            name="email"
                                            onChange={this.handleSetValue}
                                            fullWidth
                                            required
                                            helperText={this.state.helperTextEmail}
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Address"
                                    multiline
                                    fullWidth
                                    required
                                    name="address"
                                    onChange={this.handleSetValue}
                                    rows={4}
                                    helperText=" "
                                />
                            </form>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
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
                                </Grid>
                                <Grid item xs={6}>
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
                                </Grid>
                            </Grid>
                            <center>
                            <Button 
                                style={buttonStyle}
                                onClick={() => this.handleFetchingCreateUserAPI()} 
                                variant="contained" 
                                color="primary">
                                Register
                            </Button>
                            </center>
                            <center>
                            <A 
                                className='linkStyle' 
                                onClick={() => this.props.history.push("/")}>
                                <Span className="span-registered">Back to login</Span>
                            </A></center>
                        </Paper>
                    </Grid>
                </ContainerSingle>
            </>
         );
    }
}
 
export default Register;