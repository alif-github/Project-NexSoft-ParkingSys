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
    Image,
    TBody} from '../../atomics'
import './style.css'

class ModalDetailMember extends Component {
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
                                        <TD>:   {this.props.member.idMember}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Name</TD>
                                        <TD>:   {this.props.member.namaMember}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Police Number</TD>
                                        <TD>:   {this.props.member.noPol}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Type</TD>
                                        <TD>:   {this.props.member.jenis}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Status</TD>
                                        <TD>:   {this.props.member.status === true ? "Active" : "Non-Active"}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Created By</TD>
                                        <TD>:   {this.props.member.dibuatOleh}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Register Date</TD>
                                        <TD>:   {this.props.member.tglRegister}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Edited By</TD>
                                        <TD>:   {this.props.member.dieditOleh}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Edited Date</TD>
                                        <TD>:   {this.props.member.tglEdit}</TD>
                                    </TRow>
                                    <TRow className="align-left">
                                        <TD>Price</TD>
                                        <TD>:   Rp.{this.props.member.biayaMember},-</TD>
                                    </TRow>
                                </TBody>
                            </Table>
                            <ContainerModal>
                                {
                                    (this.props.member.jenis === "Motorcycle") ? 
                                    <Image className="photos-jenis" src="https://www.astramotor.co.id/wp-content/uploads/2018/09/CBR150R_EDG_OP.png?x95080" alt="Motor-pic"/>
                                    :
                                    <Image className="photos-jenis" src="https://pngimg.com/uploads/bmw/bmw_PNG1693.png" alt="Car-pic"/>
                                }
                            </ContainerModal>
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
    member: state.memberColReducer.member
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(ModalDetailMember);