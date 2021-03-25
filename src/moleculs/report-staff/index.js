import React, { Component } from 'react';
import {ContainerSingle, H3, SelectSm, Option} from '../../atomics'
import TransactionReportStaff from '../transaction-report';
import InReportStaff from '../in-report';
import OutReportStaff from '../out-report';
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
 
export default ReportStaff;