import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect } from 'react-router-dom';
import {
    ContainerSingle,
    Span,
    Table,
    THead,
    TRow,
    TH,
    TBody,
    TD,
    SelectSm,
    Option,
    Button,
    I } from '../../atomics'
import ModalDetailStaff from '../modal-detail-staff'
import { makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import './style.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dummy: []
        }

        this.loopingDummy = () => {
            const dummyArray = []
            for (var i = 0; i < 7; i++) {
                const person = {
                    id: "SID-001",
                    name: "Alif Yudha",
                    username: "alsyahtt",
                    email: "alif.yudha@gmail.com",
                    address: "jl.bahagia",
                    status: "active",
                    regisdate: "2021/03/01",
                    posisi: "admin"
                }
                dummyArray.push(person)
            }
            this.setState({
                dummy: dummyArray
            });
        }
    }

    componentDidMount() {
        this.loopingDummy();
    }

    render() {
        const classes = () => this.props.useStyles();
        console.log("props login : ", this.props.isLogin);
        if(this.props.isLogin === false) {
            return this.props.history.push('/')
        }
        return (
            <ContainerSingle>
                <ContainerSingle className="panel-control">
                    <ContainerSingle className="panel-control-findby">
                        Find By :
                    </ContainerSingle>
                    <ContainerSingle className="panel-control-selectby"> 
                        <SelectSm className="form-select form-select-sm select-opt">
                            <Option value="1">ID</Option>
                            <Option value="2">Username</Option>
                            <Option value="3">Status</Option>
                        </SelectSm>
                    </ContainerSingle>
                    <ContainerSingle className="panel-control-inputby">
                        <input className="form-control form-control-sm form-opt" type="text" placeholder="Find.." aria-label=".form-control-sm example" />
                    </ContainerSingle>
                    <ContainerSingle className="panel-control-add">
                        <Button className="btn btn-success btn-add" onClick={() => this.props.history.push('/staff/add')}>
                            <Span><I className="fa fa-plus fa-icon" aria-hidden="true"></I></Span>
                                Add Staff
                        </Button>
                    </ContainerSingle>
                </ContainerSingle>
                <Table className="table table-striped table-hover position-table">
                    <THead>
                        <TRow>
                            <TH>ID User</TH>
                            <TH>Name</TH>
                            <TH>Username</TH>
                            <TH>Status</TH>
                            <TH>Position</TH>
                            <TH>Action</TH>
                        </TRow>
                    </THead>
                    <TBody>
                        {
                            this.state.dummy.map((el, idx) => {
                                return (
                                    <TRow key={idx}>
                                        <TD>{el.id}</TD>
                                        <TD>{el.name}</TD>
                                        <TD>{el.username}</TD>
                                        <TD>{el.status}</TD>
                                        <TD>{el.posisi}</TD>
                                        <TD>
                                            <ContainerSingle className="detail" onClick={() => this.props.addDummy(this.state.dummy,idx)}>
                                                <ModalDetailStaff />
                                            </ContainerSingle>
                                            <Button className="btn btn-warning" onClick={() => this.props.history.push('/staff/update/'+el.id)}>
                                                <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                Edit
                                            </Button>
                                            <Button className="btn btn-danger">
                                                <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                Delete
                                            </Button>
                                        </TD>
                                    </TRow>
                                )
                            })
                        }
                    </TBody>
                </Table>
                <ContainerSingle>
                    <ContainerSingle className={classes.root + ' bawah-kiri'}>
                        <Pagination count={Math.ceil(this.state.dummy.length/5)} shape="rounded" />
                    </ContainerSingle>
                    <ContainerSingle className='bawah-kanan'>
                        <ContainerSingle className="limit-select"> 
                            <SelectSm className="form-select form-select-sm">
                                <Option value="1">5</Option>
                                <Option value="2">7</Option>
                            </SelectSm>
                        </ContainerSingle>
                        <ContainerSingle className="limit-title">
                            Limit :
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    isLogin: state.auth.isLogin
})

const mapDispatchToProps = dispatch => {
    return {
        addDummy: (user,idx) => dispatch({ type: 'ADD_DATASTAFF' , payload: {user,idx} })
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Staff);