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
            isHandleFind: false,
            userInputFind: "",
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 5,
            toogleFind: "ID",
            toggleFindStatus: "",
            findById: "",
            inputFind: "", 
            userData: []
        }
        this.handleSetValue = el => {
            if (el.target.value === '') {
                this.setState({
                    inputFind: el.target.value
                },() => this.handleShowUserBy())
            } else {
                this.setState({
                    inputFind: el.target.value,
                })
            }
        }
        this.handleClickedFind = () => {
            if (this.state.page !== 1) {
                this.setState({
                    page: 1
                },() => this.handleShowUserBy())
            } else {
                this.handleShowUserBy()
            }
        }

        //---------------------------------------------------------------------------------------------------------------------
        //When data must be refresh, this is the solutions
        //---------------------------------------------------------------------------------------------------------------------
        this.refreshUserData = () => {
            const {page,limit,toggleFindStatus} = this.state;
            let start = (page - 1)*limit;
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/parkir/user/?idUser=&username=&status="+toggleFindStatus+"&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                        isLoaded: true,
                        userData: result.data,
                        countData: Math.ceil(result.jumlah/this.state.limit)
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
        }
        //---------------------------------------------------------------------------------------------------------------------
        // handle page and limit
        //---------------------------------------------------------------------------------------------------------------------
        this.handleChangePage = (event, value) => {
            this.setState({
                page: value
            },() => this.handleShowUserBy())
        };
        this.handleLimit = el => {
            this.setState({
                limit: el.target.value,
                page: 1
            },() => this.handleShowUserBy())
        }
        //---------------------------------------------------------------------------------------------------------------------
        // handle toogle find
        //---------------------------------------------------------------------------------------------------------------------
        this.handleFindBy = el => {
            this.setState({
                toogleFind: el.target.value
            })
        }
        this.handleFindByStatus = el => {
            this.setState({
                toggleFindStatus: el.target.value,
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
        //---------------------------------------------------------------------------------------------------------------------
        //Get API for Get by idUser
        //---------------------------------------------------------------------------------------------------------------------
        //method to request API

        this.handleShowUserBy = () => {
            const findUserValue = this.state.inputFind;
            
            if (this.state.toogleFind === "ID") {
                if (findUserValue === "") {
                    this.refreshUserData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/parkir/user/?idUser="+findUserValue+"&username=&status="+this.state.toggleFindStatus+"&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                isLoaded: true,
                                userData: result.data,
                                countData: Math.ceil(result.jumlah/this.state.limit)
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
                }
            } else if (this.state.toogleFind === "Username") {
                if (findUserValue === "") {
                    this.refreshUserData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/parkir/user/?idUser=&username="+findUserValue+"&status="+this.state.toggleFindStatus+"&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                isLoaded: true,
                                userData: result.data,
                                countData: Math.ceil(result.jumlah/this.state.limit)
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
                }
            }
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
        fetch("http://localhost:8080/parkir/user/?idUser=&username=&status=&limit="+this.state.limit+"&offset="+this.state.offset+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                      isLoaded: true,
                      userData: result.data,
                      countData: Math.ceil(result.jumlah/this.state.limit)
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
            return this.props.history.push('')
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
                            Status :
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-selectby"> 
                            <SelectSm className="form-select form-select-sm select-opt" onChange={this.handleFindByStatus}>
                                <Option value="">All Status</Option>
                                <Option value="1">Active</Option>
                                <Option value="0">Non-Active</Option>
                            </SelectSm>
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-selectby"> 
                            <SelectSm className="form-select form-select-sm select-opt" onChange={this.handleFindBy}>
                                <Option value="ID">ID</Option>
                                <Option value="Username">Username</Option>
                            </SelectSm>
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-inputby input-group mb-3">
                            <input type="text" className="form-control form-control-sm form-opt" onChange={el => this.handleSetValue(el)} placeholder="Find..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <Button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.handleClickedFind()}>
                                <Span><I className="fa fa-search fa-icon" aria-hidden="true"></I></Span>
                            </Button>
                        </ContainerSingle>
                        <ContainerSingle className="panel-control-add-staff">
                            <Button className="btn btn-success btn-add" onClick={() => this.props.history.push('/staff/add')}>
                                <Span><I className="fa fa-plus fa-icon" aria-hidden="true"></I></Span>
                                    Add Staff
                            </Button>
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="table-scrolling">
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
                                            <TD>{el.status === false ? <Span className="span-off">Off-Duty</Span>:<Span className="span-on">On-Duty</Span>}</TD>
                                            <TD>{el.posisi}</TD>
                                            <TD>
                                                {   
                                                    el.posisi !== "Admin" ?
                                                    <center>
                                                    <ContainerSingle className="container-action-button">
                                                        <ContainerSingle onClick={() => this.props.addDummy(this.state.userData[idx])}>
                                                            <ModalDetailStaff />
                                                        </ContainerSingle>
                                                        <ContainerSingle>
                                                            <Button className="btn btn-warning" 
                                                                onClick={() => {this.props.history.push('/staff/update/'+el.idUser);this.props.addDummy(this.state.userData[idx])}}>
                                                                <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                                Edit
                                                            </Button>
                                                        </ContainerSingle>
                                                        {
                                                            el.posisi !== "Admin" && 
                                                            <ContainerSingle>
                                                                <Button className="btn btn-danger" onClick={() => this.handleDeleteUserConfirm(el.idUser,el.namaUser)}>
                                                                    <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                                    Delete
                                                                </Button>
                                                            </ContainerSingle>
                                                        }
                                                    </ContainerSingle>
                                                    </center>
                                                    :
                                                    <center>
                                                    <ContainerSingle className="container-action-button-staff">
                                                        <ContainerSingle onClick={() => this.props.addDummy(this.state.userData[idx])}>
                                                            <ModalDetailStaff />
                                                        </ContainerSingle>
                                                        {
                                                            el.idUser === this.props.user.idUser &&
                                                            <ContainerSingle>
                                                                <Button className="btn btn-warning" 
                                                                    onClick={() => {this.props.history.push('/staff/update/'+el.idUser);this.props.addDummy(this.state.userData[idx])}}>
                                                                    <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                                    Edit
                                                                </Button>
                                                            </ContainerSingle>
                                                        }
                                                        {
                                                            el.posisi !== "Admin" && 
                                                            <ContainerSingle>
                                                                <Button className="btn btn-danger" onClick={() => this.handleDeleteUserConfirm(el.idUser,el.namaUser)}>
                                                                    <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                                    Delete
                                                                </Button>
                                                            </ContainerSingle>
                                                        }
                                                    </ContainerSingle>
                                                    </center>
                                                }
                                            </TD>
                                        </TRow>
                                    )
                                })
                            }
                        </TBody>
                    </Table>
                    </ContainerSingle>
                    <ContainerSingle className="page">
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
    isLogin: state.auth.isLogin,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => {
    return {
        addDummy: (user) => dispatch({ type: 'ADD_DATASTAFF' , payload: {user} })
    }
}
//---------------------------------------------------------------------------------------------------------------------
 
export default connect(mapStateToProps , mapDispatchToProps)(Staff);