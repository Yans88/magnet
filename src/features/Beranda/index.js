import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getAkunTrading, getAkunTradingDemo } from '../Setoran/setoranSlice'
import NumberFormat from 'react-number-format';

class Beranda extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            login: '',
            phonepass: '',
            setor: '',
            akun_trading: '',
            img: ''
        }
        this.state = {

        }
    }

    componentDidMount() {
		//await this.sleep(300);
        this.props.onLoad();
    }
	
	sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    render() {
        const { akun_trading, akun_trading_demo } = this.props;

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
                                            <h4>Akun Trading MT5 <a href="account-type" className="btn btn-lgreen btn-sm">Buat Akun Trading Baru</a></h4>
                                            <hr />
                                            <div className="row">

                                                {akun_trading ? (
                                                    akun_trading.map((at, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="col-sm-4" style={{ marginBottom: 25 }}>
                                                                    <div className="box-account" style={{ background: '#cadaff' }}>
                                                                        <div className="box-account__id">#{at.login}</div>

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
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    akun_trading: state.setoran.akunTrading || [],
    akun_trading_demo: state.setoran.akunTradingDemo || [],
    user: state.main.currentUser,
})

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(getAkunTrading());
            dispatch(getAkunTradingDemo());
        },

    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Beranda);