import React, { Component } from 'react';
import { connect } from "react-redux"
import {
    ContainerSingle,
    Span,
    Table,
    THead,
    TRow,
    TH,
    TBody,
    TD,
    SelectSm,
    Option,
    Button,
    I } from '../../atomics'
import ModalDetailStaff from '../modal-detail-staff'
import { 
    CircularProgress,
    Typography
} from '@material-ui/core'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import './style.css'

class Staff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            countData: 0, 
            page: 1,
            limit: 5,
            userData: []
        }
        //---------------------------------------------------------------------------------------------------------------------
        //When data must be refresh, this is the solutions
        //---------------------------------------------------------------------------------------------------------------------
        this.refreshCountData = () => {
            const requestOptionsCount = {
                method: 'GET'
            };
            fetch("http://localhost:8080/parkir/user/count/",requestOptionsCount)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                            countData: Math.ceil(result/this.state.limit)
                        });
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {}
                )
        }
        //---------------------------------------------------------------------------------------------------------------------
        this.refreshUserData = () => {
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/parkir/show-user/page/?page="+this.state.page+"&limit="+this.state.limit+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                        isLoaded: true,
                        userData: result
                        },() => this.refreshCountData());
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        this.setState({
                            isLoaded: false,
                            error
                        });
                    }
                )
        }
        //---------------------------------------------------------------------------------------------------------------------
        // handle page and limit
        //---------------------------------------------------------------------------------------------------------------------
        this.handleChangePage = (event, value) => {
            this.setState({
                page: value
            },() => this.refreshUserData())
          };
        this.handleLimit = el => {
            this.setState({
                limit: el.target.value,
                page: 1
            },() => this.refreshUserData())
        }
        //---------------------------------------------------------------------------------------------------------------------
        this.handleDeleteUserAPI = (idUser,namaUser) => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })

            const Toast = Swal.mixin({
                toast: true,
                position: 'top',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })
            //method to request API
            const requestOptionsDelete = {
                method: 'DELETE'
            };
            fetch("http://localhost:8080/parkir/user/delete/?id="+idUser+"",requestOptionsDelete)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (result.successMessage) {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                ''+namaUser+' has been deleted.',
                                'success'
                            )
                            this.refreshUserData()
                        } else if (result.errorMessage) {
                            Toast.fire({
                                icon: 'error',
                                title: result.errorMessage
                            })
                        }
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        Toast.fire({
                            icon: 'error',
                            title: 'Check Your Connection!'
                        })
                    }
                )
        }

        this.handleDeleteUserConfirm = (idUser,namaUser) => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
              })
              .then((result) => {
                if (result.isConfirmed) {
                  //-------------------------------
                  //menuju delete API
                  //-------------------------------
                  this.handleDeleteUserAPI(idUser,namaUser);
                  //-------------------------------
                } else if (
                  /* Read more about handling dismissals below */
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                  )
                }
              })
        }
    }

    //---------------------------------------------------------------------------------------------------------------------
    // When the first time rendering
    //---------------------------------------------------------------------------------------------------------------------
    componentDidMount() {
        //method to request API
        const requestOptionsPage = {
            method: 'GET'
        };
        const requestOptionsCount = {
            method: 'GET'
        };
        fetch("http://localhost:8080/parkir/show-user/page/?page="+this.state.page+"&limit="+this.state.limit+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                      isLoaded: true,
                      userData: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
        fetch("http://localhost:8080/parkir/user/count/",requestOptionsCount)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                        countData: Math.ceil(result/this.state.limit)
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {}
            )
    }
    //---------------------------------------------------------------------------------------------------------------------

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
              display: 'flex',
              '& > * + *': {
                marginLeft: theme.spacing(2),
              },
            },
          }));
        
        const {error , isLoaded} = this.state
        if(this.props.isLogin === false) {
            return this.props.history.push('/')
        }

        // When Error
        //---------------------------------------------------------------------------------------------------------------------
        if (error) {
            return (
                <ContainerSingle>
                    <Table className="table table-striped table-hover position-table">
                        <THead>
                            <TRow>
                                <TH>ID</TH>
                                <TH>Name</TH>
                                <TH>Username</TH>
                                <TH>Status</TH>
                                <TH>Position</TH>
                                <TH>Action</TH>
                            </TRow>
                        </THead>
                        <TBody>
                            <TRow>
                                <TD colSpan="6">
                                    Error for fetching data, connection refused.
                                </TD>
                            </TRow>
                        </TBody>
                    </Table>
                </ContainerSingle>
            )
        // When Loading
        //---------------------------------------------------------------------------------------------------------------------
        } else if (!isLoaded) {
            return (
                <ContainerSingle>
                    <Table className="table table-striped table-hover position-table">
                        <THead>
                            <TRow>
                                <TH>ID</TH>
                                <TH>Name</TH>
                                <TH>Username</TH>
                                <TH>Status</TH>
                                <TH>Position</TH>
                                <TH>Action</TH>
                            </TRow>
                        </THead>
                        <TBody>
                            <TRow>
                                <TD colSpan="6">
                                    <ContainerSingle className={useStyles.root}>
                                        <CircularProgress />
                                    </ContainerSingle>
                                    Loading...
                                </TD>
                            </TRow>
                        </TBody>
                    </Table>
                </ContainerSingle>
            )
        // When Success
        //---------------------------------------------------------------------------------------------------------------------
        } else {
            return (
                <ContainerSingle>
                    <ContainerSingle className="panel-control">
                        <ContainerSingle className="panel-control-findby">
                            Find By :
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-selectby"> 
                            <SelectSm className="form-select form-select-sm select-opt">
                                <Option value="1">ID</Option>
                                <Option value="2">Username</Option>
                                <Option value="3">Status</Option>
                            </SelectSm>
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-inputby">
                            <input className="form-control form-control-sm form-opt" type="text" placeholder="Find.." aria-label=".form-control-sm example" />
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-add">
                            <Button className="btn btn-success btn-add" onClick={() => this.props.history.push('/staff/add')}>
                                <Span><I className="fa fa-plus fa-icon" aria-hidden="true"></I></Span>
                                    Add Staff
                            </Button>
                        </ContainerSingle>
                    </ContainerSingle>
                    <Table className="table table-striped table-hover position-table">
                        <THead>
                            <TRow>
                                <TH>ID</TH>
                                <TH>Name</TH>
                                <TH>Username</TH>
                                <TH>Status</TH>
                                <TH>Position</TH>
                                <TH>Action</TH>
                            </TRow>
                        </THead>
                        <TBody>
                            {
                                this.state.userData.map((el, idx) => {
                                    return (
                                        <TRow key={idx}>
                                            <TD>{el.idUser}</TD>
                                            <TD>{el.namaUser}</TD>
                                            <TD>{el.username}</TD>
                                            <TD>{el.status === false ? "Non-active":"Active"}</TD>
                                            <TD>{el.posisi}</TD>
                                            <TD><center>
                                                <ModalDetailStaff onClick={() => this.props.addDummy(this.state.userData[idx])}/>
                                                <Button className="btn btn-warning" onClick={() => this.props.history.push('/staff/update/'+el.id)}>
                                                    <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                    Edit
                                                </Button>
                                                <Button className="btn btn-danger" onClick={() => this.handleDeleteUserConfirm(el.idUser,el.namaUser)}>
                                                    <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                    Delete
                                                </Button>
                                                </center>
                                            </TD>
                                        </TRow>
                                    )
                                })
                            }
                        </TBody>
                    </Table>
                    <ContainerSingle>
                        <ContainerSingle className={useStyles.root + ' bawah-kiri'}>
                            <Typography>Page: {this.state.page}</Typography>
                            <Pagination count={this.state.countData} page={this.state.page} onChange={this.handleChangePage} />
                        </ContainerSingle>
                        <ContainerSingle className='bawah-kanan'>
                            <ContainerSingle className="limit-select"> 
                                <SelectSm className="form-select form-select-sm" onChange={this.handleLimit}>
                                    <Option value="5">5</Option>
                                    <Option value="7">7</Option>
                                </SelectSm>
                            </ContainerSingle>
                            <ContainerSingle className="limit-title">
                                Limit :
                            </ContainerSingle>
                        </ContainerSingle>
                    </ContainerSingle>
                </ContainerSingle>
            );
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------
// Redux util
//---------------------------------------------------------------------------------------------------------------------
const mapStateToProps = state => ({
    isLogin: state.auth.isLogin
})

const mapDispatchToProps = dispatch => {
    return {
        addDummy: (user) => dispatch({ type: 'ADD_DATASTAFF' , payload: {user} })
    }
}
//---------------------------------------------------------------------------------------------------------------------
 
export default connect(mapStateToProps , mapDispatchToProps)(Staff);