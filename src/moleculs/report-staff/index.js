import React, { Component } from 'react';
import { connect } from "react-redux"
import {ContainerSingle, H3, SelectSm, Option} from '../../atomics'
import TransactionReportStaff from '../transaction-report';
import InReportStaff from '../in-report';
import OutReportStaff from '../out-report';
import MemberReport from '../member-report';
import './style.css'

class ReportStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reportStatus: ""
         }
        this.handleChangeReport = el => {
            this.setState({
                reportStatus: el.target.value
            })
        }
    }
    render() { 
        return ( 
            <ContainerSingle className="report">
                <ContainerSingle className="judul-report">
                    <ContainerSingle className="judul-report-left">
                        <H3>
                            Daily Report
                        </H3>
                    </ContainerSingle>
                    <ContainerSingle className="panel-control-selectby judul-report-right"> 
                        <SelectSm className="form-select form-select-sm select-opt" onChange={this.handleChangeReport}>
                            <Option className="option-menu" value="transaction">IN / OUT</Option>
                            <Option className="option-menu" value="parkingIn">IN</Option>
                            <Option className="option-menu" value="parkingOut">OUT</Option>
                            {
                                this.props.user.posisi === "Admin" &&
                                <Option className="option-menu" value="memberReport">MEMBER</Option>
                            }
                        </SelectSm>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle>
                    <ContainerSingle className="middle-content">
                        {(() => {
                            switch (this.state.reportStatus) {
                                case "transaction" :
                                    return (
                                        <>
                                            <TransactionReportStaff/>
                                        </>
                                    )
                                case "parkingIn" :
                                    return (
                                        <>
                                            <InReportStaff/>
                                        </>
                                    )
                                case "parkingOut" :
                                    return (
                                        <>
                                            <OutReportStaff/>
                                        </>
                                    )
                                case "memberReport" :
                                    return (
                                        <>
                                            <MemberReport/>
                                        </>
                                    )
                                default :
                                    return (
                                        <TransactionReportStaff/>
                                    )
                            }
                        })()}
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}

//---------------------------------------------------------------------------------------------------------------------
// Redux util
//---------------------------------------------------------------------------------------------------------------------
const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {}
}
//---------------------------------------------------------------------------------------------------------------------
 
export default connect(mapStateToProps, mapDispatchToProps)(ReportStaff);