import React, { Component } from 'react';
import { ContainerSingle, Image } from '../../atomics';
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2'
import {
    H5, I, Span, Button} from '../../atomics/index'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Paper,
    TextField, } from '@material-ui/core'
import './style.css';

class ParkingOutPenalty extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            noPol:"",
            idData:"",
            idJenis: 1,
            data: {},
            biayaParkir: 'Free'
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
        this.handleFetchingDataParkirKeluar = () => {
            const {noPol} = this.state
            
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            };
            //fetching data to url API Back-End
            fetch("http://localhost:8080/ticket/parkir-out/?id=&noPol="+noPol+"", requestOptions)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (result.errorMessage) {
                            Swal.fire({
                                title: 'Error!',
                                text: result.errorMessage,
                                icon: 'error',
                                timer: 2000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            })
                        } else if (result.error === 'Internal Server Error') {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Cannot find this Id ticket',
                                icon: 'error',
                                timer: 2000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            })
                        } else {
                            this.setState({
                                idData: result.idData
                            },() => this.handleGetDataAfterExit())
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Cannot find this Id ticket',
                            icon: 'error',
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                    }
                )
        }
        this.handleGetDataAfterExit = () => {
            const {idData} = this.state
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/ticket/read-ticket/?idData="+idData+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (result.data.length > 0) {
                            this.setState({
                                data: result.data[0]
                            },() => this.handleCalculateParkingFee())
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {}
                )
        }
        this.handleCalculateParkingFee = () => {
            const {data} = this.state
            let tglJamMasukTemp = new Date(data.tglJamMasuk);
            let tglJamKeluarTemp = new Date(data.tglJamKeluar);
            let secondsTglJamMasukTemp = tglJamMasukTemp.getTime() / 1000;
            let secondsTglJamKeluarTemp = tglJamKeluarTemp.getTime() / 1000;
            let selisihDetik = secondsTglJamKeluarTemp - secondsTglJamMasukTemp;
            let settingToHours = selisihDetik/3600;
            
            if (settingToHours < 1) {
                let settingToMinute = settingToHours * 60;
                if (settingToMinute <= 5) {
                    //ini gratis
                    this.setState({
                        biayaParkir: 0
                    },() => this.handleUpdateBiayaParkirNormal())
                } else {
                    //ini bayar yang awal banget
                    let biaya = data.jenisKendaraan[0].firstValue
                    this.setState({
                        biayaParkir: ""+biaya+""
                    },() => this.handleUpdateBiayaParkirNormal())
                }
            } else {
                let settingToHoursMathCeil = Math.ceil(settingToHours) - 1;
                this.setState({
                    biayaParkir: (settingToHoursMathCeil * data.jenisKendaraan[0].value) + (1 * data.jenisKendaraan[0].firstValue)
                },() => this.handleUpdateBiayaParkirNormal())            
            }
        }
        this.handleUpdateBiayaParkirNormal = () => {
            const {biayaParkir, idData} = this.state
            //method to request API
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    biayaParkir: parseInt(biayaParkir)
                })
            };
            //fetching data to url API Back-End
            fetch("http://localhost:8080/ticket/update/?idData="+idData+"", requestOptions)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (result.errorMessage) {
                            Swal.fire({
                                title: 'Error!',
                                text: result.errorMessage,
                                icon: 'error',
                                timer: 2000,
                                timerProgressBar: true,
                                showConfirmButton: false,
                            })
                        } else if (result.successMessage) {
                            this.handleInfoPaymentBill()
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Server Not Connect',
                            icon: 'error',
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                        })
                    }
                )
        }
        this.handleInfoPaymentBill = () => {
            const {idData} = this.state
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/ticket/read-ticket/?idData="+idData+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (result.data.length > 0) {
                            this.setState({
                                data: result.data[0]
                            })
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {}
                )
        }
    }
    componentDidMount() {
        let noPol = this.props.match.params.noPol
        this.setState({
            noPol: noPol
        })
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
            height: '64vh',
            width: '90%',
            margin: 'auto',
            borderRadius: '1vh'
        } 
        const paperTotalStyle = {
            padding: 13,
            height: '38vh',
            width: '90%',
            margin: 'auto',
            borderRadius: '1vh'
        } 
        const paperTotalShowStyle = {
            padding: 13,
            height: '22vh',
            width: '90%',
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
            <ContainerSingle className="container-reguler">
                <ContainerSingle className="container-reguler-exit1">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={10} style={paperStyle}>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <form className={useStyles.root} noValidate autoComplete="off">
                                        <ContainerSingle className="container-member-png">
                                            <Image className="penaltyPng" src="https://uxwing.com/wp-content/themes/uxwing/download/16-business-and-finance/penalty.png" alt="fined"/>
                                        </ContainerSingle>
                                    </form>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="container-reguler-exit2">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={10} style={paperTotalStyle}>
                                <Grid item xs={12} style={judulProfileStyle}>
                                    <H5>
                                        Parking Out With Penalty
                                    </H5>
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <form className={useStyles.root} noValidate autoComplete="off">
                                        <TextField
                                            style={inputStyle}
                                            label="Input No.Police"
                                            name="noPol"
                                            value={this.state.noPol}
                                            onChange={this.handleSetValue}
                                            fullWidth
                                        />
                                        <ContainerSingle className="control-2">
                                            <Button className="btn btn-success btn-float i-float" onClick={() => this.handleFetchingDataParkirKeluar()}>
                                                <Span><I className="fa fa-cloud fa-icon" aria-hidden="true"></I></Span>
                                                Show Penalty
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
                        <Grid item xs={12}>
                            <Paper elevation={10} style={paperTotalShowStyle}>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <table class="table">
                                        <tbody>
                                            <tr>
                                                <th className="column-payment" scope="row">Parking Payment</th>
                                                <td className="column-payment">
                                                    {
                                                        this.state.data.biayaParkir
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <th className="column-payment" scope="row">Fine Payment</th>
                                                <td className="column-payment">
                                                    {
                                                        this.state.data.denda && this.state.data.denda[0].jumlahDenda
                                                    }
                                                </td>
                                            </tr>
                                            <tr className="table-dark">
                                                <th className="column-payment" scope="row">Total Payment</th>
                                                <td className="column-payment">
                                                    {
                                                        this.state.data.nominal
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default withRouter(ParkingOutPenalty);