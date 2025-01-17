import React, { Component } from 'react';
import { A,ContainerSingle,Span,Image,H1,H5 } from '../../atomics/index'
import { Grid,Paper,Avatar,TextField,IconButton,Input,InputLabel,InputAdornment,FormControl,Button,FormHelperText} from '@material-ui/core'
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Swal from 'sweetalert2'
import clsx from 'clsx';
import Carousel from 'react-bootstrap/Carousel'
import './style.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showPassword: false,
            username: '',
            password: ''
        }
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
        this.handleSetValue = (event) => {
            this.setState({ [event.target.name]: event.target.value });
        };
        this.handleClickShowPassword = () => {
            this.setState({ showPassword: !this.state.showPassword });
        };
        this.handleMouseDownPassword = (event) => {
            event.preventDefault();
        };
        this.handleFetchingAPILogin = () => {
            const { username , password } = this.state
            //method to request API
            const requestOptions = {
                method: 'GET'
            };

            if (username.length <= 0 || password.length <= 0) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Full Fill The Form',
                    icon: 'error',
                    showConfirmButton: true,
                })
            } else {
                //fetching data to url API Back-End
                fetch("http://localhost:8080/parkir/auth/?username="+ username +"&password="+ password +"", requestOptions)
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
                            //do what you want with the response here
                            if (result.successMessage) {
                                this.handleFetchingUserData(result.successMessage);
                            } else if (result.errorMessage === "Unable Login, Please check your username and password"){
                                Toast.fire({
                                    icon: 'error',
                                    title: result.errorMessage
                                })
                            } else if (result.errorMessage === "Password Default") {
                                this.props.changeStatusDefaultPassword()
                                this.props.addUsername(username)
                                this.props.history.push('/change-password')
                            }
                        },
                        (error) => {
                            this.props.history.push('/500-internal-server-error')
                        }
                    )
            }
        };
        this.handleFetchingUserData = messagelogin => {
            const {username} = this.state
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
                        //yang bisa masuk hanya admin dengan kondisi aktif ataupun non-aktif serta staff dengan syarat status harus true, atau aktif
                        if ((!result.errorMessage && result.posisi === "Admin") || (!result.errorMessage && result.posisi === "Staff" && result.status === true)) {
                            Swal.fire({
                                title: 'Success!',
                                text: messagelogin+', Hi '+username+'!',
                                icon: 'success',
                                timer: 2000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                                imageUrl: 'https://seekvectorlogo.com/wp-content/uploads/2018/03/secure-parking-vector-logo.png',
                                imageWidth: 400,
                                imageHeight: 200,
                                imageAlt: 'Custom image',
                            })
                            this.props.addUser(result)
                            this.props.changeStatusLogin(username);
                        } else if (result.errorMessage) {
                            Toast.fire({
                                icon: 'error',
                                title: result.errorMessage
                            })
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Call Admin for turning the active status',
                                icon: 'error',
                                showConfirmButton: true,
                            })
                        }
                    },
                    (error) => {
                        this.props.history.push('/500-internal-server-error')
                    }
                )
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
            <>
            <ContainerSingle className="container-login-image">
                <ContainerSingle className="bannerr">
                    <Carousel>
                        <Carousel.Item style={{height: "50vh",width: "100%"}}>
                            <center>
                                <Image
                                className="image-login-banner"
                                src="https://seekvectorlogo.com/wp-content/uploads/2018/03/secure-parking-vector-logo.png"
                                alt="First slide"
                                />
                            </center>
                        </Carousel.Item>
                        <Carousel.Item style={{height: "50vh",width: "100%"}}>
                            <center>
                                <Image
                                className="image-login-banner"
                                src="https://boxies123.co.id/wp-content/uploads/2020/01/PREMIUM-MOTORCYLCE-PARKING.png"
                                alt="Second slide"
                                />
                            </center>
                        </Carousel.Item>
                        <Carousel.Item style={{height: "50vh",width: "100%"}}>
                            <center>
                                <Image
                                className="image-login-banner"
                                src="http://www.secureparking.co.id/images_news/GOPAY.jpg"
                                alt="Third slide"
                                />
                            </center>
                        </Carousel.Item>
                    </Carousel>
                </ContainerSingle>
                <ContainerSingle className="judul-bannerr bannerr">
                    <center>
                        <H1 className="judul-bannerr">
                            Secure Parking
                        </H1>
                        <H5 className="judul-bannerr">
                            Welcome to our Apps, We made it with love and with heart
                        </H5>
                    </center>
                </ContainerSingle>
            </ContainerSingle>
            <ContainerSingle className="container-registration">
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
                                defaultValue={this.state.username}
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
            </ContainerSingle>
            </>
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
        addUsername: username => dispatch({ type: 'ADD_USERNAME', payload: {username}}),
        changeStatusDefaultPassword: () => dispatch({ type: 'PASSWORD_DEFAULT'})
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Login);