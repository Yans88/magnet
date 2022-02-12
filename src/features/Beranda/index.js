import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getAkunTrading, getAkunTradingDemo } from '../Setoran/setoranSlice'
import NumberFormat from 'react-number-format';
import akun_icon from '../../assets/akun_white.svg';

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
                       
                        <div className="grid grid-cols-1  my-3 mb-20">
                            
                            

                            <div className="w-full bg-hijau-forex rounded-xl text-white pt-3 pb-20 grid grid-cols-1 place-items-center static">
                            
                                <div className="mobile-hide w-[18%]  ">
                                    <img src={akun_icon} width="25px" className="float-left" />
                                    <span className="text-lg font-bold">&nbsp;Akun Saya</span>
                                    
                                    

                                </div>

                                

                                <div className="mobile-hide absolute mt-[27rem] bg-white text-black text-center rounded-2xl shadow-lg  py-10 w-3/4 ..." >
                                    <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-black">BUAT AKUN TRADING BARU</span></a>
                                        <div className="grid grid-cols-3 gap-4 px-5  mt-2">

                                                {akun_trading ? (
                                                akun_trading.map((at, index) => {
                                                    return (

                                                        <div className="border border-solid border-gray-300 text-left p-4 rounded-2xl" style={{ backgroundColor:"#F1F1F1"}}>
                                                            <span className="text-red-500">#{at.login}</span>
                                                            <div className="grid grid-cols-2">
                                                                <div className="font-bold">NO AKUN</div>
                                                                <div className="font-bold">FREE MARGIN</div>
                                                                <div>{at.login}</div>
                                                                <div><NumberFormat
                                                                                        value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    /></div>
                                                                <div className="font-bold">EQUITY</div>
                                                                <div className="font-bold">LEVERAGE</div>
                                                                <div><NumberFormat
                                                                                        value={at.equity > 0 ? at.equity : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    /></div>
                                                                <div><NumberFormat
                                                                                        value={at.leverage > 0 ? at.leverage : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    /></div>
                                                            </div>
                                                        </div>

                                                        );
                                                })
                                            ) : ''}
                                            
                                        </div>
                                    
                                    

                                </div>

                                <div className="mobile-view relative w-[50%]  ">
                                    <img src={akun_icon} width="25px" className="float-left" />
                                    <span className="text-lg font-bold">&nbsp;Akun Saya</span>
                                    
                                    

                                </div>

                                


                                




                            </div>

                                <div className="mobile-hide relative mt-[26rem] bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[80%] mb-10 mx-12 ml-[10%] ...">
                                    <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-red-700">AKUN DEMO MT5</span></a><br/>
                                    <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-black">BUAT AKUN DEMO</span></a>
                                    
                                    <div className="grid grid-cols-3 gap-4 px-5  mt-2">

                                        {akun_trading_demo ? (
                                        akun_trading_demo.map((at, index) => {
                                            return (

                                                <div className="rounded-2xl border border-solid border-gray-300 text-left p-4" style={{ backgroundColor:"#F1F1F1"}}>
                                                    <span className="text-red-500">#{at.login}</span>
                                                    <div className="grid grid-cols-2">
                                                        <div className="font-bold">NO AKUN</div>
                                                        <div className="font-bold">NAME</div>
                                                        <div>{at.login}</div>
                                                        <div>{at.name}</div>
                                                    </div>
                                                </div>


                                            );
                                        })
                                    ) : ''}


                                    </div>
                                </div>


                                <div className="mobile-view  relative mt-[0rem] bg-white text-black text-center rounded-2xl shadow-lg  py-10 w-[100%] ..." >
                                    <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-black">BUAT AKUN TRADING BARU</span></a>
                                        <div className="grid grid-cols-1 gap-4 px-5  mt-2">

                                                {akun_trading ? (
                                                akun_trading.map((at, index) => {
                                                    return (

                                                        <div className="border border-solid border-gray-300 text-left p-4 rounded-2xl" style={{ backgroundColor:"#F1F1F1"}}>
                                                            <span className="text-red-500">#{at.login}</span>
                                                            <div className="grid grid-cols-2">
                                                                <div className="font-bold">NO AKUN</div>
                                                                <div className="font-bold">FREE MARGIN</div>
                                                                <div>{at.login}</div>
                                                                <div><NumberFormat
                                                                                        value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    /></div>
                                                                <div className="font-bold">EQUITY</div>
                                                                <div className="font-bold">LEVERAGE</div>
                                                                <div><NumberFormat
                                                                                        value={at.equity > 0 ? at.equity : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    /></div>
                                                                <div><NumberFormat
                                                                                        value={at.leverage > 0 ? at.leverage : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    /></div>
                                                            </div>
                                                        </div>

                                                        );
                                                })
                                            ) : ''}
                                            
                                        </div>
                                    
                                    

                                </div>

                                <div className="mobile-view relative mt-[2rem]  bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10 mx-1 ...">
                                    <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-red-700">AKUN DEMO MT5</span></a><br/>
                                    <a href="account-type" className="btn btn-lgreen btn-sm"><span className="font-bold text-black">BUAT AKUN DEMO</span></a>
                                    
                                    <div className="grid grid-cols-1 gap-4 px-5  mt-2">

                                        {akun_trading_demo ? (
                                        akun_trading_demo.map((at, index) => {
                                            return (

                                                <div className="rounded-2xl border border-solid border-gray-300 text-left p-4" style={{ backgroundColor:"#F1F1F1"}}>
                                                    <span className="text-red-500">#{at.login}</span>
                                                    <div className="grid grid-cols-2">
                                                        <div className="font-bold">NO AKUN</div>
                                                        <div className="font-bold">NAME</div>
                                                        <div>{at.login}</div>
                                                        <div>{at.name}</div>
                                                    </div>
                                                </div>


                                            );
                                        })
                                    ) : ''}


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