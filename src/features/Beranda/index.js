import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getAkunTrading, getAkunTradingDemo } from '../Setoran/setoranSlice';
import { profileUser,chgPass,chgPhonePass } from '../main/mainSlice'
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import AppModal from '../../components/modal/MyModal';
import { Button, Form } from 'react-bootstrap';

class Beranda extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            login: '',
            phonepass: '',
            setor: '',
            akun_trading: '',
            img: '',
			konf_password:'',			
			password:'',
			password2:'',
			password3:'',
			phonepwd:'',
        }
        this.state = {
            
            selected: this.initSelected,
            errMsg: this.initSelected,
			showFormResPass : false,
			showFormResPhonePass : false,
        }
    }

    componentDidMount() {
        //await this.sleep(300);
        sessionStorage.removeItem("data_tipe_akun_id");
        sessionStorage.removeItem("act_tipe_akun_id");
        this.props.onLoad();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    to_at = async () => {
        await sessionStorage.setItem('act_tipe_akun_id', 'create_new_akun');
        this.props.history.push('/account-type');
    }
	
	handleChange(event) {
        const { name, value } = event.target
        var val = value;        
        this.setState({
            loadingForm: false,
            errMsg: { ...this.state.errMsg, [name]: "" },
            selected: {
                ...this.state.selected,
                [name]: val
            }
        });
    }
	
	handleSubmit = async () => {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.password = !this.state.selected.password ? "Password required" : '';
		if(this.state.selected.password) {
			var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
			var test = reg.test(this.state.selected.password);			
			errors.password = !test ? "password must be 8 characters" : '';
			errors.password2 = !test ? "least one uppercase letter" : '';
			errors.password3 = !test ? "one lowercase letter and one number" : '';
		}
        errors.konf_password = !this.state.selected.konf_password ? "Konfirmasi password required" : '';
		if(errors.konf_password === '') errors.konf_password = this.state.selected.konf_password !==  this.state.selected.password ? "Password not match" : '';	
	    
        this.setState({ errors});
        if (this.validateForm(this.state.errMsg)) {
			const param = {
				login : this.state.selected.login,
				password : this.state.selected.password,
			}
            this.props.onChangePass(param);
        } else {
            console.error('Invalid Form')
            this.setState({
                loadingForm: false,
            });
        }

    }
	
	handleSubmit2 = async () => {
        var errors = this.state.errMsg;
        this.setState({
            ...this.state,
            loadingForm: true,
        });
        errors.phonepwd = !this.state.selected.phonepwd ? "Password required" : '';
		if(this.state.selected.phonepwd) {
			var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
			var test = reg.test(this.state.selected.phonepwd);			
			errors.phonepwd = !test ? "password must be 8 characters" : '';
			errors.phonepwd2 = !test ? "least one uppercase letter" : '';
			errors.phonepwd3 = !test ? "one lowercase letter and one number" : '';
		}
        errors.konf_password = !this.state.selected.konf_password ? "Konfirmasi password required" : '';
		if(errors.konf_password === '') errors.konf_password = this.state.selected.konf_password !==  this.state.selected.phonepwd ? "Password not match" : '';	
	    
        this.setState({ errors});
        if (this.validateForm(this.state.errMsg)) {   
			const param = {
				login : this.state.selected.login,
				phonepwd : this.state.selected.phonepwd,
			}
            this.props.onChangePhonePass(param);
        } else {
            console.error('Invalid Form')
            this.setState({
                loadingForm: false,
            });
        }

    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
	
	chg_pass(record) {
		this.setState({
			showFormResPass : true,
            selected: { ...record, konf_password:'',password:'',errMsg:this.initSelected }
        });
        
    }
	
	chg_pass2(record) {
		this.setState({
			showFormResPhonePass : true,
            selected: { ...record, konf_password:'',phonepwd:'',errMsg:this.initSelected }
        });
        
    }
	
	handleClose() {
        this.setState({
			showFormResPass : false,
			showFormResPhonePass : false,
            selected: this.initSelected,
            errMsg: this.initSelected,
        });
    }

    render() {
        const { akun_trading, akun_trading_demo, profile } = this.props;
		const { selected, errMsg } = this.state;
		const frmUser = <Form id="myForm">

            <Form.Group controlId="password">
                <Form.Label>Password Baru</Form.Label>
                {errMsg.password ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.password}<br/>{errMsg.password2}<br/>{errMsg.password3}
                    </span>) : ''}
				
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="password"
                    type="text"
                    value={selected.password}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Password" />
			</Form.Group>
			<Form.Group controlId="konf_password">
               <Form.Label>Konfirmasi Password</Form.Label>
                {errMsg.konf_password ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.konf_password}
                    </span>) : ''}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="konf_password"
                    type="text"
                    value={selected.konf_password}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Konfirmasi Password" />
					<br/>
				<span style={{color:'red', fontWeight:'bold',fontStyle:'italic'}}>Password ini akan di gunakan untuk login dan trading di MT5</span>
            </Form.Group>
        </Form>;
		const frmUser2 = <Form id="myForm">

            <Form.Group controlId="password">
                <Form.Label>Password Baru</Form.Label>
                {errMsg.phonepwd ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.phonepwd}<br/>{errMsg.phonepwd2}<br/>{errMsg.phonepwd3}
                    </span>) : ''}
				
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="phonepwd"
                    type="text"
                    value={selected.phonepwd}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Password" />
			</Form.Group>
			<Form.Group controlId="konf_password">
               <Form.Label>Konfirmasi Password</Form.Label>
                {errMsg.konf_password ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.konf_password}
                    </span>) : ''}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="konf_password"
                    type="text"
                    value={selected.konf_password}
                    onChange={this.handleChange.bind(this)}
                    placeholder="Konfirmasi Password" />
            </Form.Group>
			<br/>
			<span style={{color:'red', fontWeight:'bold',fontStyle:'italic'}}>Password ini akan di gunakan untuk menelpon dealing kamu</span>
        </Form>;
        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid">
                        <br />
                        <h1 style={{ marginBottom: 15, fontSize: 35, marginLeft: 10 }}>Akun Saya</h1>

                        <div className="row">

                            <div className="col-12">
                                {/* card start */}
                                <div className="card shadow-lg" style={{ "minHeight": "800px" }}>

                                    <div className="card-body">
                                        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25 }}>
                                            <h4>Akun Trading MT5
                                                {profile.status_dokumen === 'Approve' &&
                                                    <Link to='/account-type' className="btn btn-lgreen btn-sm" onClick={() => this.to_at()}>
                                                        Buat Akun Trading Baru
                                                    </Link>
                                                }
                                            </h4>
                                            <hr />
                                            <div className="row">

                                                {akun_trading ? (
                                                    akun_trading.map((at, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="col-sm-4" style={{ marginBottom: 25 }}>
                                                                    <div className="box-account" style={{ background: '#cadaff' }}>
                                                                        <div className="box-account__id">#{at.login}

                                                                            <div className="box-bank__actions">

                                                                                <Dropdown>
                                                                                    <Dropdown.Toggle size="sm" variant="secondary"
                                                                                        style={{ backgroundColor: 'transparent', borderColor: 'transparent' }} id="dropdown-basic">
                                                                                        <i className="fa fa-ellipsis-h"></i>
                                                                                    </Dropdown.Toggle>

                                                                                    <Dropdown.Menu className="my-dropdown-menu">
                                                                                        <Dropdown.Item as="button" onClick={() => this.chg_pass(at)}>RESET PASSWORD</Dropdown.Item>
                                                                                        <Dropdown.Item as="button" onClick={() => this.chg_pass2(at)}>RESET PHONE PASSWORD</Dropdown.Item>

                                                                                    </Dropdown.Menu>
                                                                                </Dropdown>

                                                                            </div>
                                                                        </div>

                                                                        <div className="box-account__meta">
                                                                            <div className="row">
                                                                                <div className="col">
                                                                                    <dl>
                                                                                        <dt>No Akun</dt>
                                                                                        <dd>{at.login}</dd>
                                                                                    </dl>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <dl>
                                                                                        <dt>Free Margin</dt>
                                                                                        <dd> <NumberFormat
                                                                                            value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                                                                            thousandSeparator={true}
                                                                                            decimalScale={2}
                                                                                            displayType={'text'}
                                                                                        /></dd>
                                                                                    </dl>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row">
                                                                                <div className="col">
                                                                                    <dl>
                                                                                        <dt>Equity</dt>
                                                                                        <dd> <NumberFormat
                                                                                            value={at.equity > 0 ? at.equity : '0.00'}
                                                                                            thousandSeparator={true}
                                                                                            decimalScale={2}
                                                                                            displayType={'text'}
                                                                                        /></dd>
                                                                                    </dl>
                                                                                </div>
                                                                                <div className="col">
                                                                                    <dl>
                                                                                        <dt>Leverage</dt>
                                                                                        <dd><NumberFormat
                                                                                            value={at.leverage > 0 ? at.leverage : '0.00'}
                                                                                            thousandSeparator={true}
                                                                                            decimalScale={2}
                                                                                            displayType={'text'}
                                                                                        /></dd>
                                                                                    </dl>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>



                                                            </Fragment>
                                                        );
                                                    })
                                                ) : ''}
                                            </div>


                                            <h4>Akun Demo Trading MT5</h4>
                                            <hr />
                                            <div className="row">
                                                {akun_trading_demo ? (
                                                    akun_trading_demo.map((at, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="col-sm-4" style={{ marginBottom: 25 }}>
                                                                    <div className="box-account" style={{ background: '#cadaff' }}>
                                                                        <div className="box-account__id">#{at.login}</div>

                                                                        <div className="box-account__meta">
                                                                            <div className="row">
                                                                                <div className="col">
                                                                                    <dl>
                                                                                        <dt>{at.name}</dt>

                                                                                    </dl>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>



                                                            </Fragment>
                                                        );
                                                    })
                                                ) : ''}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
				<AppModal
                    size="xs"
                    show={this.state.showFormResPass}
                    form={frmUser}
                    backdrop="static"
                    keyboard={false}
                    title={"RESET PASSWORD #"+this.state.selected.login}
                    titleButton="Save change"
                    themeButton="success"
                    handleClose={this.handleClose.bind(this)}
                    isLoading={this.props.isAddLoading ? this.props.isAddLoading : this.state.loadingForm}
                    formSubmit={this.handleSubmit.bind(this)} />
				<AppModal
                    size="xs"
                    show={this.state.showFormResPhonePass}
                    form={frmUser2}
                    backdrop="static"
                    keyboard={false}
                    title={"RESET PHONE PASSWORD #"+this.state.selected.login}
                    titleButton="Save change"
                    themeButton="success"
                    handleClose={this.handleClose.bind(this)}
                    isLoading={this.props.isAddLoading ? this.props.isAddLoading : this.state.loadingForm}
                    formSubmit={this.handleSubmit2.bind(this)} />
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    akun_trading: state.setoran.akunTrading || [],
    akun_trading_demo: state.setoran.akunTradingDemo || [],
    user: state.main.currentUser,
    profile: state.main.dtProfileUser
})

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(profileUser());
            dispatch(getAkunTrading());
            dispatch(getAkunTradingDemo());
        },
		onChangePass:(param)=>{
			dispatch(chgPass(param));
		},
		onChangePhonePass:(param)=>{
			dispatch(chgPhonePass(param));
		}
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Beranda);