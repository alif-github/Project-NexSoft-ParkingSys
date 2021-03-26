import React, { Component } from "react";
import {ContainerSingle , H1, H5, Image} from '../../atomics'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns' 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Carousel from 'react-bootstrap/Carousel'
import './style.css'

class DashBoardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseDate: null,
            chooseDate2: null,
            incomeMemberReal: 0,
            parkingBill: 0,
            denda: 0,
            in: 0,
            out: 0
         }
        this.handleDateChange = (date) => {
            let current_datetime = new Date(date)
            let yearTwoDigit = current_datetime.getFullYear().toString().substr(2,2);
            let year = current_datetime.getFullYear();
            let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
            let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
            let formatted_date = monthTwoDigit + "-" + dateTwoDigit + "-" + yearTwoDigit
            let formatted_date2 = year + "-" + monthTwoDigit + "-" + dateTwoDigit
            this.setState({
                chooseDate: formatted_date,
                chooseDate2: formatted_date2
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
            const {chooseDate , chooseDate2} = this.state
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
                        if (result.errorMessage) {
                            this.setState({
                                incomeMemberReal: 0
                            });
                        } else {
                            this.setState({
                                incomeMemberReal: result.income
                            });
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {}
                )
            fetch("http://localhost:8080/ticket/read-ticket/?dateTime="+chooseDate2+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                            parkingBill: result.parkingBill,
                            denda: result.denda,
                            in: result.in,
                            out: result.out
                        });
                    },
                    (error) => {}
                )
        }
    }

    componentDidMount() {
        let current_datetime = new Date()
        let yearTwoDigit = current_datetime.getFullYear().toString().substr(2,2);
        let year = current_datetime.getFullYear();
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = monthTwoDigit + "-" + dateTwoDigit + "-" + yearTwoDigit
        let formatted_date2 = year + "-" + monthTwoDigit + "-" + dateTwoDigit
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
                    if (result.errorMessage) {
                        this.setState({
                            incomeMemberReal: 0
                        })
                    } else {
                        this.setState({
                            incomeMemberReal: result.income
                        });
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {}
            )
        fetch("http://localhost:8080/ticket/read-ticket/?dateTime="+formatted_date2+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                        parkingBill: result.parkingBill,
                        denda: result.denda,
                        in: result.in,
                        out: result.out
                    });
                },
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
            height: '22vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh',
            backgroundColor: '#ede6e6',
            border: '1px solid #fcb134'
        }
        const paperInOutStyle = {
            padding: 10,
            height: '22vh',
            width: '100%',
            margin: '0px auto',
            borderRadius: '1vh',
            backgroundColor: '#ede6e6',
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
            paddingTop: '1.5vh',
            textAlign: 'center'
        }
        const gridIsiTotalStyle = {
            textAlign: 'center'
        }
        const theme = createMuiTheme({
            status: {
              danger: 'red',
            },
          });

        return ( 
            <ContainerSingle className="background-content-dashboard-adm">
                <ContainerSingle className="banner">
                    <Carousel>
                        <Carousel.Item>
                            <Image
                            className="d-block w-100"
                            src="https://images.theconversation.com/files/274516/original/file-20190515-60532-1lo0hf3.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop"
                            alt="First slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                            className="d-block w-100"
                            src="https://motorcyclehabit.com/wp-content/uploads/2019/05/Parked-Motorcycles-Large.jpg"
                            alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                            className="d-block w-100"
                            src="https://images.wallpaperscraft.com/image/motorcycle_road_marking_132827_2560x1080.jpg"
                            alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                </ContainerSingle>
                <ContainerSingle className="content-item-admin">
                    <ContainerSingle className="title-left">
                        DASHBOARD ADMIN
                    </ContainerSingle>
                    <ContainerSingle className="title-right">
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
                                />
                            </MuiPickersUtilsProvider>
                        </ThemeProvider>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="content-dashboard">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperInOutStyle}>
                                <Grid item xs={12} style={gridJudulInStyle}>
                                    Parking In
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <H1 className="h1-style-spesial">
                                        {this.state.in}
                                    </H1>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperInOutStyle}>
                                <Grid item xs={12} style={gridJudulOutStyle}>
                                    Parking Out
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <H1 className="h1-style-spesial">
                                        {this.state.out}
                                    </H1>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Penalty income
                                </Grid>
                                <Grid item xs={12} style={gridIsiTotalStyle}>
                                    <H1 className="h1-style total-h1-style">
                                        {
                                            this.state.denda > 0 ?
                                            "Rp. "+this.totalIncome(this.state.denda)+",-"
                                            :
                                            "No Transaction"
                                        }
                                    </H1>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ContainerSingle>
                <ContainerSingle className="content-dashboard-right">
                    <Grid container spacing={3}>        
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Member Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <H5 className="h1-style">
                                    {
                                        this.state.incomeMemberReal === 0 ? 
                                        "No Transaction"
                                        :
                                        "Rp. "+this.totalIncome(this.state.incomeMemberReal)+",-"
                                    }
                                    </H5>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Ticket Income
                                </Grid>
                                <Grid item xs={12} style={gridIsiStyle}>
                                    <H5 className="h1-style">
                                        {
                                            this.state.parkingBill > 0 ?
                                            "Rp. "+this.totalIncome(this.state.parkingBill)+",-"
                                            :
                                            "No Transaction"
                                        }
                                    </H5>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper elevation={3} style={paperStyle}>
                                <Grid item xs={12} style={gridJudulStyle}>
                                    Total income
                                </Grid>
                                <Grid item xs={12} style={gridIsiTotalStyle}>
                                    <H1 className="h1-style total-h1-style">
                                        {
                                            (this.state.parkingBill + this.state.incomeMemberReal + this.state.denda) > 0 ?
                                            "Rp. "+this.totalIncome(this.state.parkingBill + this.state.incomeMemberReal + this.state.denda)+",-"
                                            :
                                            "No Transaction"
                                        }
                                    </H1>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default DashBoardAdmin;