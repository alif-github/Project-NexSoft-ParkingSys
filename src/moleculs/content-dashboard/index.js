import React, { Component } from "react";
import {ContainerSingle} from '../../atomics'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns' 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import './style.css'

class DashBoardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseDate: null,
            parkingIn: 240,
            parkingOut: 238,
            incomeMemberReal: 0,
            incomeTicketReal: 1500000,
         }
        this.handleDateChange = (date) => {
            let current_datetime = new Date(date)
            let yearTwoDigit = current_datetime.getFullYear().toString().substr(2,2);
            let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
            let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
            let formatted_date = monthTwoDigit + "-" + dateTwoDigit + "-" + yearTwoDigit
            this.setState({
                chooseDate: formatted_date
            },() => this.refreshIncomeMember())
        }
        this.totalIncome = nilaiUang => {
            var bilangan = nilaiUang;

            var	number_string = ''+bilangan+'',
                sisa 	= number_string.length % 3,
                rupiah 	= number_string.substr(0, sisa),
                ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
                    
            if (ribuan) {
                var separator = sisa ? '.' : '';
                rupiah += separator + ribuan.join('.');
            }
            return rupiah;
        }
        this.refreshIncomeMember = () => {
            const {chooseDate} = this.state
            console.log(chooseDate)
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/member/income/?tglRegister="+chooseDate+"&dibuatOleh=",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        console.log("uji hasil sum:",result.income)
                        this.setState({
                        incomeMemberReal: result.income
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {}
                )
        }
    }

    componentDidMount() {
        let current_datetime = new Date()
        let yearTwoDigit = current_datetime.getFullYear().toString().substr(2,2);
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = monthTwoDigit + "-" + dateTwoDigit + "-" + yearTwoDigit
        console.log("uji tanggal:",formatted_date) //03-16-21
        //method to request API
        const requestOptionsPage = {
            method: 'GET'
        };
        fetch("http://localhost:8080/member/income/?tglRegister="+formatted_date+"&dibuatOleh=",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    this.setState({
                    incomeMemberReal: result.income
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {}
            )
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
              flexGrow: 1,
              color: theme.status.danger
            },
            paper: {
              padding: theme.spacing(2),
              textAlign: 'center',
              color: theme.palette.text.secondary,
            },
        }));
        const paperStyle = {
            padding: 10,
            height: '13vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh',
            backgroundColor: '#ede6e6',
            border: '1px solid #fcb134'
        }
        const paperDateStyle = {
            padding: 15,
            textAlign: 'center',
            height: '11vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh 1vh 0 0',
            backgroundColor: '#fcb134',
            border: '1px solid #fcb134'
        } 
        const paperTitleStyle = {
            padding: 2,
            textAlign: 'center',
            height: '5vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh 1vh 0 0',
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid #fcb134'
        } 
        const gridJudulStyle = {
            backgroundColor: '#fcb134',
            borderRadius: '1vh 1vh 0 0',
            marginBottom: '10px',
            color: 'black',
            textAlign: 'center',
            padding: 5
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
        const theme = createMuiTheme({
            status: {
              danger: 'red',
            },
          });

        return ( 
            <ContainerSingle className="background-content-dashboard-adm">
                <ContainerSingle className="content-item">
                    DASHBOARD ADMIN
                </ContainerSingle>
                <ContainerSingle className="content-dashboard">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperTitleStyle}>
                                Data Monitoring
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperDateStyle}>
                                <ThemeProvider theme={theme}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            className={useStyles.root}
                                            clearable
                                            value={this.state.chooseDate}
                                            placeholder='Pick date for filtering'
                                            onChange={date => this.handleDateChange(date)}
                                            maxDate={new Date()}
                                            minDate={new Date("03-16-2021")}
                                            format="MM-dd-yy"
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulInStyle}>
                                    Parking In
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    {this.state.parkingIn}
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulOutStyle}>
                                    Parking Out
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    {this.state.parkingOut}
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Member Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Rp. {this.totalIncome(this.state.incomeMemberReal)},-
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Ticket Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Rp. {this.totalIncome(this.state.incomeTicketReal)},-
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Total income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Rp. {
                                        this.totalIncome(this.state.incomeMemberReal+this.state.incomeTicketReal)
                                    },-
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="content-dashboard-right">
                    
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default DashBoardAdmin;