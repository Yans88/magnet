import React, { Component } from 'react'
import AppButton from '../../components/button/Button';
import { connect } from 'react-redux';
import { getSetting, getKT, chgProps, simpanDataKT } from './ktSlice';
import { profileUser } from '../main/mainSlice'

class KetentuanTrading extends Component {
    constructor(props) {
        super(props);
        this.initDataPribadi = {
            agree: '',
        }
        this.state = {
            lastSegmentUrl: "",
            errMsg: this.initDataPribadi,
        }
    }

    componentDidMount = async () => {
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit1() {
        var errors = this.state.errMsg;
        errors.agree = !this.props.dataKetentuanTrading.agree ? "Kolom ini harus diisi" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg)) {
            this.props.saveDataKT(this.props.dataKetentuanTrading);
            this.props.history.push("/company_profile");
        } else {
            console.error('Invalid Form')
        }
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;

        const dt = {};
        if (name === "agree") {
            value = evt.target.checked ? 'Y' : 'N';
        }
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    render() {
        const { lastSegmentUrl, errMsg } = this.state;
        const { dataSetting, dataKetentuanTrading } = this.props;
        console.log(dataSetting);
        return (

            <div className="content-wrapper">
                <div className="content-area__edge">
                    <ul className="list-unstyled list-steps mb-0">
                        <li className={lastSegmentUrl === "personal" ? "active default" : "default"}><a href="personal">Informasi Pribadi</a></li>
                        <li className={lastSegmentUrl === "account-type" ? "active default" : "default"}><a href="account-type"><span />Tipe Akun</a></li>
                        <li className={lastSegmentUrl === "decleration" ? "active default" : "default"}><a href="decleration"><span />Pernyataan</a></li>
                        <li className={lastSegmentUrl === "trading_rules" ? "active default" : "default"}><a href="trading_rules"><span />Peraturan Trading</a></li>
                        <li className={lastSegmentUrl === "company_profile" ? "active default" : "default"}><a href="company_profile"><span />Profil Perusahaan</a></li>
                    </ul>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Ketentuan Trading</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                                            <div className="alert alert-default alert-sm" style={{ backgroundColor: '#fbfbfd', border: '2px solid #DBD7D6' }} >
                                                {dataSetting ? (
                                                    dataSetting.map(function (dr) {
                                                        var res = '';
                                                        if (dr.nama_setting === "file-ketentuan-tradding") {
                                                            return <div key={dr.setting_id} dangerouslySetInnerHTML={{ __html: dr.value }} />
                                                        } else {
                                                            return res;
                                                        }
                                                        //https://new.vifx.co/assets/cabinet/_ui/pdf/trvifregularforex.pdf

                                                    })

                                                ) : ''}
                                            </div>
                                        </div>
                                        <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '3em -1.5em -1.5em' }}>
                                            <div className="form-group">
                                                <div className="form-check">
                                                    {errMsg.agree ? (<span className="text-error badge badge-danger">{errMsg.agree}</span>) : ''}
                                                    <label>
                                                        <input
                                                            checked={dataKetentuanTrading.agree ? true : false}
                                                            onChange={this.handleChange.bind(this)} className="form-check-input" type="checkbox" name="agree" />
                                                        <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid.saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                    </label>
                                                </div>

                                                <AppButton
                                                    style={{ color: '#ffffff' }}
                                                    onClick={this.handleSubmit1.bind(this)}
                                                    type="button"
                                                    size="lg"
                                                    theme="warning">Selanjutnya</AppButton>


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
    dataSetting: state.dtSetting.dataSetting || [],
    dataKetentuanTrading: state.dtSetting.dataKetentuanTrading || {},
    isError: state.dtSetting.isError,
    errorMessage: state.dtSetting.errorMessage,
    isFetching: state.dtSetting.isFetching,
    isSuccess: state.dtSetting.isSuccess,
    user: state.main.currentUser,
})

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
			dispatch(profileUser());
            dispatch(getSetting());
            dispatch(getKT());
        },
        changeProps: (param) => {			
            dispatch(chgProps(param));
        },
        saveDataKT: (param) => {
			dispatch(profileUser());
            dispatch(simpanDataKT(param));
            dispatch(getKT());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(KetentuanTrading);