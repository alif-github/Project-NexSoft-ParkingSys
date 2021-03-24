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
import { 
    CircularProgress,
    Typography
} from '@material-ui/core'
import Swal from 'sweetalert2'
import { makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import './style.css'
import ModalDetailMember from '../modal-detail-member';

class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isHandleFind: false,
            memberInputFind: "",
            countData: 0, 
            page: 1,
            offset: 0,
            limit: 5,
            toogleFind: "ID",
            findById: "",
            inputFind: "", 
            memberData: []
        }
        this.handleSetValue = el => {
            if (el.target.value === '') {
                this.setState({
                    inputFind: el.target.value
                },() => this.handleShowMemberBy())
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
                },() => this.handleShowMemberBy())
            } else {
                this.handleShowMemberBy()
            }
        }

        //---------------------------------------------------------------------------------------------------------------------
        //When data must be refresh, this is the solutions
        //---------------------------------------------------------------------------------------------------------------------
        this.refreshMemberData = () => {
            const {page,limit} = this.state;
            let start = (page - 1)*limit;
            //method to request API
            const requestOptionsPage = {
                method: 'GET'
            };
            fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember=&status=&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        this.setState({
                        isLoaded: true,
                        memberData: result.data,
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
            },() => this.handleShowMemberBy())
        };
        this.handleLimit = el => {
            this.setState({
                limit: el.target.value,
                page: 1
            },() => this.handleShowMemberBy())
        }
        //---------------------------------------------------------------------------------------------------------------------
        // handle toogle find
        //---------------------------------------------------------------------------------------------------------------------
        this.handleFindBy = el => {
            this.setState({
                toogleFind: el.target.value
            })
        }
        //---------------------------------------------------------------------------------------------------------------------
        this.handleDeleteMemberAPI = (idMember,namaMember) => {
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
            fetch("http://localhost:8080/member/delete/?id="+idMember+"",requestOptionsDelete)
                .then((response) => {
                    return response.json()
                })
                .then(
                    (result) => {
                        //do what you want with the response here
                        if (result.successMessage) {
                            swalWithBootstrapButtons.fire(
                                'Deleted!',
                                ''+namaMember+' has been deleted.',
                                'success'
                            )
                            this.refreshMemberData()
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

        this.handleDeleteMemberConfirm = (idMember,namaMember) => {
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
                  this.handleDeleteMemberAPI(idMember,namaMember);
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

        this.handleShowMemberBy = () => {
            const findMemberValue = this.state.inputFind;
            
            if (this.state.toogleFind === "ID") {
                if (findMemberValue === "") {
                    this.refreshMemberData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/member/read-member/?idMember="+findMemberValue+"&noPol=&namaMember=&status=&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                isLoaded: true,
                                memberData: result.data,
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
            } else if (this.state.toogleFind === "NamaMember") {
                if (findMemberValue === "") {
                    this.refreshMemberData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember="+findMemberValue+"&status=&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                isLoaded: true,
                                memberData: result.data,
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
            } else if (this.state.toogleFind === "NoPol") {
                if (findMemberValue === "") {
                    this.refreshMemberData();
                } else {
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    fetch("http://localhost:8080/member/read-member/?idMember=&noPol="+findMemberValue+"&namaMember=&status=&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                isLoaded: true,
                                memberData: result.data,
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
            } else if (this.state.toogleFind === "Status") {
                if (findMemberValue === "") {
                    this.refreshMemberData();
                } else {
                    let findMemberValueNew;
                    const {page,limit} = this.state;
                    let start = (page - 1)*limit;
                    //method to request API
                    const requestOptionsPage = {
                        method: 'GET'
                    };
                    
                    if (findMemberValue === 'Active') {
                        findMemberValueNew = 1
                    } else if (findMemberValue === 'Non-Active') {
                        findMemberValueNew = 0 
                    } else {
                        findMemberValueNew = 0
                    }
                    
                    fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember=&status="+findMemberValueNew+"&limit="+this.state.limit+"&offset="+start+"",requestOptionsPage)
                        .then((response) => {
                            return response.json()
                        })
                        .then(
                            (result) => {
                                //do what you want with the response here
                                this.setState({
                                isLoaded: true,
                                memberData: result.data,
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
        fetch("http://localhost:8080/member/read-member/?idMember=&noPol=&namaMember=&status=&limit="+this.state.limit+"&offset="+this.state.offset+"",requestOptionsPage)
            .then((response) => {
                return response.json()
            })
            .then(
                (result) => {
                    //do what you want with the response here
                    this.setState({
                      isLoaded: true,
                      memberData: result.data,
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
                                <TH>No Police</TH>
                                <TH>Type</TH>
                                <TH>Status</TH>
                                <TH>Register Date</TH>
                                <TH>Action</TH>
                            </TRow>
                        </THead>
                        <TBody>
                            <TRow>
                                <TD colSpan="7">
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
                                <TH>No Police</TH>
                                <TH>Type</TH>
                                <TH>Status</TH>
                                <TH>Register Date</TH>
                                <TH>Action</TH>
                            </TRow>
                        </THead>
                        <TBody>
                            <TRow>
                                <TD colSpan="7">
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
                                <Option value="NamaMember">Nama Member</Option>
                                <Option value="NoPol">Police Number</Option>
                                <Option value="Status">Status</Option>
                            </SelectSm>
                        </ContainerSingle>
                        <div className="panel-control-inputby input-group mb-3">
                            <input type="text" className="form-control form-control-sm form-opt" onChange={el => this.handleSetValue(el)} placeholder="Find..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.handleClickedFind()}>
                                <Span><I className="fa fa-search fa-icon" aria-hidden="true"></I></Span>
                            </button>
                        </div>
                        <ContainerSingle className="panel-control-add">
                            <Button className="btn btn-success btn-add" onClick={() => this.props.history.push('/member/add')}>
                                <Span><I className="fa fa-plus fa-icon" aria-hidden="true"></I></Span>
                                    Add Member
                            </Button>
                        </ContainerSingle>
                    </ContainerSingle>
                    <ContainerSingle className="table-scrolling">
                    <Table className="table table-striped table-hover position-table">
                        <THead className="head-member">
                            <TRow>
                                <TH>ID</TH>
                                <TH>Name</TH>
                                <TH>No Police</TH>
                                <TH>Type</TH>
                                <TH>Status</TH>
                                <TH>Register Date</TH>
                                <TH>Action</TH>
                            </TRow>
                        </THead>
                        <TBody>
                            {
                                this.state.memberData.map((el, idx) => {
                                    return (
                                        <TRow key={idx}>
                                            <TD>{el.idMember}</TD>
                                            <TD>{el.namaMember}</TD>
                                            <TD>{el.noPol}</TD>
                                            <TD>{el.jenis}</TD>
                                            <TD>{el.status === false ? "Non-active":"Active"}</TD>
                                            <TD>{el.tglRegister}</TD>
                                            <TD>
                                                {
                                                    <center>
                                                    <div className="container-action-button-staff">
                                                        <div onClick={() => this.props.addDummy(this.state.memberData[idx])}>
                                                            <ModalDetailMember />
                                                        </div>
                                                        <div>
                                                            <Button className="btn btn-warning" 
                                                                onClick={() => {this.props.history.push('/member/update/'+el.idMember);this.props.addDummy(this.state.memberData[idx])}}>
                                                                <Span><I className="fa fa-wrench fa-icon" aria-hidden="true"></I></Span>
                                                                Edit
                                                            </Button>
                                                        </div> 
                                                        <div>
                                                            <Button className="btn btn-danger" onClick={() => this.handleDeleteMemberConfirm(el.idMember,el.namaMember)}>
                                                                <Span><I className="fa fa-trash fa-icon" aria-hidden="true"></I></Span>
                                                                Delete
                                                            </Button>
                                                        </div>
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
    isLogin: state.auth.isLogin
})

const mapDispatchToProps = dispatch => {
    return {
        addDummy: (member) => dispatch({ type: 'ADD_DATAMEMBER' , payload: {member} })
    }
}
//---------------------------------------------------------------------------------------------------------------------
 
export default connect(mapStateToProps , mapDispatchToProps)(Member);