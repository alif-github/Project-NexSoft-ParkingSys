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
    Input,
    H5,
    ContainerModal,
    Table,
    THead,
    TRow,
    TBody} from '../../atomics';
import {
    Grid,
    Typography
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns' 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './style.css'

class InReportStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            transactionData: [
                {
                    id: "",
                    idData: "",
                    jenisKendaraan: [
                        {jenis: ""}
                    ],
                    denda: [
                        {denda: ""}
                    ]
                }
            ],
            dataStaff: [],
            objTransactionData: {
                jenisKendaraan: [
                    {jenis: ""}
                ],
                denda: [
                    {
                        denda: "",
                        jumlahDenda: 0
                    }
                ]
            },
            inCar: 0,
            inMotorCycle: 0,
            in: 0,
            chooseDate: new Date(),
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 5,
            date: "",
            toogleFind: "ID",
            toogleFindStaff: "",
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
        this.handleFindByStaff = el => {
            this.setState({
                toogleFindStaff: el.target.value
            },() => this.handleRefreshData())
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
            const {page, limit, chooseDate , toogleFindStaff} = this.state
            let dateValue = this.dateSetRead(chooseDate)
            if (chooseDate === new Date()) {
                this.dateSetRead(chooseDate)
            }
            let start = (page - 1)*limit;
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            let nama;
            if (this.props.user.posisi === "Admin") nama = toogleFindStaff
            else nama = this.props.user.idUser
            fetch("http://localhost:8080/ticket/read-ticket/?limit="+limit+"&offset="+start+"&namaStaff="+nama+"&tglJamMasuk="+dateValue+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                        isLoaded: true,
                        transactionData: result.data,
                        inCar: result.inCar,
                        inMotorCycle: result.inMotor,
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
        this.handleShowPengunjungBy = () => {
            const {chooseDate, toogleFindStaff} = this.state
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
                    let nama;
                    if (this.props.user.posisi === "Admin") nama = toogleFindStaff
                    else nama = this.props.user.idUser
                    fetch("http://localhost:8080/ticket/read-ticket/?id="+findUserValue+"&limit="+limit+"&offset="+start+"&namaStaff="+nama+"&tglJamMasuk="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    transactionData: result.data,
                                    inCar: result.inCar,
                                    inMotorCycle: result.inMotor,
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
                    let nama;
                    if (this.props.user.posisi === "Admin") nama = toogleFindStaff
                    else nama = this.props.user.idUser
                    fetch("http://localhost:8080/ticket/read-ticket/?noPol="+findUserValue+"&limit="+limit+"&offset="+start+"&namaStaff="+nama+"&tglJamMasuk="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    transactionData: result.data,
                                    inCar: result.inCar,
                                    inMotorCycle: result.inMotor,
                                    in: result.in,
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
        this.handleModal = index => {
            const {transactionData} = this.state
            this.setState({
                objTransactionData: transactionData[index]
            })
        }
    }
    componentDidMount() {
        const {offset, limit, toogleFindStaff} = this.state
        let current_datetime = new Date()
        let year = current_datetime.getFullYear();
        let month = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let day = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = year + "-" + month + "-" + day
        //method to request API
        const requestOptionsPage = {
            method: 'GET'
        };
        let nama;
        if (this.props.user.posisi === "Admin") nama = toogleFindStaff
        else nama = this.props.user.idUser
        fetch("http://localhost:8080/ticket/read-ticket/?limit="+limit+"&offset="+offset+"&namaStaff="+nama+"&tglJamMasuk="+formatted_date+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                      isLoaded: true,
                      transactionData: result.data,
                      inCar: result.inCar,
                      inMotorCycle: result.inMotor,
                      in: result.in,
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
        fetch("http://localhost:8080/parkir/user/?posisi=Staff", requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                        dataStaff: result.data
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
                                        {
                                        this.props.user.posisi === "Admin" && 
                                        <ContainerSingle className="panel-control-selectby"> 
                                                <SelectSm className="form-select form-select-sm select-opt" onChange={this.handleFindByStaff}>
                                                    <Option className="option-menu-report" value="">-All-</Option>
                                                    {
                                                        this.state.dataStaff.length > 0 ?
                                                        this.state.dataStaff.map((el,idx) => {
                                                            return (
                                                                <Option className="option-menu-report" key={idx} value={el.idUser}>{el.namaUser}</Option>            
                                                            )
                                                        })
                                                        :
                                                        <Option className="option-menu-report">No Data</Option>
                                                    }
                                                </SelectSm>
                                        </ContainerSingle>
                                        }
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
                                                onKeyDown={(e) => e.preventDefault()}
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
                            <Table className="table table-striped table-hover position-table table-size">
                                <THead className="head-table-report">
                                    <TRow>
                                        <TH className="th-size">Ticket Code</TH>
                                        <TH className="th-size">No. Police</TH>
                                        <TH className="th-size">Type</TH>
                                        <TH className="th-size">IN-Date Time</TH>
                                        <TH className="th-size">Action</TH>
                                    </TRow>
                                </THead>
                                <TBody>
                                    {
                                        this.state.transactionData.length > 0 ? 
                                        this.state.transactionData.map((el, idx) => {
                                            return (
                                                <TRow key={idx}>
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
                                                    <TD className="th-size">
                                                        <ButtonModal onClick={() => this.handleModal(idx)} type="button" className="btn btn-secondary btn-modal-report" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            Detail
                                                        </ButtonModal>
                                                    </TD>
                                                </TRow>
                                            )
                                        })
                                        :
                                        <TRow>
                                            <TD colSpan="9">No Transaction</TD>
                                        </TRow>
                                    }
                                </TBody>
                            </Table>
                        </ContainerSingle>
                        <ContainerSingle>
                            <ContainerSingle className={this.props.user.posisi === "Admin" ? "page-dashboard-reportt" : "page-dashboard-report" }>
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
                                            <Option value="5">5</Option>
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
                            Detail IN Visitor
                        </ContainerSingle>
                        <hr></hr>
                        <ContainerSingle>
                            <Table className="table-detail-style">
                                <TBody>
                                    <TRow className="detail-style">
                                        <TH className="detail-style">Date</TH>
                                        <TD className="detail-style">: {this.dateSetRead(new Date(this.state.chooseDate))}</TD>
                                    </TRow>
                                    <TRow className="detail-style">
                                        <TH className="detail-style">
                                            Car IN
                                        </TH>
                                        <TD className="detail-style">: { this.state.inCar } person </TD>
                                    </TRow>
                                    <TRow className="detail-style">
                                        <TH className="detail-style">
                                            Motocycle IN
                                        </TH>
                                        <TD className="detail-style">: { this.state.inMotorCycle } person </TD>
                                    </TRow>
                                    <TRow className="detail-style">
                                        <THead className="detail-style total-report-in">IN Total</THead>
                                        <TD className="detail-style total-report-in">: { this.state.in } person</TD>
                                    </TRow>
                                </TBody>
                            </Table>
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>

                {/* MODAL ATTACK */}
                <ContainerModal className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <ContainerModal className="modal-dialog">
                        <ContainerModal className="modal-content">
                            <ContainerModal className="modal-header">
                                <H5 className="modal-title" id="exampleModalLabel">Detail Information</H5>
                                <ButtonModal type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></ButtonModal>
                            </ContainerModal>
                            <ContainerModal className="modal-body">
                                <Table className="table table-striped">
                                    <TBody>
                                        <TRow className="align-left">
                                            <TH>ID Data</TH>
                                            <TD>:   {this.state.objTransactionData.idData}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Ticket Code</TH>
                                            <TD>:   {this.state.objTransactionData.id}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>No. Police</TH>
                                            <TD>:   {this.state.objTransactionData.noPol}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Type</TH>
                                            <TD>:   {this.state.objTransactionData.jenisKendaraan[0].jenis}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Date Parking In</TH>
                                            <TD>:   {this.state.objTransactionData.tglJamMasuk}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Date Parking Out</TH>
                                            <TD>:   {this.state.objTransactionData.tglJamKeluar}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Penalty</TH>
                                            <TD>:   {this.state.objTransactionData.denda[0].denda}</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Penalty Bill</TH>
                                            <TD>:  Rp. {this.state.objTransactionData.denda[0].jumlahDenda} ,-</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Parking Bill</TH>
                                            <TD>:  Rp. {this.state.objTransactionData.biayaParkir} ,-</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Total</TH>
                                            <TD>:  Rp. {this.state.objTransactionData.biayaParkir + this.state.objTransactionData.denda[0].jumlahDenda} ,-</TD>
                                        </TRow>
                                        <TRow className="align-left">
                                            <TH>Created By</TH>
                                            <TD>:  {this.state.objTransactionData.namaStaff}</TD>
                                        </TRow>
                                    </TBody>
                                </Table>
                            </ContainerModal>
                            <ContainerModal className="modal-footer">
                                <ButtonModal type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                    <Span><I className="fa fa-times fa-icon" aria-hidden="true"></I></Span>
                                    Close
                                </ButtonModal>
                            </ContainerModal>
                        </ContainerModal>
                    </ContainerModal>
                </ContainerModal>
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
 
export default connect(mapStateToProps , mapDispatchToProps)(InReportStaff);