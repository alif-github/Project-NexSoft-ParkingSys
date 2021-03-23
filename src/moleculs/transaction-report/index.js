import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    ContainerSingle, 
    SelectSm,
    Option } from '../../atomics';
import {
    Grid,
    Paper,
    Typography
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import './style.css'

class TransactionReportStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            transactionData: [],
            payment: 0,
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 4,
            date: "",
         }
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
            fetch("http://localhost:8080/ticket/read-ticket/?limit="+limit+"&offset="+start+"&namaStaff="+this.props.user.idUser+"&dateTime=2021-03-22",requestOptionsPage)
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
        let current_datetime = new Date("2021-03-22")
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
        return ( 
            <ContainerSingle>
                <ContainerSingle className="atas-transaction">
                    <ContainerSingle className="left-transaction">
                        <ContainerSingle>
                            <table className="table table-striped table-hover position-table table-size">
                                <thead>
                                    <tr>
                                        <th className="th-size">Ticket Code</th>
                                        <th className="th-size">No. Police</th>
                                        <th className="th-size">Type</th>
                                        <th className="th-size">IN-Date Time</th>
                                        <th className="th-size">OUT-Date Time</th>
                                        <th className="th-size">Parking Bill</th>
                                        <th className="th-size">Penalty</th>
                                        <th className="th-size">Total</th>
                                        <th className="th-size">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.transactionData.map((el, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td className="th-size">{el.id}</td>
                                                    <td className="th-size">{el.noPol}</td>
                                                    <td className="th-size">{el.jenisKendaraan.length > 0  ? 
                                                        el.jenisKendaraan[0].jenis
                                                        :
                                                        "-"}</td>
                                                    <td className="th-size">{el.tglJamMasuk}</td>
                                                    <td className="th-size">{el.tglJamKeluar}</td>
                                                    <td className="th-size">{el.biayaParkir}</td>
                                                    <td className="th-size">{el.denda.length > 0 && el.denda[0].jumlahDenda}</td>
                                                    <td className="th-size">{el.nominal}</td>
                                                    <td className="th-size">-</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </ContainerSingle>
                        <ContainerSingle>
                            <ContainerSingle className="page-dashboard">
                                <ContainerSingle className={useStyles.root + ' bawah-kiri'}>
                                    <Typography className="page-title">Page: {this.state.page}</Typography>
                                    <Pagination count={this.state.countData} page={this.state.page} onChange={this.handleChangePage} />
                                </ContainerSingle>
                                <ContainerSingle className='bawah-kanan'>
                                    <ContainerSingle className="limit-select"> 
                                        <SelectSm className="form-select form-select-sm" onChange={this.handleLimit}>
                                            <Option value="5">5</Option>
                                            <Option value="7">7</Option>
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
                                    <td className="detail-style">: {this.state.date}</td>
                                </tr>
                                <tr>
                                    <th className="detail-style">Total Parking Bill</th>
                                    <td className="detail-style">: Rp. 250.000,-</td>
                                </tr>
                                <tr>
                                    <th className="detail-style">Total Penalty</th>
                                    <td className="detail-style">: Rp. 100.000,-</td>
                                </tr>
                                <tr>
                                    <th className="detail-style total">Total Income</th>
                                    <td className="detail-style total">: Rp. 250.000,-</td>
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