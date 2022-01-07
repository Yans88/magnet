import React, { Component } from 'react'
import { Dropdown, Header, Icon, Nav, Navbar } from 'rsuite'
import { connect } from 'react-redux';
import { clickExpand, onLogout, setDefaultOpenKeys, fetchUserBytoken } from '../features/main/mainSlice'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import "moment/locale/id";

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;

class MyHeader extends Component {

    componentDidMount() {
        this.fetchProfileAdmin();
    }

    fetchProfileAdmin = () => {        
        const token = localStorage.getItem(tokenLogin);       
        if (token !== '') {
            this.props.fetchDataAdmin();
        } else {
            this.props.logOut();
            // eslint-disable-next-line
            <Redirect to="/login" />
        }

    }

    handleToggle() {
        this.props.onClickExpand();
    }

    handleLogout() {
        this.props.logOut();
        // eslint-disable-next-line
        <Redirect to="/login" />
        
    }

    render() {

        return (

            <Header>
                <Navbar appearance="inverse" className="my-navbar1">
                    <Navbar.Header>
                        <Link to='/' className="navbar-brand logo"><b>Magnet</b></Link>
                    </Navbar.Header>
                    <Navbar.Body>
                       {/*  <Nav>
                            <Nav.Item icon={<Icon icon="bars" />} onClick={this.handleToggle.bind(this)} className="drawwer"></Nav.Item>
                        </Nav> */}

                        <Nav pullRight>

                            <Dropdown className="show dr-logout" icon={<Icon icon="user-o" size="lg" />} title={this.props.user.nama_depan ? (this.props.user.nama_depan) : ("Account")}>
                                <Dropdown.Item onClick={this.handleLogout.bind(this)} className="dropdown-menuu" icon={<Icon icon="sign-out" />}>Logout</Dropdown.Item>

                            </Dropdown>
                        </Nav>

                    </Navbar.Body>
                </Navbar>

            </Header>


        )
    }
}
const mapDispatchToPros = (dispatch) => {
    return {
        onClickExpand: () => {
            dispatch(clickExpand());
        },
        logOut: () => {
            dispatch(onLogout());
        },
        onLoad: (dt) => {
            dispatch(setDefaultOpenKeys(dt));
        },
        fetchDataAdmin: (payload) => {
            dispatch(fetchUserBytoken(payload));
        }
    }
}
const mapStateToProps = (state) => ({
    user: state.main.currentUser,
    errFetchUserByToken:state.main.errFetchUserByToken
});
export default connect(mapStateToProps, mapDispatchToPros)(MyHeader);