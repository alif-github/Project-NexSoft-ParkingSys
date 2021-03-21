import React, { Component } from 'react';
import { connect } from "react-redux"
import Swal from 'sweetalert2'
import {
    H5, 
    I, 
    Span, 
    Button, 
    ContainerSingle } from '../../atomics/index'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Paper,
    TextField,
    FormControl,
    MenuItem,
    Select,
    InputLabel } from '@material-ui/core'
import './style.css';

class ParkingInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorNoPol: false,
            helperTextNoPol: ' ',
            noPol: '',
            idJenis: 1,
            staffGate: this.props.user.idUser
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
                    this.props.history.push('')
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
            }
        }
        this.handleFetchingDataParkirMasuk = () => {
            const {noPol, idJenis, errorNoPol, staffGate} = this.state

            if (errorNoPol === true || noPol === '' || idJenis === '' ) {
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
                        id: '',
                        noPol: noPol,
                        idJenis: idJenis,
                        namaStaff: ''+staffGate+''
                    })
                };
                fetch("http://localhost:8080/ticket/parking-in/?isMember=0", requestOptions)
                    .then((response) => {
                        return response.json()
                    })
                    .then((result) => {
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
                            Swal.fire({
                                title: 'Success!',
                                text: '['+result.id+'] '+result.message.successMessage+'',
                                icon: 'success',
                                showConfirmButton: true,
                            },2000)
                            this.props.history.push('')
                        }
                    })
                    .then(
                        this.setState({
                            memberId: "",
                            isMember: 0,
                            staffGate: this.props.user.idUser
                        })
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
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
        }));
        const paperStyle = {
            padding: 13,
            height: '60vh',
            width: '40%',
            margin: 'auto',
            borderRadius: '1vh'
        } 
        const judulProfileStyle = {
            textAlign: 'center',
            backgroundColor: '#fcb134',
            borderRadius: '1vh',
            padding: '1vh',
            marginBottom: '30px'
        } 
        const inputStyle = {
            marginTop: '5px',
            marginBottom: '5px'
        }
        const gridIsiStyle = {
        }
        return ( 
            <ContainerSingle className="container-reguler-exit">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid item xs={12} style={judulProfileStyle}>
                                <H5>
                                    Reguler Parking IN
                                </H5>
                            </Grid>
                            <Grid item xs={12} style={gridIsiStyle}>
                                <form className={useStyles.root} noValidate autoComplete="off">
                                    <TextField
                                    error={this.state.errorNoPol === true}
                                    style={inputStyle} 
                                    label="Input No.Police"
                                    name="noPol"
                                    defaultValue={this.state.noPol}
                                    onChange={this.handleSetValue}
                                    fullWidth
                                    helperText={this.state.helperTextNoPol}
                                    />
                                    <FormControl fullWidth className={useStyles.formControl}>
                                        <InputLabel>Type</InputLabel>
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
                                        <Button className="btn btn-success btn-float i-float" onClick={() => this.handleFetchingDataParkirMasuk()}>
                                            <Span><I className="fa fa-cloud fa-icon" aria-hidden="true"></I></Span>
                                            Next
                                        </Button>
                                        <Button className="btn btn-danger btn-float" onClick={() => this.handleCancelAdd()}>
                                            <Span><I className="fa fa-times fa-icon" aria-hidden="true"></I></Span>
                                            Back
                                        </Button>
                                    </ContainerSingle>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ParkingInForm);