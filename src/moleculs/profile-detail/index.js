import React, { Component } from 'react';
import {
    Grid,
    Paper,
    TextField,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import { connect } from "react-redux"
import { Button, ContainerSingle, H5, I, Span } from '../../atomics';

class ProfileDet extends Component {
    constructor(props) {
        super(props);
        const {idUser, namaUser, username, email, alamat, status, password, tglRegister, idPosisi, posisi} = this.props.profileUser
        this.state = {
            disabled: true, 
            errorEmail: false,
            helperTextEmail: ' ',
            idUser: idUser,
            namaUser: namaUser,
            username: username,
            email: email,
            address: alamat,
            status: status,
            password: password,
            tglRegister: tglRegister,
            idPosisi: idPosisi,
            posisi: posisi
        }
        this.handleOpenDisabled = () => {
            if (this.state.disabled) {
                this.setState({
                    disabled: false
                })
            } else {
                this.setState({
                    disabled: true
                })
            }
        }
        this.handleSetValue = (event) => {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value
            },() => this.handleCheckErrorPatern(event.target.name))
        }
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
            } 
        }
        this.handleFetchingUpdateUserAPI = () => {
            const {errorEmail} = this.state
            const {idUser, namaUser, username, email, address, status, password, tglRegister, idPosisi} = this.state
            if (errorEmail === true) {
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
                                    timer: 2000,
                                    timerProgressBar: true,
                                    showConfirmButton: false,
                                })
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
            padding: 13,
            height: '75vh',
            width: '100%',
            margin: '1px auto',
            borderRadius: '1vh'
        } 
        const judulProfileStyle = {
            textAlign: 'center',
            backgroundColor: '#fcb134',
            borderRadius: '1vh',
            padding: '1vh'
        }
        return ( 
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid item xs={12} style={judulProfileStyle}>
                                <H5>Profile Detail</H5>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
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
                                        style={inputStyle} 
                                        label="Full Name"
                                        name="namaUser"
                                        defaultValue={this.state.namaUser}
                                        disabled={this.state.disabled}
                                        onChange={this.handleSetValue}
                                        fullWidth
                                        helperText=" "
                                    />
                                    <TextField
                                        style={inputStyle} 
                                        label="Username"
                                        name="username"
                                        defaultValue={this.state.username}
                                        disabled={this.state.disabled}
                                        onChange={this.handleSetValue}
                                        fullWidth
                                        helperText=" "
                                    />
                                    <TextField
                                        error={this.state.errorEmail === true}
                                        style={inputStyle} 
                                        label="E-mail"
                                        name="email"
                                        defaultValue={this.state.email}
                                        disabled={this.state.disabled}
                                        onChange={this.handleSetValue}
                                        fullWidth
                                        helperText={this.state.helperTextEmail}
                                    />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Address"
                                        multiline
                                        disabled={this.state.disabled}
                                        onChange={this.handleSetValue}
                                        fullWidth
                                        name="address"
                                        defaultValue={this.state.address}
                                        rows={4}
                                        helperText=" "
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        style={inputStyle} 
                                        label="Registration Date"
                                        name="tglRegister"
                                        defaultValue={this.state.tglRegister}
                                        disabled
                                        fullWidth
                                        helperText=" "
                                    />
                                    <TextField
                                        style={inputStyle} 
                                        label="Position"
                                        name="posisi"
                                        defaultValue={this.state.posisi}
                                        disabled
                                        fullWidth
                                        helperText=" "
                                    />
                                    <TextField
                                        style={inputStyle} 
                                        label="Status"
                                        name="Status"
                                        defaultValue={this.state.status && "Active"}
                                        disabled
                                        fullWidth
                                        helperText=" "
                                    />
                                    <ContainerSingle className="control-2">
                                        <Button className="btn btn-success btn-float i-float" onClick={() => this.handleFetchingUpdateUserAPI()}>
                                            <Span><I className="fa fa-cloud fa-icon" aria-hidden="true"></I></Span>
                                            Update
                                        </Button>
                                        <Button className="btn btn-warning btn-float" onClick={() => this.handleOpenDisabled()}>
                                            <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                            Edit
                                        </Button>
                                        <Button className="btn btn-warning btn-float" onClick={() => this.props.history.push("/profile/change-password")}>
                                            <Span><I className="fa fa-key fa-icon" aria-hidden="true"></I></Span>
                                            Change Password
                                        </Button>
                                        <Button className="btn btn-danger btn-float" onClick={() => this.props.history.push("")}>
                                            <Span><I className="fa fa-backward fa-icon" aria-hidden="true"></I></Span>
                                            Back
                                        </Button>
                                    </ContainerSingle>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    profileUser: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ProfileDet);