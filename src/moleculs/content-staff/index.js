import React, { Component } from 'react';
import {  A,
    Button,
    ContainerSingle,
    Form,
    H1,
    H3,
    H5,
    Hr,
    I,
    Image,
    Input,
    Label,
    Span,
    TextArea,
    ButtonAcr,
    Table,
    THead,
    TRow,
    TH,
    TBody,
    TD } from '../../atomics'
import './style.css'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
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
                    <TRow>
                        <TD>SID-001</TD>
                        <TD>Alif Yudha S</TD>
                        <TD>alsyahtt</TD>
                        <TD>active</TD>
                        <TD>admin</TD>
                        <TD>
                            <button type="button" className="btn btn-secondary">Show Detail</button>
                            <button type="button" className="btn btn-warning">Edit</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </TD>
                    </TRow>
                    <TRow>
                        <TD>SID-001</TD>
                        <TD>Alif Yudha S</TD>
                        <TD>alsyahtt</TD>
                        <TD>active</TD>
                        <TD>admin</TD>
                        <TD>
                            <button type="button" className="btn btn-secondary">Show Detail</button>
                            <button type="button" className="btn btn-warning">Edit</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </TD>
                    </TRow>
                    <TRow>
                        <TD>SID-001</TD>
                        <TD>Alif Yudha S</TD>
                        <TD>alsyahtt</TD>
                        <TD>active</TD>
                        <TD>admin</TD>
                        <TD>
                            <button type="button" className="btn btn-secondary">Show Detail</button>
                            <button type="button" className="btn btn-warning">Edit</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </TD>
                    </TRow>
                    <TRow>
                        <TD>SID-001</TD>
                        <TD>Alif Yudha S</TD>
                        <TD>alsyahtt</TD>
                        <TD>active</TD>
                        <TD>admin</TD>
                        <TD>
                            <button type="button" className="btn btn-secondary">Show Detail</button>
                            <button type="button" className="btn btn-warning">Edit</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </TD>
                    </TRow>
                    <TRow>
                        <TD>SID-001</TD>
                        <TD>Alif Yudha S</TD>
                        <TD>alsyahtt</TD>
                        <TD>active</TD>
                        <TD>admin</TD>
                        <TD>
                            <button type="button" className="btn btn-secondary">Show Detail</button>
                            <button type="button" className="btn btn-warning">Edit</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </TD>
                    </TRow>
                </TBody>
            </Table>
         );
    }
}
 
export default Staff;