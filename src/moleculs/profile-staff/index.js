import React, { Component } from 'react';
import {
    ContainerSingle,
    I} from '../../atomics'
import { makeStyles } from '@material-ui/core/styles';
import { Grid , Paper } from '@material-ui/core';
import { connect } from 'react-redux'

class ProfileStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
              flexGrow: 1,
            },
            paper: {
              padding: theme.spacing(2),
              textAlign: 'center',
              color: theme.palette.text.secondary,
            },
        })); 
        return ( 
            <ContainerSingle className={useStyles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper className={useStyles.paper}>
                            <center>
                                <I className="fa fa-user-circle user-icon" aria-hidden="true"></I>
                            </center>
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid item xs={12}>
                            Welcome,
                        </Grid>
                        <Grid item xs={12}>
                            {this.props.user.namaUser}
                        </Grid>
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
 
export default connect(mapStateToProps , mapDispatchToProps)(ProfileStaff);