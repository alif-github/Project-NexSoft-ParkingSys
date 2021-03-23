import React, { Component } from 'react';
import { connect } from 'react-redux'
import { ContainerSingle, Span } from '../../atomics';
import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns' 
import { Pagination } from '@material-ui/lab'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './style.css'

class DashboardTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error: null,
            isLoaded: false,
            chooseDate: new Date(),
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 4,
            ticketData: [],
            payment: 0,
            in: 0,
            out: 0
         }
        this.handleDateChange = (date) => {
            let current_datetime = new Date(date)
            let year = current_datetime.getFullYear();
            let month = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
            let day = ("0" + current_datetime.getDate()).slice(-2)
            let formatted_date = year + "-" + month + "-" + day
            this.setState({
                chooseDate: formatted_date,
                page: 1
            },() => this.handleRefreshData())
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
        //---------------------------------------------------------------------------------------------------------------------
        // handle page
        //---------------------------------------------------------------------------------------------------------------------
        this.handleChangePage = (event, value) => {
            this.setState({
                page: value
            },() => this.handleRefreshData())
        };

        this.handleRefreshData = () => {
            const {page, offset, limit, chooseDate} = this.state
            let start = (page - 1)*limit;
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/ticket/read-ticket/?limit="+limit+"&offset="+start+"&namaStaff="+this.props.user.idUser+"&dateTime="+chooseDate+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                        isLoaded: true,
                        ticketData: result.data,
                        payment: result.payment,
                        in: result.in,
                        out: result.out,
                        countData: Math.ceil(result.jumlah/limit)
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: false,
                            error
                        });
                    }
                )   
        }
    }
    componentDidMount() {
        const {offset, limit} = this.state
        let current_datetime = new Date()
        let year = current_datetime.getFullYear();
        let month = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let day = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = year + "-" + month + "-" + day
        //method to request API
        const requestOptionsPage = {
            method: 'GET'
        };
        fetch("http://localhost:8080/ticket/read-ticket/?limit="+limit+"&offset="+offset+"&namaStaff="+this.props.user.idUser+"&dateTime="+formatted_date+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                      isLoaded: true,
                      ticketData: result.data,
                      payment: result.payment,
                      in: result.in,
                      out: result.out,
                      countData: Math.ceil(result.jumlah/limit)
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
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
        const pickDateStyle = {
            padding: 10,
            height: '7vh',
            width: '53%',
            backgroundColor: '#ede6e6',
        }
        const ticketIncomeStyle = {
            padding: 10,
            height: '19vh',
            width: '100%',
            backgroundColor: '#ede6e6',
        }
        const gridStyle = {
            textAlign: '-webkit-right'
        }
        const gridJudulIncomeStyle = {
            backgroundColor: '#fcb134',
            borderRadius: '1vh 1vh 0 0',
            marginBottom: '10px',
            color: 'black',
            textAlign: 'center',
            padding: 1
        }
        const gridJudulInStyle = {
            backgroundColor: 'green',
            borderRadius: '1vh 1vh 0 0',
            marginBottom: '10px',
            color: 'white',
            textAlign: 'center',
            padding: 1
        }
        const gridJudulOutStyle = {
            backgroundColor: 'red',
            borderRadius: '1vh 1vh 0 0',
            marginBottom: '10px',
            color: 'white',
            textAlign: 'center',
            padding: 1
        }
        const theme = createMuiTheme({
            status: {
              danger: 'red',
            },
          });
        return ( 
            <ContainerSingle>
                <Grid container spacing={3}>
                    <Grid item xs={12} style={gridStyle}>
                        <Paper elevation={3} style={pickDateStyle}>
                            <Span className="title-pick">Pick The Date : </Span>
                            <ThemeProvider theme={theme}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        className={useStyles.root}
                                        clearable
                                        value={this.state.chooseDate}
                                        // placeholder='Pick date for filtering'
                                        onChange={date => this.handleDateChange(date)}
                                        maxDate={new Date()}
                                        minDate={new Date("03-16-2021")}
                                        format="yyyy-MM-dd"
                                    />
                                </MuiPickersUtilsProvider>
                            </ThemeProvider>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper elevation={3} style={ticketIncomeStyle}>
                            <Grid item xs={12} style={gridJudulIncomeStyle}>
                                Total Ticket Income
                            </Grid>
                            <Grid item xs={12}>
                                <h1 className="h1-style">
                                    Rp. {this.totalIncome(this.state.payment)} ,-
                                </h1>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={3} style={ticketIncomeStyle}>
                            <Grid item xs={12} style={gridJudulInStyle}>
                                Total IN
                            </Grid>
                            <Grid item xs={12}>
                                <h1 className="h1-style">
                                    {this.state.in}
                                </h1>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper elevation={3} style={ticketIncomeStyle}>
                            <Grid item xs={12} style={gridJudulOutStyle}>
                                Total OUT
                            </Grid>
                            <Grid item xs={12}>
                                <h1 className="h1-style">
                                    {this.state.out}
                                </h1>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <table className="table table-striped table-hover position-table">
                            <thead>
                                <tr>
                                    <th>Ticket Code</th>
                                    <th>No. Police</th>
                                    <th>Type</th>
                                    <th>IN-Date Time</th>
                                    <th>OUT-Date Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ticketData.map((el, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <td>{el.id}</td>
                                                <td>{el.noPol}</td>
                                                <td>{el.jenisKendaraan.length > 0  ? 
                                                    el.jenisKendaraan[0].jenis
                                                    :
                                                    "-"}</td>
                                                <td>{el.tglJamMasuk}</td>
                                                <td>{el.tglJamKeluar}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs={12}>
                        <ContainerSingle className="page-dashboard">
                            <ContainerSingle className={useStyles.root + ' bawah-kiri'}>
                                <Typography>Page: {this.state.page}</Typography>
                                <Pagination count={this.state.countData} page={this.state.page} onChange={this.handleChangePage} />
                            </ContainerSingle>
                        </ContainerSingle>
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
 
export default connect(mapStateToProps , mapDispatchToProps)(DashboardTransaction);