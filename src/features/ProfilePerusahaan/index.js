import React, { Component } from 'react'
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import { getDataPP, chgProps, simpanDataPP } from './ppSlice';
import { profileUser } from '../main/mainSlice';

class ProfilePerusahaan extends Component {
    constructor(props) {
        super(props);
        this.initData = {
            agree1: '',
            agree2: '',
        }
        this.state = {
            lastSegmentUrl: "",
			data_tipe_akun_id:"",
			act :"",
            errMsg1: this.initData,
        }
    }

    componentDidMount = async () => {
		const act = sessionStorage.getItem('act_tipe_akun_id');
		const selectedId = sessionStorage.getItem('data_tipe_akun_id');
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName, act : act, data_tipe_akun_id:selectedId })
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        value = evt.target.checked ? 'Y' : 'N';

        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleSubmit(action) {
		
        var errors = this.state.errMsg1;
        errors.agree1 = this.props.persetujuan.agree1 === 'N' || !this.props.persetujuan.agree1 ? "Kolom ini harus diisi" : '';
        errors.agree2 = this.props.persetujuan.agree2 === 'N' || !this.props.persetujuan.agree2 ? "Kolom ini harus diisi" : '';
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg1)) {
			const qs = {
				...this.state,
				...this.props.persetujuan,
			}
            this.props.onSave(qs);
            this.props.history.push('/');
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const { lastSegmentUrl, errMsg1 } = this.state;
        const { wakil_pialang, persetujuan, akun_terpisah, susunan_pengurus, susunan_saham, legalitas_perusahaan, profile_perusahaan } = this.props;
       
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
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Profil Perusahaan</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25 }}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">PROFIL PERUSAHAAN PIALANG BERJANGKA</h3>

                                                        <div>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>Nama</dt>
                                                                <dd>{profile_perusahaan.perusahaan}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>Alamat</dt>
                                                                <dd><div dangerouslySetInnerHTML={{ __html: profile_perusahaan.alamat }} /></dd>
																
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>No. Telepon</dt>
                                                                <dd>{profile_perusahaan.telp}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>Fax</dt>
                                                                <dd>{profile_perusahaan.fax}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>Email</dt>
                                                                <dd>{profile_perusahaan.email}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>Website</dt>
                                                                <dd>{profile_perusahaan.website}</dd>
                                                            </dl>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">LEGALITAS</h3>

                                                        <div>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>NOMOR IZIN USAHA BAPPEBTI</dt>
                                                                <dd>{legalitas_perusahaan.nomer_izin_bappebti}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>NOMOR KEANGGOTAAN BKDI</dt>
                                                                <dd>{legalitas_perusahaan.nomer_anggota_bkdi}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>NOMOR KEANGGOTAAN ICH</dt>
                                                                <dd>{legalitas_perusahaan.nomer_anggota_ich}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>NOMOR DAN TANGGAL PERSETUJUAN PESERTA PERDAGANGAN ALTERNATIF</dt>
                                                                <dd>{legalitas_perusahaan.perdagangan_alternatif}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>NAMA PENYELENGGARA SISTEM PERDAGANGAN ALTERNATIF</dt>
                                                                <dd>{legalitas_perusahaan.nama_penyelenggara}</dd>
                                                            </dl>
                                                            <br />
                                                            <br />

                                                            <br />
                                                            <br />
                                                            <br />
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">NAMA-NAMA WAKIL PIALANG PERUSAHAAN DITUNJUK KHUSUS UNTUK VERIFIKASI</h3>
                                                        <ol className="mb-0">
                                                            {wakil_pialang ? (
                                                                wakil_pialang.map(function (wp, index) {
                                                                    return <li key={index}>{wp.nama_depan + ' ' + wp.nama_belakang}</li>
                                                                })

                                                            ) : ''}

                                                        </ol>

                                                    </div>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">SUSUNAN PEMEGANG SAHAM PERUSAHAAN</h3>

                                                        <ol className="mb-0">
                                                            {susunan_saham ? (
                                                                susunan_saham.map(function (ss) {
                                                                    return <li key={ss.susunan_saham_perusahaan_id}>{ss.nama_susunan_saham_perusahaan}</li>
                                                                })

                                                            ) : ''}

                                                        </ol>
                                                    </div>
                                                    <br /><br />
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">SUSUNAN PENGURUS PERUSAHAAN</h3>
                                                        <div>
                                                            {susunan_pengurus ? (
                                                                susunan_pengurus.map(function (sp) {
                                                                    return <dl key={sp.susunan_pengurus_perusahaan_id} className="--style-data --style-horizontal">
                                                                        <dt>{sp.jabatan}</dt>
                                                                        <dd>{sp.nama}</dd>
                                                                    </dl>
                                                                })

                                                            ) : ''}

                                                        </div>
                                                    </div>

                                                    <br /><br />
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">NOMOR DAN ALAMAT EMAIL KETIKA TERJADI KELUHAN</h3>
                                                        <div>

                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>No. Telepon Dealing</dt>
                                                                <dd>{profile_perusahaan.telp_dealing}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>EMAIL</dt>
                                                                <dd>{profile_perusahaan.email_dealing}</dd>
                                                            </dl>
                                                            <hr className="mb-4" />
                                                            <dl className="--style-data --style-horizontal">
                                                                <dt>No. Telepon Compliance</dt>
                                                                <dd>{profile_perusahaan.telp_compliance}</dd>
                                                            </dl>
                                                            <dl className="--style-data --style-horizontal mb-0">
                                                                <dt>EMAIL</dt>
                                                                <dd>{profile_perusahaan.email_compliance}</dd>
                                                            </dl>
                                                        </div>
                                                    </div>

                                                    <br /><br />
                                                    <div className="alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">Akun Terpisah</h3>
                                                        <ul>
                                                            {akun_terpisah ? (
                                                                akun_terpisah.map(function (ap, index) {
                                                                    return <li key={index}>
                                                                        <dl className="--style-data">
                                                                            <dt>{ap.nama_akun_terpisah}</dt>
                                                                            <dd>No. Acc. : {ap.no_akun_terpisah}</dd>
                                                                        </dl>
                                                                    </li>
                                                                })

                                                            ) : ''}


                                                        </ul>

                                                    </div>

                                                </div>
                                            </div>

                                            <div className="form-group" style={{ marginTop: '3em' }}>
                                                <div className="form-check p-0 mt-2">
                                                    {errMsg1.agree2 ? (<span className="text-error badge badge-danger">{errMsg1.agree2}</span>) : ''}
                                                    <label>
                                                        <input
                                                            checked={persetujuan.agree1 === 'Y' ? true : false}
                                                            onChange={this.handleChange.bind(this)}
                                                            className="form-check-input" type="checkbox" name="agree1" />
                                                        <div className="form-check-text">Dengan mencentang kotak ini, saya menyatakan bahwa saya telah membaca dan mengakui sepenuhnya informasi yang diberikan pada PROFIL PERUSAHAAN PIALANG, sepenuhnya membaca, dan memahami isinya.
                                                        </div>

                                                    </label>

                                                </div>
                                            </div>

                                        </div>


                                        <div className="container__box p-4" style={{ backgroundColor: '#fbfbfd', margin: '1em -1.5em -1.5em' }}>
                                            <div className="form-group">
                                                <div className="form-check">
                                                    {errMsg1.agree2 ? (<span className="text-error badge badge-danger">{errMsg1.agree2}</span>) : ''}
                                                    <label>
                                                        <input
                                                            checked={persetujuan.agree2 === 'Y' ? true : false}
                                                            onChange={this.handleChange.bind(this)}
                                                            className="form-check-input" type="checkbox" name="agree2" />
                                                        <div className="form-check-text">Dengan mencentang kotak ini, saya dengan ini mengakui bahwa semua informasi dan dokumen yang disediakan dalam aplikasi Online untuk pembukaan akun transaksi adalah benar dan valid.saya dengan ini bertanggung jawab penuh atas setiap kerusakan / kerugian di masa depan sebagai akibat dari informasi palsu dari dokumen yang saya sediakan.</div>

                                                    </label>
                                                </div>

                                                <AppButton
                                                    style={{ color: '#ffffff' }}
                                                    onClick={this.handleSubmit.bind(this)}
                                                    type="button"
                                                    size="lg"
                                                    theme="warning">Submit Form</AppButton>
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
    profile_perusahaan: state.companyProfile.profile_perusahaan || {},
    legalitas_perusahaan: state.companyProfile.legalitas_perusahaan || {},
    susunan_saham: state.companyProfile.susunan_saham || [],
    susunan_pengurus: state.companyProfile.susunan_pengurus || [],
    akun_terpisah: state.companyProfile.akun_terpisah || [],
    wakil_pialang: state.companyProfile.wakil_pialang || [],
    persetujuan: state.companyProfile.persetujuan || {},
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
			dispatch(profileUser());
            dispatch(getDataPP());
        },
        onSave: (param) => {
			dispatch(profileUser());
            dispatch(simpanDataPP(param));
        },
        changeProps: (param) => {
            dispatch(chgProps(param));
        },

    }
}
export default connect(mapStateToProps, mapDispatchToPros)(ProfilePerusahaan);