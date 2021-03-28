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
    I, 
    TBody} from '../../atomics'
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
                <ButtonModal type="button" className="btn btn-secondary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <Span><I className="fa fa-info fa-icon" aria-hidden="true"></I></Span>
                    Detail
                </ButtonModal>

                {/* <!-- Modal --> */}
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
                                        <TD>ID</TD>
                                        <TD>:   {this.props.staff.idUser}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Name</TD>
                                        <TD>:   {this.props.staff.namaUser}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Username</TD>
                                        <TD>:   {this.props.staff.username}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>E-mail</TD>
                                        <TD>:   {this.props.staff.email}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Address</TD>
                                        <TD>:   {this.props.staff.alamat}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Status</TD>
                                        <TD>:   {this.props.staff.status === true ? "Active" : "Non-Active"}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Register Date</TD>
                                        <TD>:   {this.props.staff.tglRegister}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Posisi</TD>
                                        <TD>:   {this.props.staff.posisi}</TD>
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
            </>
         );
    }
}

const mapStateToProps = state => ({
    staff: state.staffColReducer.staff
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ModalDetailStaff);