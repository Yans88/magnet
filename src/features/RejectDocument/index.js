import React, { Component } from 'react'
import { connect } from 'react-redux';
import "moment/locale/id";
import { getRejDoc, chgProps, simpanRejDoc, closeSwal } from './rejectDocSlice'
import AppButton from '../../components/button/Button';
import { Form } from 'react-bootstrap';
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';

class RejecctDocument extends Component {
    constructor(props) {
        super(props);

        this.initData = {

        }

        this.state = {
            data_pribadi: {},
            kekayaan: {},
            kontak_darurat: {},
            data_pekerjaan: {},
            akun_bank: {},
            pengalaman_trading: {},
            show: false,
            errMsg1: this.initData,
        }

    }

    componentDidMount = async () => {
        await this.props.onLoad();
    }

    handleChange(nama_groups, evt) {
        const { name, value } = evt.target;
        if (nama_groups === 'data_pribadi') {
            this.setState({
                data_pribadi: {
                    ...this.state.data_pribadi,
                    [name]: value
                }
            });
        }
        if (nama_groups === 'kekayaan') {
            this.setState({
                kekayaan: {
                    ...this.state.kekayaan,
                    [name]: value
                }
            });
        }
        if (nama_groups === 'kontak_darurat') {
            this.setState({
                kontak_darurat: {
                    ...this.state.kontak_darurat,
                    [name]: value
                }
            });
        }
        if (nama_groups === 'data_pekerjaan') {
            this.setState({
                data_pekerjaan: {
                    ...this.state.data_pekerjaan,
                    [name]: value
                }
            });
        }
        if (nama_groups === 'akun_bank') {
            this.setState({
                akun_bank: {
                    ...this.state.akun_bank,
                    [name]: value
                }
            });
        }
        if (nama_groups === 'pengalaman_trading') {
            this.setState({
                pengalaman_trading: {
                    ...this.state.pengalaman_trading,
                    [name]: value
                }
            });
        }
    }

    handlesubmit() {
        const saveData = [];
        var field_pribadi = [];
        var field_kekayaan = [];
        var field_kontak_darurat = [];
        var field_data_kerja = [];
        var field_akun_bank = [];
        var field_pengalaman_trading = [];
        for (let [key, value] of Object.entries(this.state.data_pribadi)) {
            let dt = {
                field: key,
                value: value,
                note: 1
            }
            field_pribadi.push(dt);
        }
        for (let [key, value] of Object.entries(this.state.kekayaan)) {
            let dt2 = {
                field: key,
                value: value,
                note: 1
            }
            field_kekayaan.push(dt2);
        }
        for (let [key, value] of Object.entries(this.state.kontak_darurat)) {
            let dt3 = {
                field: key,
                value: value,
                note: 1
            }
            field_kontak_darurat.push(dt3);
        }
        for (let [key, value] of Object.entries(this.state.data_pekerjaan)) {
            let dt4 = {
                field: key,
                value: value,
                note: 1
            }
            field_data_kerja.push(dt4);
        }
        for (let [key, value] of Object.entries(this.state.akun_bank)) {
            let dt5 = {
                field: key,
                value: value,
                note: 1
            }
            field_akun_bank.push(dt5);
        }
        for (let [key, value] of Object.entries(this.state.pengalaman_trading)) {
            let dt6 = {
                field: key,
                value: value,
                note: 1
            }
            field_pengalaman_trading.push(dt6);
        }
        let post_dt = '';
        if (field_pribadi.length > 0) {
            post_dt = { nama_group: "data_pribadi", data_field: field_pribadi }
            saveData.push(post_dt);
        }
        if (field_kekayaan.length > 0) {
            post_dt = { nama_group: "kekayaan", data_field: field_kekayaan }
            saveData.push(post_dt);
        }
        if (field_kontak_darurat.length > 0) {
            post_dt = { nama_group: "kontak_darurat", data_field: field_kontak_darurat }
            saveData.push(post_dt);
        }
        if (field_data_kerja.length > 0) {
            post_dt = { nama_group: "data_pekerjaan", data_field: field_data_kerja }
            saveData.push(post_dt);
        }
        if (field_akun_bank.length > 0) {
            post_dt = { nama_group: "akun_bank", data_field: field_akun_bank }
            saveData.push(post_dt);
        }
        if (field_pengalaman_trading.length > 0) {
            post_dt = { nama_group: "pengalaman_trading", data_field: field_pengalaman_trading }
            saveData.push(post_dt);
        }
        if (saveData.length > 0) {
            this.props.onSave(saveData);
        }
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    render() {

        const { user, dataRejDoc, isFetching } = this.props;

        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Data yang Anda masukkan salah</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                                            <Form>
                                                {dataRejDoc ? dataRejDoc.map((dr, index) => {
                                                    return (
													<div key={index}>
                                                        <h4>{dr.nama_group}</h4><br />
                                                        {dr.data_field.map((df, ix) => {
                                                            return (<div key={df.field}>
                                                                <Form.Group controlId={df.field}>
                                                                    <Form.Label>{df.field}</Form.Label>
                                                                    <Form.Control
                                                                        autoComplete="off"
                                                                        onChange={this.handleChange.bind(this, dr.nama_group)}
                                                                        size="lg"
                                                                        name={df.field}
                                                                        type="text"
                                                                        required
                                                                        placeholder={df.field} />
                                                                    <div style={{ color: "red" }}>{df.note}</div>
                                                                </Form.Group>

                                                            </div>)
                                                        })}



                                                    </div>

                                                    )
                                                }

                                                ) : ''}
                                            </Form>
                                            {dataRejDoc.length > 0 ? (
												<div style={{ textAlign: 'center' }}>
                                                    <strong>
                                                        Dengan mendaftar saya menyetujui <br /> syarat dan kebijakan privasi

                                                    </strong>
                                                    <br /><br />
                                                    <AppButton
                                                        onClick={this.handlesubmit.bind(this)}
                                                        isLoading={this.props.isAddLoading}
                                                        style={{ color: '#ffffff', marginRight: 5 }}
                                                        type="button"
                                                        size="lg"
                                                        theme="danger">Selanjutnya</AppButton>
                                                </div>
											) : (<h3>No Data</h3>)
                                            }
                                        </div>


                                    </div>
                                    {this.props.showFormSuccess ? (<AppSwalSuccess
                                        show={this.props.showFormSuccess}
                                        title={<div dangerouslySetInnerHTML={{ __html: this.props.contentMsg }} />}
                                        type={this.props.tipeSWAL}
                                        handleClose={this.props.closeSwal}
                                    >
                                    </AppSwalSuccess>) : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div >



        )
    }
}
const mapStateToProps = (state) => ({
    dataRejDoc: state.rejDoc.dataRejDoc || [],
    isFetching: state.rejDoc.isFetching,
    showFormSuccess: state.rejDoc.showFormSuccess,
    contentMsg: state.rejDoc.contentMsg,
    tipeSWAL: state.rejDoc.tipeSWAL,
    isAddLoading: state.rejDoc.isAddLoading,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(getRejDoc());
        },
        changeProps: (param) => {
            dispatch(chgProps(param));
        },
        onSave: (param) => {
            dispatch(simpanRejDoc(param));
        },
        closeSwal: () => {       
            dispatch(closeSwal());
            dispatch(getRejDoc());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(RejecctDocument);