import React, { Fragment, Component, useState } from "react";
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
            chooseDate: null
         }
        this.handleDateChange = (date) => {
            this.setState({
                chooseDate: new Date(date)
            })
        }
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
            height: '15vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh',
            backgroundColor: '#ede6e6',
            border: '1px solid black'
        }
        const paperDateStyle = {
            padding: 8,
            textAlign: 'center',
            height: '8vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh 1vh 0 0',
            backgroundColor: '#fcb134',
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
                                            format="MM-dd-yyyy"
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
                                    Ini isi
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulOutStyle}>
                                    Parking Out
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Ini isi
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Member Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Ini isi
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Ticket Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Rp. 1.500.000,-
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Total Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    Ini isi
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    {/* <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={useStyles.paper}>
                                xs=12
                            </Paper>
                        </Grid>
                    </Grid> */}
                </ContainerSingle>
                {/* <ContainerSingle className="div-atas">
                    <ContainerSingle className="div-atas-1">
                        <ContainerSingle className="judul-div-atas-1 judul-item">
                            Amount Paid
                        </ContainerSingle>
                        <ContainerSingle className="content-div-atas-1 content-item">
                            Rp. 12.000.000,-
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="div-atas-2">
                        <ContainerSingle className="judul-div-atas-2 judul-item">
                            Report Date
                        </ContainerSingle>
                        <ContainerSingle className="content-div-atas-2 content-item">
                            2021/03/01
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="div-bawah">
                    <ContainerSingle className="div-bawah-1">
                        <ContainerSingle className="judul-div-bawah-1 judul-item">
                            Parking-IN
                        </ContainerSingle>
                        <ContainerSingle className="content-div-bawah-1 content-item">
                            25
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="div-bawah-2">
                        <ContainerSingle className="judul-div-bawah-2 judul-item">
                            Parking-OUT
                        </ContainerSingle>
                        <ContainerSingle className="content-div-bawah-2 content-item">
                            24
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle> */}
            </ContainerSingle>
         );
    }
}
 
export default DashBoardAdmin;