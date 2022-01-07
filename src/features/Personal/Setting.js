import React, { Component, Fragment } from 'react'
import { Col, Nav, Row } from 'rsuite';
import { Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import { chgPropsProfile, changePass, updProfile, clearState, profileUser } from '../main/mainSlice'

class Setting extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            email: "",
            current_password: '',
            password: '',
            konfirmasi_password: ''
        }
        this.state = {
            errMsg1: this.initSelected,
            lastSegmentUrl: "",
            active_tab: "password_form",
        }
    }

    componentDidMount = async () => {
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
    handleSelect(activeKey) {
        this.props.clearErr();
        this.setState({ active_tab: activeKey });
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    handleSubmitPass() {
        var errors = this.state.errMsg1;
        errors.current_password = !this.props.profile.current_password ? "Kolom ini harus diisi" : '';
        errors.password = !this.props.profile.password ? "Kolom ini harus diisi" : '';
        errors.konfirmasi_password = !this.props.profile.konfirmasi_password ? "Kolom ini harus diisi" : '';
        errors.konfirmasi_password = !errors.konfirmasi_password && this.props.profile.konfirmasi_password !== this.props.profile.password ? "Konfirmasi password tidak sesuai" : errors.konfirmasi_password;
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg1)) {
            this.props.submitPass(this.props.profile);
        } else {
            console.error('Invalid Form')
        }

    }

    handleSubmit() {
        var errors = this.state.errMsg1;
        errors.email = !this.props.profile.email ? "Kolom ini harus diisi" : '';
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        //console.log(this.props.data.send_mail);
        if (!errors.email) {
            if (!pattern.test(this.props.profile.email)) {
                errors.email = "Please enter valid email address";
            }
        }
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg1)) {
            this.props.submitProfile(this.props.profile);
        } else {
            console.error('Invalid Form')
        }

    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    hideAlert() {
        this.props.clearErr();
    }

    render() {
        const { active_tab, errMsg1 } = this.state;
        const { user, profile, errorMessage, isError } = this.props;
        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Setting</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "430px" }}>
                                    <div className="card-body" style={{ paddingLeft: 20, paddingRight: 20 }}>
                                        <Nav appearance="subtle" activeKey={active_tab} className="tab_personal">
                                            <Nav.Item
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'password_form' ? true : false}
                                                eventKey="password_form"
                                                className="default" >Password
                                            </Nav.Item>
                                            <Nav.Item
                                                style={{ marginLeft: 60 }}
                                                onSelect={this.handleSelect.bind(this)}
                                                active={active_tab === 'profile' ? true : false}
                                                eventKey="profile"
                                                className="default" >Profile
                                            </Nav.Item>
                                        </Nav>
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                                            {errorMessage ? <div className={!isError ? "alert alert-info alert-sm" : "alert alert-danger alert-sm"} style={{ marginTop: '.3rem' }}>
                                                <button onClick={this.hideAlert.bind(this)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                <span className="fw-semi-bold">{errorMessage}</span>
                                            </div> : <br />}
                                            {active_tab === 'password_form' && (
                                                <Fragment>

                                                    <Row>
                                                        <Col xs={6}><label style={{ color: '#6b798f', marginTop: 8 }}>Current Password</label></Col>
                                                        <Col xs={18}>
                                                            {errMsg1.current_password ?
                                                                (<span className="float-right text-error badge badge-danger">{errMsg1.current_password}</span>) : ''}
                                                            <Form.Control
                                                                value={profile.current_password ? profile.current_password : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange.bind(this)}
                                                                size="lg"
                                                                name="current_password"
                                                                type="password"
                                                                required
                                                                placeholder="Current Password" />
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <br />
                                                    <Row>
                                                        <Col xs={6}><label style={{ color: '#6b798f', marginTop: 8 }}>New Password</label></Col>
                                                        <Col xs={18}>
                                                            {errMsg1.password ?
                                                                (<span className="float-right text-error badge badge-danger">{errMsg1.password}</span>) : ''}
                                                            <Form.Control
                                                                value={profile.password ? profile.password : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange.bind(this)}
                                                                size="lg"
                                                                name="password"
                                                                type="password"
                                                                required
                                                                placeholder="New Password" />
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <br />
                                                    <Row>
                                                        <Col xs={6}><label style={{ color: '#6b798f', marginTop: 8 }}>Repeat New Password</label></Col>
                                                        <Col xs={18}>
                                                            {errMsg1.konfirmasi_password ?
                                                                (<span className="float-right text-error badge badge-danger">{errMsg1.konfirmasi_password}</span>) : ''}
                                                            <Form.Control
                                                                value={profile.konfirmasi_password ? profile.konfirmasi_password : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange.bind(this)}
                                                                size="lg"
                                                                name="konfirmasi_password"
                                                                type="password"
                                                                required
                                                                placeholder="Repeat New Password" />
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <br />
                                                    <Row>
                                                        <Col xs={5} xsPush={20}>
                                                            <AppButton
                                                                onClick={this.handleSubmitPass.bind(this)}
                                                                type="button"
                                                                size="lg"
                                                                theme="success">
                                                                CHANGE PASSWORD</AppButton>
                                                        </Col>
                                                    </Row>
                                                </Fragment>)}

                                            {active_tab === 'profile' && (
                                                <Fragment>
                                                    
                                                    <Row>
                                                        <Col xs={6}><label style={{ color: '#6b798f', marginTop: 8 }}>First Name</label></Col>
                                                        <Col xs={18}>
                                                            <Form.Control
                                                                value={user.nama_depan ? user.nama_depan : ''}
                                                                autoComplete="off"
                                                                size="lg"
                                                                name="nama_depan"
                                                                type="text"
                                                                readOnly
                                                                placeholder="First Name" />

                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <br />
                                                    <Row>
                                                        <Col xs={6}><label style={{ color: '#6b798f', marginTop: 8 }}>Last Name</label></Col>
                                                        <Col xs={18}>
                                                            <Form.Control
                                                                value={user.nama_belakang ? user.nama_belakang : ''}
                                                                autoComplete="off"
                                                                size="lg"
                                                                name="nama_belakang"
                                                                type="text"
                                                                readOnly
                                                                placeholder="Last Name" />

                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <br />
                                                    <Row>
                                                        <Col xs={6}><label style={{ color: '#6b798f', marginTop: 8 }}>Email</label></Col>
                                                        <Col xs={18}>
                                                            {errMsg1.email ?
                                                                (<span className="float-right text-error badge badge-danger">{errMsg1.email}</span>) : ''}
                                                            <Form.Control
                                                                value={profile.email ? profile.email : ''}
                                                                autoComplete="off"
                                                                onChange={this.handleChange.bind(this)}
                                                                size="lg"
                                                                name="email"
                                                                type="text"
                                                                required
                                                                placeholder="Email" />
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <br />
                                                    <Row>
                                                        <Col xs={4} xsPush={20}>
                                                            <AppButton
                                                                onClick={this.handleSubmit.bind(this)}
                                                                style={{ marginLeft: 18 }}
                                                                type="button"
                                                                size="lg"
                                                                theme="success">
                                                                UPDATE PROFILE</AppButton>
                                                        </Col>
                                                    </Row>
                                                </Fragment>)}
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    user: state.main.currentUser,
    profile: state.main.dtProfileUser,
    errorMessage: state.main.errorMessage,
    isError: state.main.isError,
});
const mapDispatchToPros = (dispatch) => {
    return {
        changeProps: (param) => {
            dispatch(chgPropsProfile(param));
        },
        submitPass: (param) => {
            dispatch(changePass(param))
        },
        submitProfile: (param) => {
            dispatch(updProfile(param));
        },
        clearErr: () => {            
            dispatch(profileUser());
            dispatch(clearState());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Setting);