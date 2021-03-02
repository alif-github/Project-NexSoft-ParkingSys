import React, { Component } from 'react';
import {ContainerSingle} from '../../atomics'
import './style.css'

class DashBoardAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }

    render() {
        return ( 
            <ContainerSingle className="background-content-dashboard-adm">
                <ContainerSingle className="content-item">
                    DASHBOARD ADMIN
                </ContainerSingle>
                <ContainerSingle className="div-atas">
                    <ContainerSingle className="div-atas-1">
                        <ContainerSingle className="judul-div-atas-1 judul-item">
                            Amount Paid
                        </ContainerSingle>
                        <ContainerSingle className="content-div-atas-1 content-item">
                            Rp. 12.000.000,-
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="div-atas-2">
                        <ContainerSingle className="judul-div-atas-2 judul-item">
                            Report Date
                        </ContainerSingle>
                        <ContainerSingle className="content-div-atas-2 content-item">
                            2021/03/01
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
                <ContainerSingle className="div-bawah">
                    <ContainerSingle className="div-bawah-1">
                        <ContainerSingle className="judul-div-bawah-1 judul-item">
                            Parking-IN
                        </ContainerSingle>
                        <ContainerSingle className="content-div-bawah-1 content-item">
                            25
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="div-bawah-2">
                        <ContainerSingle className="judul-div-bawah-2 judul-item">
                            Parking-OUT
                        </ContainerSingle>
                        <ContainerSingle className="content-div-bawah-2 content-item">
                            24
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
            </ContainerSingle>
         );
    }
}
 
export default DashBoardAdmin;