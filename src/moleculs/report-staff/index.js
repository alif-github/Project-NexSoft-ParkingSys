import React, { Component } from 'react';
import {ContainerSingle, H3, H5} from '../../atomics'
import TransactionReportStaff from '../transaction-report';
import './style.css'

class ReportStaff extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            reportStatus: "transaction"
         }
        this.handleChangeReport = () => {
            this.setState({
            })
        }
    }
    render() { 
        return ( 
            <ContainerSingle className="report">
                <ContainerSingle className="judul-report">
                    <H3>
                        Daily Report
                    </H3>
                </ContainerSingle>
                <ContainerSingle>
                    <ContainerSingle className="left-nav">
                        <ContainerSingle className="menu-title">
                            <H5>
                                Menu
                            </H5>
                        </ContainerSingle>
                        <ContainerSingle className="nav-title" onClick={() => {this.handleChangeReport()}}>
                            Transaction
                        </ContainerSingle>
                        <ContainerSingle className="nav-title">
                            Parking IN
                        </ContainerSingle>
                        <ContainerSingle className="nav-title">
                            Parking OUT
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="middle-content">
                        <TransactionReportStaff/>
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default ReportStaff;