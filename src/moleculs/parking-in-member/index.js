import React, { Component } from 'react';
import { ContainerSingle, Image } from '../../atomics';
import { connect } from "react-redux"
import {withRouter} from 'react-router-dom';
import Swal from 'sweetalert2'
import {
    H5, I, Span, Button} from '../../atomics/index'
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid,
    Paper } from '@material-ui/core'
import './style.css';

class ParkingInMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idTicket: ""
        }
        this.handleCancelAdd = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "Are you sure to leave this changes ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes!'
              }).then((result) => {
                if (result.isConfirmed) {
                    this.props.history.push('')
                }
              })
        }
    }
    componentDidMount() {
        this.setState({
            idTicket: this.props.message
        })
    }
    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                '& > *': {
                  margin: theme.spacing(1),
                  width: '25ch',
                  display: 'flex',
                  flexWrap: 'wrap',
                },
            },
            formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
        }));
        const paperStyle = {
            padding: 13,
            height: '60vh',
            width: '40%',
            margin: 'auto',
            borderRadius: '1vh'
        } 
        const judulProfileStyle = {
            textAlign: 'center',
            backgroundColor: '#fcb134',
            borderRadius: '1vh',
            padding: '1vh',
            marginBottom: '30px'
        }
        return ( 
            <ContainerSingle className="container-reguler-exit">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={10} style={paperStyle}>
                            <Grid item xs={12} style={judulProfileStyle}>
                                <H5>
                                    Success Parking IN Member
                                </H5>
                            </Grid>
                            <Grid item xs={12}>
                                <form className={useStyles.root} noValidate autoComplete="off">
                                    <ContainerSingle className="container-member-png">
                                        <Image className="memberPng" src="https://www.pngkey.com/png/full/16-162388_membership-badge-png-club-penguin-membership-logo.png" alt="member"/>
                                    </ContainerSingle>
                                    <ContainerSingle>
                                        {"["+this.state.idTicket+"]"}
                                    </ContainerSingle>
                                    <ContainerSingle className="control-2">
                                        <Button className="btn btn-danger btn-float" onClick={() => this.handleCancelAdd()}>
                                            <Span><I className="fa fa-times fa-icon" aria-hidden="true"></I></Span>
                                            Back
                                        </Button>
                                    </ContainerSingle>
                                </form>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </ContainerSingle>
         );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {}
}
 
export default connect(mapStateToProps , mapDispatchToProps)(withRouter(ParkingInMember));