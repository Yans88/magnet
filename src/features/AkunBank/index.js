import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
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
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Akun Bank Saya</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px" }}>
                                    <div className="card-body">

                                        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 5 }}>
                                            <h3 className="mb-5">Akun Bank Pengguna </h3>
                                            <div className="row">
                                                {data_bank ? (
                                                    data_bank.map((dp, index, arr) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="col-sm-6 col-md-3 mb-3">

                                                                    <div className="box-bank" style={{ height: 250 }}>
                                                                        <div className="box-bank__media">
                                                                            <img alt={dp.nama_bank} src={dp.file} style={{ height: 80 }} />
                                                                        </div>
                                                                        <h3 className="box-bank__title">{dp.nama_bank}</h3>
                                                                        <p>{dp.nama_pemilik}</p>
                                                                        <AppButton
                                                                            className="btn-akun-bank"
                                                                            style={{ color: '#ffffff' }}
                                                                            type="button"
                                                                            size="lg"
                                                                            theme="success">{dp.no_rek}</AppButton>
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