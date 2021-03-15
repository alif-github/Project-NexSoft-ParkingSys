import React, { Component } from 'react';
import {
    ContainerSingle,
    Button,
    H5,
    I,
    Span,
    Image, } from '../../atomics'
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

class AddMember extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            noPol: '',
            createdBy: this.props.userOn,
            type: '1',
            errorName: false,
            helperTextName: ' ',
            errorNoPol: false,
            helperTextNoPol: ' '
         }
        this.handleCancelAdd = () => {
            const { name , noPol , createdBy , type } = this.state
            if (name !== '' || noPol !== '') {
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
            } else this.props.history.push('/member')
        }
        this.handleSetValue = (event) => {
            this.setState({ 
                ...this.state, 
                [event.target.name]: event.target.value,
            },() => this.handleCheckErrorPatern(event.target.name));
        };
        this.handleCheckErrorPatern = name => {
            if (name === 'noPol') {
                let noPolPattern = /^([A-Z]{1,2})(\s|-)*([1-9][0-9]{0,3})(\s|-)*([A-Z]{0,3}|[1-9][0-9]{1,2})$/;
                let validationNoPol = noPolPattern.test(this.state.noPol)

                if (!validationNoPol && this.state.noPol !== '') {
                    this.setState({
                        ...this.state,
                        errorNoPol: true,
                        helperTextNoPol: 'unable because wrong format, ex: B 8888 ABC'
                    })
                } else {
                    this.setState({
                        ...this.state,
                        errorNoPol: false,
                        helperTextNoPol: ' '
                    })
                }
            } else if (name === 'name') {
                let namePattern = /^[a-zA-Z\s\.]*$/;
                let validationName = namePattern.test(this.state.name)

                if (!validationName && this.state.name !== '') {
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
            }
        }
        this.handleFetchingCreateUserAPI = () => {
            const {errorNoPol , errorName} = this.state
            const { name , noPol , createdBy , type } = this.state

            if (
                errorNoPol === true ||
                errorName === true ||
                name === '' ||
                noPol === '' ||
                createdBy === '' ||
                type === '') {
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
                        namaMember:''+name+'',
                        noPol:''+noPol+'',
                        idJenis:''+parseInt(type)+'',
                        dibuatOleh:''+createdBy+''
                    })
                };
                //fetching data to url API Back-End
                fetch("http://localhost:8080/member/create-member/", requestOptions)
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
                            // this.props.history.push('/500-internal-server-error')
                        }
                    )
                    .then(
                        this.setState({
                            name: '',
                            noPol: '',
                            type: '1'
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
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120
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
            borderRadius: '1vh'
        } 
        return ( 
            <ContainerSingle className="container-add">
                <ContainerSingle className="judul-container-add">
                    <H5>Input New Member</H5>
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
                                    error={this.state.errorNoPol === true}
                                    style={inputStyle}
                                    label="Police Number"
                                    name="noPol"
                                    value={this.state.noPol}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    required
                                    helperText={this.state.helperTextNoPol}
                                />
                                <TextField
                                    style={inputStyle} 
                                    label="Created By"
                                    name="createdBy"
                                    value={this.state.createdBy}
                                    onChange={this.handleSetValue}
                                    disabled
                                    fullWidth
                                    required
                                    helperText=" "
                                />
                                <FormControl fullWidth className={useStyles.formControl}>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="status"
                                        defaultValue={this.state.type}
                                        onChange={this.handleSetValue}
                                        required
                                        helperText=" "
                                        >
                                        <MenuItem value='1'>Motorcycle</MenuItem>
                                        <MenuItem value='2'>Car</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                            <ContainerSingle className="tombol-control-1">
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
                <ContainerSingle className="container-add-right-member">
                    <ContainerSingle>
                        <center>
                            <Image className="photos-right" src="https://seekvectorlogo.com/wp-content/uploads/2018/03/secure-parking-vector-logo.png"/>
                        </center>
                    </ContainerSingle>
                    <ContainerSingle className="lorem-ipsum">
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
                        making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 
                        consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    userOn: state.auth.user.namaUser
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(AddMember);