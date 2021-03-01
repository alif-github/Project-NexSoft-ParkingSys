import React, { Component } from 'react';
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
            })
        }
    }

    componentDidMount() {
        this.loopingDummy();
    }

    render() {
        const classes = () => this.props.useStyles();
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
                        <Button className="btn btn-success btn-add">
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
                                            <Button className="btn btn-secondary">
                                                <Span><I className="fa fa-info fa-icon" aria-hidden="true"></I></Span>
                                                Detail
                                            </Button>
                                            <Button className="btn btn-warning">
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
 
export default Staff;