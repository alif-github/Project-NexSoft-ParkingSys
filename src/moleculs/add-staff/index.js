import React, { Component } from 'react';
import {ContainerSingle,Button,H5,I,Span} from '../../atomics'
import {Grid,Paper,TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import Swal from 'sweetalert2'
import './style.css'

class AddStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            errorEmail: false,
            errorName: false,
            helperTextEmail: ' ',
            helperTextName: ' ',
            name: '',
            username: '',
            email: '',
            address: '',
         }
        this.handleCancelAdd = () => {
            const { name , username , email , address } = this.state
            if (name !== '' || username !== '' || email !== '' || address !== '') {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "Are you sure to leave this changes ?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.props.history.push('/staff')
                    }
                })   
            } else this.props.history.push('/staff')
        }
        this.handleSetValue = (event) => {
            this.setState({ 
                [event.target.name]: event.target.value,
            },() => this.handleCheckErrorPatern(event.target.name));
        };
        this.handleCheckErrorPatern = name => {
            if (name === 'email') {
                let emailPattern = /[\w-]+@([\w-]+\.)+[\w-]{0,}$/;
                let validationEmail = emailPattern.test(this.state.email)

                if (!validationEmail && this.state.email !== '') {
                    this.setState({
                        errorEmail: true,
                        helperTextEmail: 'email must include @ and .'
                    })
                } else {
                    this.setState({
                        errorEmail: false,
                        helperTextEmail: ' '
                    })
                }
            } else if (name === 'name') {
                let namePattern = /^[a-zA-Z\s]*$/;
                let validationName = namePattern.test(this.state.name)

                if (!validationName && this.state.name !== '') {
                    this.setState({
                        errorName: true,
                        helperTextName: 'unable input number character or special character'
                    })
                } else {
                    this.setState({
                        errorName: false,
                        helperTextName: ' '
                    })
                }
            }
        }
        this.handleFetchingCreateUserAPI = () => {
            const {errorEmail , errorName} = this.state
            const {name,username,address,email} = this.state

            if (
                errorEmail === true ||
                errorName === true ||
                name === '' ||
                username === '' ||
                address === '' ||
                email === '') {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please check your form',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            } else {
                //method to request API
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        namaUser: '' + name +'',
                        email: '' + email + '',
                        username: '' + username + '',
                        password: 'User1234',
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
                                    text: result.errors[0].defaultMessage,
                                    icon: 'error',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                            } else if (result.errorMessage) {
                                //salah satu error nya adalah ketika database mati
                                Swal.fire({
                                    title: 'Error!',
                                    text: result.errorMessage,
                                    icon: 'error',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                            } else {
                                Swal.fire({
                                    title: 'Success!',
                                    text: 'Success Added '+name+'',
                                    icon: 'success',
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
                            }
                        },
                        // Note: it's important to handle errors here
                        // instead of a catch() block so that we don't swallow
                        // exceptions from actual bugs in components.
                        (error) => {
                            //ini error untuk back-end down atau mati
                            Swal.fire({
                                title: 'Error!',
                                text: 'Internal Server Error',
                                icon: 'error',
                                timerProgressBar: false,
                                showConfirmButton: true,
                            })
                        }
                    )
                    .then(
                        this.setState({
                            name: '',
                            username: '',
                            email: '',
                            address: ''
                        })
                    )
            }
        }
    }
    render() {
        if (this.props.isLogin === false) {
            return this.props.history.push('')
        }

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
            height: '50vh',
            width: 380,
            margin: '0px auto',
            borderRadius: '2vh'
        } 
        return ( 
            <ContainerSingle className="container-add">
                <ContainerSingle className="judul-container-add">
                    <H5>Input New Staff</H5>
                </ContainerSingle>
                <ContainerSingle className="container-add-left mbt-content">
                    <Grid>
                        <Paper elevation={0} style={paperStyle}>
                            <form className={useStyles.root} noValidate autoComplete="off">
                                <TextField
                                    error={this.state.errorName === true}
                                    style={inputStyle}
                                    label="Full Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    required
                                    helperText={this.state.helperTextName}
                                />
                                <TextField
                                    style={inputStyle} 
                                    label="Username"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    required
                                    helperText=" "
                                />
                                <TextField
                                    error={this.state.errorEmail === true}
                                    style={inputStyle} 
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    required
                                    helperText={this.state.helperTextEmail}
                                />
                                <TextField
                                    id="standard-multiline-static"
                                    label="Address"
                                    multiline
                                    fullWidth
                                    required
                                    name="address"
                                    value={this.state.address}
                                    onChange={this.handleSetValue}
                                    rows={4}
                                    helperText=" "
                                />
                            </form>
                            <ContainerSingle className="tombol-control">
                                <Button className="btn btn-success btn-float i-float" onClick={() => this.handleFetchingCreateUserAPI()}>
                                    <Span><I className="fa fa-cloud fa-icon" aria-hidden="true"></I></Span>
                                    Save Changes
                                </Button>
                                <Button className="btn btn-danger btn-float" onClick={() => this.handleCancelAdd()}>
                                    <Span><I className="fa fa-times fa-icon" aria-hidden="true"></I></Span>
                                    Cancel
                                </Button>
                            </ContainerSingle>
                        </Paper>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="container-add-right">
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
 
export default connect(mapStateToProps , mapDispatchToProps)(AddStaff);