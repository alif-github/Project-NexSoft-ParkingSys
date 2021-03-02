import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Span,
    Table,
    TRow,
    TD,
    H5,
    ButtonModal,
    ContainerModal,
    I } from '../../atomics'
import './style.css'

class ModalDetailStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return ( 
            <>
                {/* <!-- Button trigger modal --> */}
                <ButtonModal type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <Span><I className="fa fa-info fa-icon" aria-hidden="true"></I></Span>
                    Detail
                </ButtonModal>

                {/* <!-- Modal --> */}
                <ContainerModal className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <ContainerModal className="modal-dialog">
                        <ContainerModal className="modal-content">
                        <ContainerModal className="modal-header">
                            <H5 className="modal-title" id="exampleModalLabel">Staff Detail Information</H5>
                            <ButtonModal type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></ButtonModal>
                        </ContainerModal>
                        <ContainerModal className="modal-body">
                            <Table className="table table-striped">
                                <TRow className="align-left">
                                    <TD>ID</TD>
                                    <TD>:   {this.props.dummy[this.props.index].id}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Name</TD>
                                    <TD>:   {this.props.dummy[this.props.index].name}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Username</TD>
                                    <TD>:   {this.props.dummy[this.props.index].username}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>E-mail</TD>
                                    <TD>:   {this.props.dummy[this.props.index].email}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Address</TD>
                                    <TD>:   {this.props.dummy[this.props.index].address}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Status</TD>
                                    <TD>:   {this.props.dummy[this.props.index].status}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Register Date</TD>
                                    <TD>:   {this.props.dummy[this.props.index].regisdate}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Posisi</TD>
                                    <TD>:   {this.props.dummy[this.props.index].posisi}</TD>
                                </TRow>
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
            </>
         );
    }
}

const mapStateToProps = state => ({
    dummy: state.staffColReducer.staff,
    index: state.staffColReducer.index
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ModalDetailStaff);