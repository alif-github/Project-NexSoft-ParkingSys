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
            toogleFind: "ID",
            findById: "",
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
            fetch("http://localhost:8080/parkir/show-user/page/?page="+this.state.page+"&limit="+this.state.limit+"&username=&status=&idUser=",requestOptionsPage)
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
        // handle toogle find
        //---------------------------------------------------------------------------------------------------------------------
        this.handleFindBy = el => {
            this.setState({
                toogleFind: el.target.value
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
        this.handleShowUserBy = el => {
            const findUserValue = el.target.value;
            
            const requestOptionsIdUser = {
                method: 'GET'
            };
            const requestOptionsUsername = {
                method: 'GET'
            };

            if (this.state.toogleFind === "ID") {
                console.log("isi value:",findUserValue);
                console.log("masuk ke id");
                if (findUserValue === "") {
                    this.refreshUserData();
                } else {
                    fetch("http://localhost:8080/parkir/show-user/page/?page="+this.state.page+"&limit="+this.state.limit+"&username=&status=&idUser="+findUserValue+"",requestOptionsIdUser)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                console.log("result:",result)
    
                                //do what you want with the response here
                                if (result.errorMessage) {
                                    this.setState({
                                        isLoaded: true,
                                        userData: []
                                    });
                                } else {
                                    this.setState({
                                        isLoaded: true,
                                        userData: result
                                    });
                                }
                            },
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
                    fetch("http://localhost:8080/parkir/show-user/page/?page="+this.state.page+"&limit="+this.state.limit+"&username="+findUserValue+"&status=&idUser=",requestOptionsUsername)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
    
                                //do what you want with the response here
                                if (result.errorMessage) {
                                    this.setState({
                                        isLoaded: true,
                                        userData: []
                                    });
                                } else {
                                    this.setState({
                                        isLoaded: true,
                                        userData: result
                                    });
                                }
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
        const requestOptionsCount = {
            method: 'GET'
        };
        fetch("http://localhost:8080/parkir/show-user/page/?page="+this.state.page+"&limit="+this.state.limit+"&username=&status=&idUser=",requestOptionsPage)
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
                (error) => {}
            )
    }
    //---------------------------------------------------------------------------------------------------------------------

    render() {
        console.log("Find By: ", this.state.toogleFind);
        console.log("User data: ", this.state.userData);

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
                            <SelectSm className="form-select form-select-sm select-opt" onChange={this.handleFindBy}>
                                <Option value="ID">ID</Option>
                                <Option value="Username">Username</Option>
                                <Option value="Status">Status</Option>
                            </SelectSm>
                        </ContainerSingle>
                        <div className="panel-control-inputby input-group mb-3">
                            <input type="text" className="form-control form-control-sm form-opt" onChange={el => this.handleShowUserBy(el)} placeholder="Find..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
                                <Span><I className="fa fa-search fa-icon" aria-hidden="true"></I></Span>
                            </button>
                        </div>
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
                                            <TD>
                                                {   
                                                    el.posisi !== "Admin" ?
                                                    <center>
                                                    <div className="container-action-button">
                                                        <div onClick={() => this.props.addDummy(this.state.userData[idx])}>
                                                            <ModalDetailStaff />
                                                        </div>
                                                        <div>
                                                            <Button className="btn btn-warning" 
                                                                onClick={() => {this.props.history.push('/staff/update/'+el.idUser);this.props.addDummy(this.state.userData[idx])}}>
                                                                <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                                Edit
                                                            </Button>
                                                        </div>
                                                        {
                                                            el.posisi !== "Admin" && 
                                                            <div>
                                                                <Button className="btn btn-danger" onClick={() => this.handleDeleteUserConfirm(el.idUser,el.namaUser)}>
                                                                    <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        }
                                                    </div>
                                                    </center>
                                                    :
                                                    <center>
                                                    <div className="container-action-button-staff">
                                                        <div onClick={() => this.props.addDummy(this.state.userData[idx])}>
                                                            <ModalDetailStaff />
                                                        </div>
                                                        <div>
                                                            <Button className="btn btn-warning" 
                                                                onClick={() => {this.props.history.push('/staff/update/'+el.idUser);this.props.addDummy(this.state.userData[idx])}}>
                                                                <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                                Edit
                                                            </Button>
                                                        </div>
                                                        {
                                                            el.posisi !== "Admin" && 
                                                            <div>
                                                                <Button className="btn btn-danger" onClick={() => this.handleDeleteUserConfirm(el.idUser,el.namaUser)}>
                                                                    <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                                    Delete
                                                                </Button>
                                                            </div>
                                                        }
                                                    </div>
                                                    </center>
                                                }
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