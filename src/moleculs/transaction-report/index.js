import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    ContainerSingle, 
    SelectSm,
    Option,
    Span,
    I,
    ButtonModal, 
    TH,
    TD,
    Button,
    Input} from '../../atomics';
import {
    Grid,
    Typography
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns' 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './style.css'

class TransactionReportStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            transactionData: [],
            payment: 0,
            parkingBill: 0,
            chooseDate: new Date(),
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 6,
            date: "",
            toogleFind: "ID",
            inputFind: ""
         }
        this.handleSetValue = el => {
            if (el.target.value === '') {
                this.setState({
                    inputFind: el.target.value
                },() => this.handleShowPengunjungBy())
            } else {
                this.setState({
                    inputFind: el.target.value,
                })
            }
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
        this.handleDateChange = (date) => {
            this.setState({
                chooseDate: date,
                page: 1
            },() => this.handleRefreshData())
        }
        this.handleChangePage = (event, value) => {
            this.setState({
                page: value
            },() => this.handleRefreshData())
        };
        this.handleLimit = el => {
            this.setState({
                limit: el.target.value,
                page: 1
            },() => this.handleRefreshData())
        }
        this.dateSetRead = dateValue => {
            let current_datetime = dateValue
            let year = current_datetime.getFullYear();
            let month = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
            let day = ("0" + current_datetime.getDate()).slice(-2)
            let formatted_date = year + "-" + month + "-" + day

            return formatted_date;
        }
        //---------------------------------------------------------------------------------------------------------------------
        // handle toogle find
        //---------------------------------------------------------------------------------------------------------------------
        this.handleFindBy = el => {
            this.setState({
                toogleFind: el.target.value
            })
        }
        this.handleClickedFind = () => {
            if (this.state.page !== 1) {
                this.setState({
                    page: 1
                },() => this.handleShowPengunjungBy())
            } else {
                this.handleShowPengunjungBy()
            }
        }
        //---------------------------------------------------------------------------------------------------------------------
        this.handleRefreshData = () => {
            const {page, limit, chooseDate} = this.state
            let dateValue = this.dateSetRead(chooseDate)
            if (chooseDate === new Date()) {
                this.dateSetRead(chooseDate)
            }
            let start = (page - 1)*limit;
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/ticket/read-ticket/?limit="+limit+"&offset="+start+"&namaStaff="+this.props.user.idUser+"&dateTime="+dateValue+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                        isLoaded: true,
                        transactionData: result.data,
                        payment: result.payment,
                        parkingBill: result.parkingBill,
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
        this.handleShowPengunjungBy = () => {
            const {chooseDate} = this.state
            let dateValue = this.dateSetRead(chooseDate)
            const findUserValue = this.state.inputFind;
            
            if (this.state.toogleFind === "ID") {
                if (findUserValue === "") {
                    this.handleRefreshData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/ticket/read-ticket/?id="+findUserValue+"&limit="+limit+"&offset="+start+"&namaStaff="+this.props.user.idUser+"&dateTime="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    transactionData: result.data,
                                    payment: result.payment,
                                    parkingBill: result.parkingBill,
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
            } else if (this.state.toogleFind === "NoPol") {
                if (findUserValue === "") {
                    this.handleRefreshData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/ticket/read-ticket/?noPol="+findUserValue+"&limit="+limit+"&offset="+start+"&namaStaff="+this.props.user.idUser+"&dateTime="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    transactionData: result.data,
                                    payment: result.payment,
                                    parkingBill: result.parkingBill,
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
                      transactionData: result.data,
                      payment: result.payment,
                      parkingBill: result.parkingBill,
                      date: formatted_date,
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
        console.log("date today:",this.state.chooseDate);
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
        const theme = createMuiTheme({
            status: {
              danger: 'red',
            },
          }); 
        return ( 
            <ContainerSingle>
                <ContainerSingle className="atas-transaction">
                    <ContainerSingle className="left-transaction">
                        <ContainerSingle className="toogle-transaction">
                            <Grid container spacing={3}>
                                <Grid item xs={9}>
                                    <ContainerSingle className="panel-control">
                                        <ContainerSingle className="panel-control-selectby"> 
                                            <SelectSm className="form-select form-select-sm select-opt" onChange={this.handleFindBy}>
                                                <Option className="option-menu" value="ID">Code</Option>
                                                <Option className="option-menu" value="NoPol">No.Police</Option>
                                            </SelectSm>
                                        </ContainerSingle>
                                        <ContainerSingle className="panel-control-inputby input-group mb-3">
                                            <Input type="text" className="form-control form-control-sm form-opt" onChange={el => this.handleSetValue(el)} placeholder="Find..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                            <Button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.handleClickedFind()}>
                                                <Span><I className="fa fa-search fa-icon" aria-hidden="true"></I></Span>
                                            </Button>
                                        </ContainerSingle>
                                    </ContainerSingle>
                                </Grid>
                                <Grid item xs={3} className="grid-date">
                                    <ThemeProvider theme={theme}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                className={useStyles.root}
                                                clearable
                                                value= {this.dateSetRead(new Date(this.state.chooseDate))}
                                                onChange={date => this.handleDateChange(date)}
                                                maxDate={new Date()}
                                                minDate={new Date("03-16-2021")}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </ThemeProvider>
                                </Grid>
                            </Grid>
                        </ContainerSingle>
                        <ContainerSingle>
                            <table className="table table-striped table-hover position-table table-size">
                                <thead>
                                    <tr>
                                        <TH className="th-size">Ticket Code</TH>
                                        <TH className="th-size">No. Police</TH>
                                        <TH className="th-size">Type</TH>
                                        <TH className="th-size">IN-Date Time</TH>
                                        <TH className="th-size">OUT-Date Time</TH>
                                        <TH className="th-size">Parking Bill</TH>
                                        <TH className="th-size">Penalty</TH>
                                        <TH className="th-size">Total</TH>
                                        <TH className="th-size">Action</TH>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.transactionData.length > 0 ? 
                                        this.state.transactionData.map((el, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <TD className="th-size">{el.id}</TD>
                                                    <TD className="th-size">{el.noPol}</TD>
                                                    <TD className="th-size">
                                                        {
                                                        el.jenisKendaraan.length > 0  ? 
                                                        el.jenisKendaraan[0].jenis
                                                        :
                                                        "-"
                                                        }
                                                    </TD>
                                                    <TD className="th-size">{el.tglJamMasuk}</TD>
                                                    <TD className="th-size">{el.tglJamKeluar}</TD>
                                                    <TD className="th-size">{el.biayaParkir}</TD>
                                                    <TD className="th-size">{el.denda.length > 0 && el.denda[0].jumlahDenda}</TD>
                                                    <TD className="th-size">{el.nominal}</TD>
                                                    <TD className="th-size">
                                                        <ButtonModal className="btn btn-secondary">
                                                            Detail
                                                        </ButtonModal>
                                                    </TD>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <TD colSpan="9">No Transaction</TD>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </ContainerSingle>
                        <ContainerSingle>
                            <ContainerSingle className="page-dashboard-report">
                                <ContainerSingle className={useStyles.root + ' bawah-kiri'}>
                                    <Typography className="page-title">
                                        {
                                            this.state.transactionData.length > 0 ?
                                            "Page: "+this.state.page+""
                                            :
                                            "Page: No-data"
                                        }
                                    </Typography>
                                    <Pagination count={this.state.countData} page={this.state.page} onChange={this.handleChangePage} />
                                </ContainerSingle>
                                <ContainerSingle className='bawah-kanan-report'>
                                    <ContainerSingle className="limit-select"> 
                                        <SelectSm className="form-select form-select-sm" onChange={this.handleLimit}>
                                            <Option value="6">6</Option>
                                            <Option value="3">3</Option>
                                        </SelectSm>
                                    </ContainerSingle>
                                    <ContainerSingle className="limit-title">
                                        Limit :
                                    </ContainerSingle>
                                </ContainerSingle>
                            </ContainerSingle>
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="right-transaction">
                        <hr></hr>
                        <ContainerSingle className="judul-detail-transaction">
                            Detail Total Income
                        </ContainerSingle>
                        <hr></hr>
                        <ContainerSingle>
                            <table className="table-detail-style">
                                <tr>
                                    <th className="detail-style">Date</th>
                                    <td className="detail-style">: {this.dateSetRead(new Date(this.state.chooseDate))}</td>
                                </tr>
                                <tr>
                                    <th className="detail-style">Total Parking Bill</th>
                                    <td className="detail-style">
                                        {
                                            this.state.parkingBill > 0 ?
                                            ": Rp. "+this.totalIncome(this.state.parkingBill)+",-"
                                            :
                                            ": No Transaction"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th className="detail-style">Total Penalty</th>
                                    <td className="detail-style">
                                        {
                                            (this.state.payment - this.state.parkingBill) > 0 ?
                                            ": Rp. "+this.totalIncome(this.state.payment - this.state.parkingBill)+",-"
                                            :
                                            ": No Transaction"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th className="detail-style total">Total Income</th>
                                    <td className="detail-style total">
                                        {
                                            this.state.payment > 0 ?
                                            ": Rp. "+this.totalIncome(this.state.payment)+",-"
                                            :
                                            ": No Transaction"
                                        }
                                    </td>
                                </tr>
                            </table>
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
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
 
export default connect(mapStateToProps , mapDispatchToProps)(TransactionReportStaff);