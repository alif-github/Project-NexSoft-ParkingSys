import React, { Component } from 'react';
import { ContainerSingle, Button } from '../../atomics';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Paper,
    TextField,
} from '@material-ui/core'
import { connect } from "react-redux"
import Swal from 'sweetalert2'
import DashboardTransaction from '../../moleculs/dashboard-today-staff'
import './style.css';

class DashBoardStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            memberId: "",
            isMember: 0,
            id: "",
            noPol: "",
            staffGate: this.props.user.idUser
         }
        this.handleSetValueParkingIn = (event) => {
            this.setState({ 
                ...this.state, 
                [event.target.name]: event.target.value,
                isMember: 1
            });
        };
        this.handleSetValue = (event) => {
            this.setState({
                ...this.state,
                [event.target.name]: event.target.value
            })
        };
        this.handleFetchingDataParkirMasuk = () => {
            const {memberId , isMember, staffGate} = this.state

            if (isMember === 0) {
                this.props.history.push("/reguler-in")
            } else {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: ''+memberId+'',
                        namaStaff: ''+staffGate+''
                    })
                };
                fetch("http://localhost:8080/ticket/parking-in/?isMember="+isMember+"", requestOptions)
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
                                })
                                this.props.toogleStatusOn()
                            }
                        })
                        .then(
                            this.setState({
                                isMustRefresh: 1,
                                memberId: "",
                                isMember: 0,
                                staffGate: this.props.user.idUser
                            })
                        )
            }
        }
        this.handleParkirKeluar = () => {
            const {id , noPol} = this.state
            if (id.length === 10) {
                this.props.history.push("/reguler-out/"+id+"")
            } else if (noPol !== "") {
                this.props.history.push("/reguler-out-penalty/"+noPol+"")
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'ID Ticket must 10 character!',
                    icon: 'error',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
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
        }));
        const paperStyle = {
            padding: 10,
            height: '30vh',
            width: '100%',
            margin: '0 auto',
            borderRadius: '1vh',
            backgroundColor: '#ede6e6',
            border: '1px solid #fcb134'
        }
        const paperStyle2 = {
            padding: 10,
            height: '38vh',
            width: '100%',
            margin: '0 auto',
            borderRadius: '1vh',
            backgroundColor: '#ede6e6',
            border: '1px solid #fcb134'
        }
        const gridJudulInStyle = {
            backgroundColor: 'green',
            borderRadius: '1vh 1vh 0 0',
            marginBottom: '10px',
            color: 'white',
            textAlign: 'center',
            padding: 5
        }
        const gridJudulOutStyle = {
            backgroundColor: 'red',
            borderRadius: '1vh 1vh 0 0',
            marginBottom: '10px',
            color: 'white',
            textAlign: 'center',
            padding: 5
        }
        const gridIsiStyle = {
            textAlign: 'center'
        }
        const inputStyle = {
            marginTop: '5px',
            marginBottom: '5px'
        }
        return ( 
            <ContainerSingle className="container-staff">
                <ContainerSingle className="content-item">
                    PARKING CONTROL
                </ContainerSingle>
                <ContainerSingle className="content-dashboard-staff">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulInStyle}>
                                    Parking In
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <form className={useStyles.root} noValidate autoComplete="off">
                                        <TextField
                                            style={inputStyle}
                                            label="Member ID"
                                            name="memberId"
                                            value={this.state.memberId}
                                            onChange={this.handleSetValueParkingIn}
                                            fullWidth
                                            helperText="if Member, you must fill in the input form"
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <center>
                                        <Button className="btn btn-success btn-edit" onClick={() => this.handleFetchingDataParkirMasuk()}>
                                            {
                                                this.state.memberId === "" ? "Generate Ticket" : "Member In"
                                            }
                                        </Button>
                                    </center>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperStyle2}>
                                <Grid item xs={12} style={gridJudulOutStyle}>
                                    Parking Out
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <form className={useStyles.root} noValidate autoComplete="off">
                                        <TextField
                                            style={inputStyle}
                                            label="Input Ticket ID"
                                            name="id"
                                            value={this.state.id}
                                            onChange={this.handleSetValue}
                                            fullWidth
                                        />
                                        <TextField
                                            style={inputStyle}
                                            label="Input No.Police"
                                            name="noPol"
                                            value={this.state.noPol}
                                            onChange={this.handleSetValue}
                                            fullWidth
                                            helperText="Optional input"
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <center>
                                        <Button className="btn btn-danger btn-edit" onClick={() => this.handleParkirKeluar()}>
                                            Parking Out
                                        </Button>
                                    </center>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="content-dashboard-right-staff">
                    <DashboardTransaction />
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    tooglestatus: state.tooglestatus.toogleUpdate
})

const mapDispatchToProps = dispatch => {
    return {
        toogleStatusOn: () => dispatch({ type: 'TOOGLE_ON'})
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(DashBoardStaff);