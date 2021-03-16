import React, { Component } from 'react';
import {
    Button,
    ContainerSingle,
    H5,
    I,
    Span} from '../../atomics'
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux"
import './style.css'

class UpdateMember extends Component {
    constructor(props) {
        super(props);
        const {idMember, namaMember, noPol, idJenis, status, dieditOleh} = this.props.member
        this.state = { 
            errorNoPol: false,
            helperTextNoPol: ' ',
            errorName: false,
            helperTextName: ' ',
            errorNameEdit: false,
            helperTextNameEdit: ' ',
            idMember: idMember,
            namaMember: namaMember,
            noPol: noPol,
            idJenis: idJenis,
            status: status,
            dieditOleh: this.props.user.namaUser
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
                    this.props.history.push('/member')
                }
              })
        }
        this.handleSetValue = (event) => {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value
            },() => this.handleCheckErrorPatern(event.target.name))
        }
        this.handleCheckErrorPatern = name => {
            if (name === 'noPol') {
                let noPolPattern = /^([A-Z]{1,2})(\s|-)*([1-9][0-9]{0,3})(\s|-)*([A-Z]{0,3}|[1-9][0-9]{1,2})$/;
                let validationNoPol = noPolPattern.test(this.state.noPol)

                if (!validationNoPol && this.state.noPol !== '') {
                    this.setState({
                        ...this.state,
                        errorNoPol: true,
                        helperTextNoPol: 'Unable because it is not Indonesian Police Number format'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorNoPol: false,
                        helperTextNoPol: ' '
                    })
                }
            } else if (name === 'namaMember') {
                let namePattern = /^[a-zA-Z\s\.]*$/;
                let validationName = namePattern.test(this.state.namaMember)

                if (!validationName && this.state.namaMember !== '') {
                    this.setState({
                        ...this.state,
                        errorName: true,
                        helperTextName: 'unable input number character or special character'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorName: false,
                        helperTextName: ' '
                    })
                }
            } else if (name === 'dieditOleh') {
                let namePattern = /^[a-zA-Z\s\.]*$/;
                let validationName = namePattern.test(this.state.dieditOleh)

                if (!validationName && this.state.dieditOleh !== '') {
                    this.setState({
                        ...this.state,
                        errorNameEdit: true,
                        helperTextNameEdit: 'unable input number character or special character'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorNameEdit: false,
                        helperTextNameEdit: ' '
                    })
                }
            }
        }
        this.handleFetchingUpdateMemberAPI = () => {
            const {errorNameEdit , errorName, errorNoPol} = this.state
            const {idMember, namaMember, noPol, idJenis, status, dieditOleh} = this.state
            if (
                errorNameEdit === true ||
                errorName === true ||
                errorNoPol === true ||
                idMember === '' ||
                namaMember === '' ||
                noPol === '' ||
                idJenis === '' ||
                dieditOleh === '' ||
                status === '')  {
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
                        namaMember: '' + namaMember + '',
                        noPol: '' + noPol + '',
                        idJenis: idJenis,
                        status: status,
                        dieditOleh: '' + dieditOleh + ''
                    })
                };
                //fetching data to url API Back-End
                fetch("http://localhost:8080/member/update/?id="+idMember+"", requestOptions)
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
        console.log("nama staff:", this.props.user.namaUser);
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
                    <H5>Update Member</H5>
                </ContainerSingle>
                <ContainerSingle className="container-add-leftt mbt-content">
                    <Grid>
                        <Paper elevation={2} style={paperStyle}>
                            <form className={useStyles.root} noValidate autoComplete="off">
                                <TextField
                                    style={inputStyle} 
                                    label="ID"
                                    name="idMember"
                                    defaultValue={this.state.idMember}
                                    fullWidth
                                    disabled
                                    helperText=" "
                                />
                                <TextField
                                    error={this.state.errorName === true}
                                    style={inputStyle} 
                                    label="Update Name"
                                    name="namaMember"
                                    defaultValue={this.state.namaMember}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    helperText={this.state.helperTextName}
                                />
                                <TextField
                                    error={this.state.errorNoPol === true}
                                    style={inputStyle} 
                                    label="Update No. Police"
                                    name="noPol"
                                    defaultValue={this.state.noPol}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    helperText={this.state.helperTextNoPol}
                                />
                                <TextField
                                    style={inputStyle} 
                                    label="Edited By"
                                    name="dieditOleh"
                                    defaultValue={this.state.dieditOleh}
                                    fullWidth
                                    disabled
                                    helperText=" "
                                />
                            </form>
                            <FormControl fullWidth className={useStyles.formControl}>
                                <InputLabel>Update status</InputLabel>
                                <Select
                                    name="status"
                                    defaultValue={this.state.status}
                                    onChange={this.handleSetValue}
                                    >
                                    <MenuItem value={true}>Active</MenuItem>
                                    <MenuItem value={false}>Non-Active</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="container-add-rightt">
                    <Grid>
                        <Paper elevation={2} style={paperStyle}>
                            <FormControl fullWidth className={useStyles.formControl}>
                                <InputLabel>Update Type </InputLabel>
                                <Select
                                    name="idJenis"
                                    defaultValue={this.state.idJenis}
                                    onChange={this.handleSetValue}
                                    >
                                    <MenuItem value={1}>Motorcycle</MenuItem>
                                    <MenuItem value={2}>Car</MenuItem>
                                </Select>
                            </FormControl>
                            <ContainerSingle className="control-2">
                                <Button className="btn btn-success btn-float i-float" onClick={() => this.handleFetchingUpdateMemberAPI()}>
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
    member: state.memberColReducer.member
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(UpdateMember);