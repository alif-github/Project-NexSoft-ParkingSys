import React, { Component } from 'react';
import {
    Span,
    Table,
    TRow,
    TD,
    H5,
    ButtonModal,
    ContainerModal,
    I } from '../../atomics'

class ModalTransactionDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        console.log("isi data props:", this.props.dataTable)
        return ( 
            <>
                {/* <!-- Button trigger modal --> */}
                {/* <ButtonModal type="button" className="btn btn-secondary btn-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Detail
                </ButtonModal> */}

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
                                <TRow className="align-left">
                                    <TD>ID Data</TD>
                                    <TD>:   {this.props.dataTable.idData}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Ticket Code</TD>
                                    <TD>:   {this.props.dataTable.id}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>No. Police</TD>
                                    <TD>:   {this.props.dataTable.noPol}</TD>
                                </TRow>
                                <TRow className="align-left">
                                    <TD>Type</TD>
                                    <TD>:   {this.props.dataTable.jenisKendaraan.length > 0 && this.props.dataTable.jenisKendaraan[0].jenis}</TD>
                                </TRow>
                                {/* <TRow className="align-left">
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
                                </TRow> */}
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
 
export default ModalTransactionDetail;