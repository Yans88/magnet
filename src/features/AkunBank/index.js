import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import icon from '../../assets/akun_bank_ijo.svg';
import { getBankAkun, getAkunTrading, actionPenarikan, closeForm } from '../Penarikan/penarikanSlice';
import { profileUser } from '../main/mainSlice'

class AkunBank extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            nominal: '',
            akun_trading: '',
            akun_bank: '',
            penarikan_dana_id: ''
        }
        this.state = {
            lastSegmentUrl: "",
            formMT5: false,
            nextStep: false,
            nextStep1: false,
            selected: this.initSelected,
            errMsg: this.initSelected,
            start: 1,
            limit: 10,
            search: ''
        }
    }

    componentDidMount = async () => {
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    render() {
        const { data_bank } = this.props;
        return (
            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid mt-3">
                        <img src={icon} width="35px" className="float-left mt-3" />
                        
                        <div className="mobile-hide">
                        <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Akun Bank Saya</h1>
                        </div>

                        <div className="mobile-view">
                        <h1 style={{ marginBottom: 10, fontSize: 20, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Akun Bank Saya</h1>
                        </div>

                        <div className="row mt-4">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg w-[100%] lg:w-[100%]" style={{ "minHeight": "500px",borderRadius:"20px" }}>
                                    <div className="card-body">

                                        <div style={{ paddingTop: 0 }} className="px-0 lg:px-3" >
                                            
                                            <div className="row my-0 mx-0">
                                                {data_bank ? (
                                                    data_bank.map((dp, index, arr) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="mobile-hide">
                                                                    <div className="grid grid-cols-3 place-items-center mt-0  py-4 px-1  lg:px-4 rounded-2xl mt-4" style={{ border:"2px solid #ddd",color:"#2E2E2F"}}>
                                                                        
                                                                        <div className="px-2 lg:w-1/2">
                                                                            <img alt={dp.nama_bank} src={dp.file} />
                                                                        </div>
                                                                        
                                                                        <div className="px-2 text-left lg:w-1/2">
                                                                            <h3 className="box-bank__title" style={{ fontSize: 18 }}>Nama Bank : {dp.nama_bank}</h3>
                                                                            <p style={{ fontSize: 15 }}>Nama Pemilik : {dp.nama_pemilik}</p>
                                                                            <p style={{ fontSize: 15 }}>No. Rekening : {dp.no_rek}</p>
                                                                            <p style={{ fontSize: 15 }}>Cabang : {dp.cabang}</p>
                                                                        </div>										

                                                                        

                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="mobile-view">
                                                                    <div className="grid grid-cols-2 place-items-center mt-0  py-4 px-1  lg:px-4 rounded-2xl mt-4" style={{ border:"2px solid #ddd",color:"#2E2E2F"}}>
                                                                        
                                                                        
                                                                        <div className="px-2 w-[60%] col-span-2">
                                                                            <img alt={dp.nama_bank} src={dp.file} />
                                                                        </div>
                                                                        
                                                                        <div className="px-2 text-left w-full col-span-2 mt-4">
                                                                            
                                                                            <div className="grid grid-cols-3">
                                                                                 <div className="col-span-1">
                                                                                    Nama bank
                                                                                 </div>
                                                                                 <div className="col-span-2">
                                                                                    : <span className="font-semibold">{dp.nama_bank}</span>
                                                                                 </div>
                                                                            </div>

                                                                            <div className="grid grid-cols-3">
                                                                                 <div className="col-span-1">
                                                                                    Nama Pemilik
                                                                                 </div>
                                                                                 <div className="col-span-2">
                                                                                    : <span className="font-semibold">{dp.nama_pemilik}</span>
                                                                                 </div>
                                                                            </div>

                                                                            <div className="grid grid-cols-3">
                                                                                 <div className="col-span-1">
                                                                                    No Rekening
                                                                                 </div>
                                                                                 <div className="col-span-2">
                                                                                    : <span className="font-semibold">{dp.no_rek}</span>
                                                                                 </div>
                                                                            </div>

                                                                        </div>

                                                                        <div style={{ fontSize: 30 }} className="px-2 pt-4 lg:pt-0 col-span-2">
                                                                            <AppButton
                                                                                className="btn-akun-bank"
                                                                                style={{ color: '#ffffff' }}
                                                                                type="button"
                                                                                size="lg"
                                                                                theme=""
                                                                                style={{ backgroundColor:"#C3262A",color:"#fff"}}

                                                                            >{dp.no_rek}</AppButton>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                
                                                            </Fragment>
                                                        )
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
    data_bank: state.penarikan.dataBank || [],
    akun_trading: state.penarikan.akunTrading || [],
    data_history: state.penarikan.dataHistory || [],
    totalData: state.penarikan.totalData,
    contentMsg: state.penarikan.contentMsg || null,
    showFormSuccess: state.penarikan.showFormSuccess,
    tipeSWAL: state.penarikan.tipeSWAL,
    isLoading: state.penarikan.isFetching,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
			dispatch(profileUser());
            dispatch(getBankAkun());
            dispatch(getAkunTrading());
        },

        onSetor: (param) => {
			dispatch(profileUser());
            dispatch(actionPenarikan(param));
        },
        closeSwalError: () => {
            dispatch(closeForm());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(AkunBank);