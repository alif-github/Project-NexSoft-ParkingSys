import React, { Component } from 'react';
import {Button,ContainerSingle,H5,I,Span} from '../../atomics'
import {Grid,Paper,TextField,FormControl,MenuItem,InputLabel,Select} from '@material-ui/core'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import './style.css'

class UpdateStaff extends Component {
    constructor(props) {
        super(props);
        const {idUser, namaUser, username, email, alamat, status, password, tglRegister, idPosisi} = this.props.staff
        this.state = { 
            errorEmail: false,
            errorName: false,
            helperTextEmail: ' ',
            helperTextName: ' ',
            idUser: idUser,
            namaUser: namaUser,
            username: username,
            email: email,
            address: alamat,
            status: status,
            password: password,
            tglRegister: tglRegister,
            idPosisi: idPosisi
        }
        this.handleCancelAdd = () => {
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
        }
        this.handleSetValue = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            },() => this.handleCheckErrorPatern(event.target.name))
        }
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
            } else if (name === 'namaUser') {
                let namePattern = /^[a-zA-Z\s]*$/;
                let validationName = namePattern.test(this.state.namaUser)

                if (!validationName && this.state.namaUser !== '') {
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
        this.handleFetchingUpdateUserAPI = () => {
            const {errorEmail , errorName} = this.state
            const {idUser, namaUser, username, email, address, status, password, tglRegister, idPosisi} = this.state
            if (
                errorEmail === true ||
                errorName === true ||
                namaUser === '' ||
                username === '' ||
                address === '' ||
                email === '')  {
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
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        idUser: '' + idUser + '',
                        namaUser: '' + namaUser + '',
                        email: '' + email + '',
                        username: '' + username + '',
                        password: '' + password + '',
                        alamat: '' + address + '',
                        status: '' + status + '',
                        tglRegister: '' + tglRegister + '',
                        idPosisi: '' + idPosisi + ''
                    })
                };
                //fetching data to url API Back-End
                fetch("http://localhost:8080/parkir/user/update/?id="+idUser+"", requestOptions)
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
                                    timerProgressBar: false,
                                    showConfirmButton: true,
                                })
                            } else {
                                if (this.state.idUser === this.props.user.idUser) {
                                    let logout = setTimeout(() => this.handleLogout(), 2000);
                                    Swal.fire({
                                        title: 'Success!',
                                        text: result.successMessage,
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        showConfirmButton: false,
                                    })
                                    .then(logout)
                                } else {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: result.successMessage,
                                        icon: 'success',
                                        timer: 2000,
                                        timerProgressBar: true,
                                        showConfirmButton: false,
                                    })
                                }
                            }
                        },
                        (error) => {
                            Swal.fire({
                                title: 'Error!',
                                text: error,
                                icon: 'error',
                                timerProgressBar: false,
                                showConfirmButton: true,
                            })
                        }
                    )
            }
        }
        this.handleLogout = () => {
            this.props.changeStatusLogout();
            this.props.history.push("/");
        }
    }
    render() { 
        console.log("id user update:",this.state.idUser)
        console.log("id user aktif:", this.props.user.idUser)
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
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));
        const paperStyle = {
            padding: 20,
            height: '66vh',
            width: 500,
            margin: '0px auto',
            borderRadius: '2vh'
        }
        const inputStyle = {
            marginTop: '5px',
            marginBottom: '5px'
        }
        return ( 
            <ContainerSingle className="container-add">
                <ContainerSingle className="judul-container-add">
                    <H5>Update Staff</H5>
                </ContainerSingle>
                <ContainerSingle className="container-add-leftt mbt-content">
                    <Grid>
                        <Paper elevation={2} style={paperStyle}>
                            <form className={useStyles.root} noValidate autoComplete="off">
                                <TextField
                                    style={inputStyle} 
                                    label="ID"
                                    name="idUser"
                                    defaultValue={this.state.idUser}
                                    fullWidth
                                    disabled
                                    helperText=" "
                                />
                                <TextField
                                    error={this.state.errorName === true}
                                    style={inputStyle} 
                                    label="Update Name"
                                    name="namaUser"
                                    defaultValue={this.state.namaUser}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    helperText={this.state.helperTextName}
                                />
                                <TextField
                                    style={inputStyle} 
                                    label="Update Username"
                                    name="username"
                                    defaultValue={this.state.username}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    helperText=" "
                                />
                                <TextField
                                    error={this.state.errorEmail === true}
                                    style={inputStyle} 
                                    label="Update E-mail"
                                    name="email"
                                    defaultValue={this.state.email}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    helperText={this.state.helperTextEmail}
                                />
                            </form>
                        </Paper>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="container-add-rightt">
                    <Grid>
                        <Paper elevation={2} style={paperStyle}>
                            <form className={useStyles.root} noValidate autoComplete="off">
                                <TextField
                                    id="standard-multiline-static"
                                    label="Address"
                                    multiline
                                    fullWidth
                                    name="address"
                                    defaultValue={this.state.address}
                                    onChange={this.handleSetValue}
                                    rows={4}
                                    helperText=" "
                                />
                            </form>
                            {
                                this.props.user.idUser !== this.state.idUser &&
                                <FormControl fullWidth className={useStyles.formControl}>
                                    <InputLabel id="demo-simple-select-label">Update status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="status"
                                        defaultValue={this.state.status}
                                        onChange={this.handleSetValue}
                                        >
                                        <MenuItem value={true}>Active</MenuItem>
                                        <MenuItem value={false}>Non-Active</MenuItem>
                                    </Select>
                                </FormControl>
                            }
                            <ContainerSingle className="control-2">
                                <Button className="btn btn-success btn-float i-float" onClick={() => this.handleFetchingUpdateUserAPI()}>
                                    <Span><I className="fa fa-cloud fa-icon" aria-hidden="true"></I></Span>
                                    Save Update
                                </Button>
                                <Button className="btn btn-danger btn-float" onClick={() => this.handleCancelAdd()}>
                                    <Span><I className="fa fa-times fa-icon" aria-hidden="true"></I></Span>
                                    Cancel
                                </Button>
                            </ContainerSingle>
                        </Paper>
                    </Grid>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    user: state.auth.user,
    staff: state.staffColReducer.staff
})

const mapDispatchToProps = dispatch => {
    return {
        changeStatusLogout: () => dispatch({ type: 'LOGOUT_SUCCESS' })
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(UpdateStaff);