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
    Table} from '../../atomics';
import {
    Grid,
    Typography
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import DateFnsUtils from '@date-io/date-fns' 
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './style.css'

class MemberReport extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            memberData: [],
            objmemberData: {},
            jumlahMember: 0,
            jumlahMobil: 0,
            jumlahMotor: 0,
            chooseDate: new Date(),
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 5,
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
            console.log("date disini:",date)
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
            let yearTwoDigit = current_datetime.getFullYear().toString().substr(2,2);
            let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
            let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
            let formatted_date = monthTwoDigit + "-" + dateTwoDigit + "-" + yearTwoDigit
            console.log("tanggal dipilih:",formatted_date)

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
            console.log("date di refresh data:",dateValue)
            if (chooseDate === new Date()) {
                this.dateSetRead(chooseDate)
            }
            let start = (page - 1)*limit;
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember=&limit="+limit+"&offset="+start+"&tglRegister="+dateValue+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                            isLoaded: true,
                            memberData: result.data,
                            jumlahMember: result.jumlah,
                            jumlahMobil: result.mobil,
                            jumlahMotor: result.motor,
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
                    fetch("http://localhost:8080/member/read-member/?idMember="+findUserValue+"&noPol=&namaMember=&limit="+limit+"&offset="+start+"&tglRegister="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    memberData: result.data,
                                    jumlahMember: result.jumlah,
                                    jumlahMobil: result.mobil,
                                    jumlahMotor: result.motor,
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
                    fetch("http://localhost:8080/member/read-member/?idMember=&noPol="+findUserValue+"&namaMember=&limit="+limit+"&offset="+start+"&tglRegister="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    memberData: result.data,
                                    jumlahMember: result.jumlah,
                                    jumlahMobil: result.mobil,
                                    jumlahMotor: result.motor,
                                    countData: Math.ceil(result.jumlah/limit)
                                });
                            },
                            (error) => {
                                this.setState({
                                    isLoaded: false,
                                    error
                                });
                            }
                        )
                }
            } else if (this.state.toogleFind === "MemberName") {
                if (findUserValue === "") {
                    this.handleRefreshData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember="+findUserValue+"&limit="+limit+"&offset="+start+"&tglRegister="+dateValue+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                    isLoaded: true,
                                    memberData: result.data,
                                    jumlahMember: result.jumlah,
                                    jumlahMobil: result.mobil,
                                    jumlahMotor: result.motor,
                                    countData: Math.ceil(result.jumlah/limit)
                                });
                            },
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
            const {memberData} = this.state
            this.setState({
                objmemberData: memberData[index]
            })
        }
    }
    componentDidMount() {
        const {offset, limit} = this.state
        let current_datetime = new Date()
        let yearTwoDigit = current_datetime.getFullYear().toString().substr(2,2);
        let monthTwoDigit = ("0" + (current_datetime.getMonth() + 1)).slice(-2)
        let dateTwoDigit = ("0" + current_datetime.getDate()).slice(-2)
        let formatted_date = monthTwoDigit + "-" + dateTwoDigit + "-" + yearTwoDigit
        //method to request API
        const requestOptionsPage = {
            method: 'GET'
        };
        fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember=&status=&limit="+limit+"&offset="+offset+"&tglRegister="+formatted_date+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                      isLoaded: true,
                      memberData: result.data,
                      jumlahMember: result.jumlah,
                      jumlahMobil: result.mobil,
                      jumlahMotor: result.motor,
                      date: formatted_date,
                      countData: Math.ceil(result.jumlah/limit)
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
    }
    
    render() {
        console.log("data member ada:", this.state.memberData.length)
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
                                                <Option className="option-menu" value="ID">ID</Option>
                                                <Option className="option-menu" value="MemberName">Name</Option>
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
                                                value= {this.state.chooseDate}
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
                                <thead className="head-table">
                                    <tr>
                                        <TH className="th-size">Member ID</TH>
                                        <TH className="th-size">Member Name</TH>
                                        <TH className="th-size">Register Date</TH>
                                        <TH className="th-size">No. Police</TH>
                                        <TH className="th-size">Type</TH>
                                        <TH className="th-size">Member Bill</TH>
                                        <TH className="th-size">Action</TH>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.memberData.length > 0 ? 
                                        this.state.memberData.map((el, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <TD className="th-size">{el.idMember}</TD>
                                                    <TD className="th-size">{el.namaMember}</TD>
                                                    <TD className="th-size">{el.tglRegister}</TD>
                                                    <TD className="th-size">{el.noPol}</TD>
                                                    <TD className="th-size">{el.jenis}</TD>
                                                    <TD className="th-size">Rp.{this.totalIncome(el.biayaMember)},-</TD>
                                                    <TD className="th-size">
                                                        <ButtonModal onClick={() => this.handleModal(idx)} type="button" className="btn btn-secondary btn-modal-report" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            Detail
                                                        </ButtonModal>
                                                    </TD>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <TD colSpan="7">No Transaction</TD>
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </ContainerSingle>
                        <ContainerSingle>
                            <ContainerSingle className={this.props.user.posisi === "Admin" ? "page-dashboard-reportt" : "page-dashboard-report"}>
                                <ContainerSingle className={useStyles.root + ' bawah-kiri'}>
                                    <Typography className="page-title">
                                        {
                                            this.state.memberData.length > 0 ?
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
                    <ContainerSingle className="right-transaction-member">
                        <hr></hr>
                        <ContainerSingle className="judul-detail-transaction">
                            Detail Member Transaction
                        </ContainerSingle>
                        <hr></hr>
                        <ContainerSingle>
                            <Table className="table-detail-style">
                                <tr className="detail-style">
                                    <TH className="detail-style">Date</TH>
                                    <TD className="detail-style">: {this.dateSetRead(new Date(this.state.chooseDate))}</TD>
                                </tr>
                                <tr className="detail-style">
                                    <TH className="detail-style">
                                        Car Total
                                    </TH>
                                    <TD className="detail-style">: { this.state.jumlahMobil } vehicle </TD>
                                </tr>
                                <tr className="detail-style">
                                    <TH className="detail-style">
                                        Motocycle Total
                                    </TH>
                                    <TD className="detail-style">: { this.state.jumlahMotor } vehicle </TD>
                                </tr>
                                <tr className="detail-style">
                                    <TH className="detail-style">
                                        Car Income
                                    </TH>
                                    <TD className="detail-style">: Rp.{ this.totalIncome(this.state.jumlahMobil * 120000) },- </TD>
                                </tr>
                                <tr className="detail-style">
                                    <TH className="detail-style">
                                        Motorcycle Income
                                    </TH>
                                    <TD className="detail-style">: Rp.{ this.totalIncome(this.state.jumlahMotor * 60000) },- </TD>
                                </tr>
                                <tr className="detail-style">
                                    <TH className="detail-style total-report-in">Member Total</TH>
                                    <TD className="detail-style total-report-in">: { this.state.jumlahMember } vehicle</TD>
                                </tr>
                                <tr className="detail-style">
                                    <TH className="detail-style">Member Total Income</TH>
                                    <TD className="detail-style">: Rp.{ this.totalIncome((this.state.jumlahMotor * 60000) + (this.state.jumlahMobil * 120000)) },- </TD>
                                </tr>
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
                                    <tr className="align-left">
                                        <TH>ID Member</TH>
                                        <TD>:  {this.state.objmemberData.idMember}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Member Name</TH>
                                        <TD>:  {this.state.objmemberData.namaMember}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Status</TH>
                                        <TD>:  {this.state.objmemberData.status === true ? "Active":"Non-Active"}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>No Police</TH>
                                        <TD>:  {this.state.objmemberData.noPol}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Type</TH>
                                        <TD>:  {this.state.objmemberData.jenis}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Member Bill</TH>
                                        <TD>:  Rp. {this.totalIncome(this.state.objmemberData.biayaMember)} ,-</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Register Date</TH>
                                        <TD>:  {this.state.objmemberData.tglRegister}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Created By</TH>
                                        <TD>:  {this.state.objmemberData.dibuatOleh}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Edited By</TH>
                                        <TD>:  {this.state.objmemberData.dieditOleh}</TD>
                                    </tr>
                                    <tr className="align-left">
                                        <TH>Edited Date</TH>
                                        <TD>:  {this.state.objmemberData.tglEdit}</TD>
                                    </tr>
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
 
export default connect(mapStateToProps , mapDispatchToProps)(MemberReport);