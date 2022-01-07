import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { regUser, verifUser, userSelector, clearState, getCabang, getMarketing, completeData } from '../features/main/mainSlice'
import Button from '../components/button/Button';
import { Col, Form } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

import { SelectTgl, SelectBln, SelectThn } from '../components/modal/SelectTgl';

const Register = () => {

    const { isFetching, isSuccess, errorMessage, isVerifikasi, user_id, isCompleteProfile, succesCompleteProfile } = useSelector(
        userSelector
    );
    const history = useHistory();
    const dispatch = useDispatch();

    const initData = { kode_verifikasi: '', nama_depan: '', nama_belakng: '', tgl: '', bln: '', thn: '', cabang: '', marketing: '', tanggal_lahir: '', myCaptcha: '', ref_code: '' };
    const errorValidate = { kode_verifikasi: '', nama_depan: '', nama_belakng: '', tgl: '', bln: '', thn: '', cabang: '', marketing: '', myCaptcha: '', ref_code: '' };
    const [selected, setSelected] = useState(initData);
    const [errMsg, setErrMsg] = useState(errorValidate);

    useEffect(() => {
        //dispatch(getCabang());
        return () => {
            dispatch(clearState());

        };
    }, [dispatch]);

    useEffect(() => {
        if (isSuccess) {
            dispatch(clearState());
            //history.push('/');
        }
    }, [isSuccess, dispatch, history]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            konfirmasi_password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Please enter email').email('Please enter a valid email'),
            password: Yup.string()
                .required('Please provide a password').min(8, "Minimum 8 characters"),
            konfirmasi_password: Yup.string().required("Required!")
                .oneOf([Yup.ref("password")], "Password's not match")

        }),
        onSubmit: (values) => {
            dispatch(regUser(values));
        }
    });

    const handleChange = event => {
        const { name, value } = event.target
        var val = value;
        setSelected({
            ...selected,
            [name]: val
        });

        if (name === 'cabang') {
            const queryString = {
                'kode_cabang': val
            }
            dispatch(getMarketing(queryString));

        }
        dispatch(clearState());
    }

    const handleSubmit = () => {
        var error = '';
        if (selected.kode_verifikasi === null || selected.kode_verifikasi === "") {
            error = { ...error, kode_verifikasi: "Required!" };
        }
        setErrMsg(error);
        const queryString = {
            ...selected,
            user_id: user_id,
        }
        //console.log(queryString);
        if (!error) dispatch(verifUser(queryString));;
    }

    const handleSubmit2 = () => {
        var error = '';
        if (selected.nama_depan === null || selected.nama_depan === "") {
            error = { ...error, nama_depan: "Required!" };
        }
        if (selected.nama_belakng === null || selected.nama_belakng === "") {
            error = { ...error, nama_belakng: "Required!" };
        }
        // if (selected.cabang === null || selected.cabang === "") {
        // error = { ...error, cabang: "Required!" };
        // }
        // if (selected.marketing === null || selected.marketing === "") {
        // error = { ...error, marketing: "Required!" };
        // }
        setErrMsg(error);
        const tglLahir = selected.thn + '-' + selected.bln + '-' + selected.tgl;
        const queryString = {
            ...selected,
            user_id: user_id,
            tanggal_lahir: tglLahir,
            ref_code: selected.ref_code ? selected.ref_code : ''
        }
        //console.log(queryString);
        if (!error) dispatch(completeData(queryString));;
    }

    function handleChangeCaptcha(value) {
        setSelected({
            ...selected,
            "myCaptcha": value
        });
        console.log("Captcha value:", value);
    }

    function handleExpired() {
        const recaptchaValue = recaptchaRef.current.getValue();
        setSelected({
            ...selected,
            "myCaptcha": recaptchaValue
        });
        console.log("recaptchaValue:", recaptchaValue);

    }
    const recaptchaRef = React.createRef();

    const hideAlert = () => { dispatch(clearState()) }
    document.getElementById('root').classList = 'hold-transition login-page';

    const frmUser = <Form id="myForm">
        <Form.Group controlId="kode_verifikasi">
            <Form.Label>Silakan masukkan kode aktivasi yang dikirim ke email Anda </Form.Label>
            {errMsg.kode_verifikasi ?
                (<span className="float-right text-error badge badge-danger">{errMsg.kode_verifikasi}</span>) : ''}
            <Form.Control
                size="sm"
                autoComplete="off"
                name="kode_verifikasi"
                type="text"
                value={selected.kode_verifikasi}
                onChange={handleChange}
                placeholder="123456" />

        </Form.Group>

        <div className="social-auth-links text-center mt-2 mb-3">
            <Button
                block
                onClick={handleSubmit}
                isLoading={isFetching}
                theme="success"
            >
                Lanjut Registrasi
            </Button>
        </div>
    </Form>;

    const frmUser2 = <Form id="myForm2">
        <Form.Group controlId="nama_depan">
            <Form.Label>Nama Depan </Form.Label>
            {errMsg.nama_depan ?
                (<span className="float-right text-error badge badge-danger">{errMsg.nama_depan}</span>) : ''}
            <Form.Control
                size="sm"
                autoComplete="off"
                name="nama_depan"
                type="text"
                value={selected.nama_depan}
                onChange={handleChange}
                placeholder="Nama Depan" />

        </Form.Group>
        <Form.Group controlId="nama_belakng">
            <Form.Label>Nama Belakang </Form.Label>
            {errMsg.nama_belakng ?
                (<span className="float-right text-error badge badge-danger">{errMsg.nama_belakng}</span>) : ''}
            <Form.Control
                size="sm"
                autoComplete="off"
                name="nama_belakng"
                type="text"
                value={selected.nama_belakng}
                onChange={handleChange}
                placeholder="Nama Belakang" />
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col} controlId="tgl">
                <Form.Label>Tgl.Lahir</Form.Label>
                {errMsg.tgl ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.tgl}
                    </span>) : ''}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="tgl"
                    value={selected.tgl ? selected.tgl : ''}
                    onChange={handleChange}
                    as="select">
                    <SelectTgl />
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="bln">
                <Form.Label>Bulan</Form.Label>
                {errMsg.bln ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.bln}
                    </span>) : ''}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="bln"
                    value={selected.bln ? selected.bln : ''}
                    onChange={handleChange}
                    as="select">
                    <SelectBln />
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="thn">
                <Form.Label>Tahun</Form.Label>
                {errMsg.thn ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.thn}
                    </span>) : ''}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="thn"
                    value={selected.thn ? selected.thn : ''}
                    onChange={handleChange}
                    as="select">
                    <SelectThn />
                </Form.Control>
            </Form.Group>
        </Form.Row>

        {/* <Form.Row>
            <Form.Group as={Col} controlId="cabang">
                <Form.Label>Cabang</Form.Label>
                {errMsg.cabang ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.cabang}
                    </span>) : ''}
                <Form.Control
                    size="sm"
                    autoComplete="off"
                    name="cabang"
                    value={selected.cabang}
                    onChange={handleChange}
                    as="select">
                    <option value="">Cabang</option>
                    {dataCabang ? (
                        dataCabang.map(function (cabang) {
                            return <option
                                value={cabang.cabang_id}
                                key={cabang.cabang_id}>{cabang.nama_cabang}
                            </option>
                        })

                    ) : ''}
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="marketing">
                <Form.Label>Marketing</Form.Label>
                {errMsg.marketing ?
                    (<span className="float-right text-error badge badge-danger">{errMsg.marketing}
                    </span>) : ''}
                <Form.Control
                    disabled={selected.cabang ? false : true}
                    size="sm"
                    autoComplete="off"
                    name="marketing"
                    value={selected.marketing ? selected.marketing : ''}
                    onChange={handleChange}
                    as="select">
                    <option value="">Marketing</option>
                    {dataMarketing ? (
                        dataMarketing.map(function (marketing) {
                            return <option
                                value={marketing.user_id}
                                key={marketing.user_id}>{marketing.nama_depan + ' ' + marketing.nama_belakang}
                            </option>
                        })

                    ) : ''}
                </Form.Control>
            </Form.Group>

        </Form.Row>  */}
        <Form.Group controlId="ref_code">
            <Form.Label>Kode Referensi </Form.Label>
            {errMsg.ref_code ?
                (<span className="float-right text-error badge badge-danger">{errMsg.ref_code}</span>) : ''}
            <Form.Control
                size="sm"
                autoComplete="off"
                name="ref_code"
                type="text"
                value={selected.ref_code}
                onChange={handleChange}
                placeholder="Kode Referensi" />
        </Form.Group>
        <div className="social-auth-links text-center mt-2 mb-3">
            <Button
                block
                onClick={handleSubmit2}
                isLoading={isFetching}
                theme="success"
            >
                Daftar
            </Button>
        </div>
    </Form>;

    return (

        <div className="login-box">
            <div className="card card-outline card-success">
                <div className="card-header text-center h1">
                    <b>Magnet</b>
                </div>
                <div className="card-body">
                    {

                        errorMessage ? (
                            <div className="alert alert-danger alert-sm" >
                                <button onClick={hideAlert} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <span className="fw-semi-bold text-error-login">Error: {errorMessage}</span>
                            </div>
                        ) : (<p className='login-box-msg'></p>)}

                    {!isCompleteProfile && !isVerifikasi && !succesCompleteProfile ? (<form onSubmit={formik.handleSubmit}>
                        {formik.touched.email && formik.errors.email ? (
                            <span className="float-right text-error badge badge-danger">{formik.errors.email}</span>
                        ) : null}
                        <div className="input-group mb-3">
                            <input
                                autoFocus
                                autoComplete="off"
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                {...formik.getFieldProps('email')} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user" />
                                </div>
                            </div>

                        </div>

                        {formik.touched.password &&
                            formik.errors.password ? (
                            <span className="float-right text-error badge badge-danger">{formik.errors.password}</span>
                        ) : null}
                        <div className="input-group mb-3">
                            <input
                                autoComplete="off"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                {...formik.getFieldProps('password')} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>

                        {formik.touched.konfirmasi_password &&
                            formik.errors.konfirmasi_password ? (
                            <span className="float-right text-error badge badge-danger">{formik.errors.konfirmasi_password}</span>
                        ) : null}
                        <div className="input-group mb-3">
                            <input
                                autoComplete="off"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                {...formik.getFieldProps('konfirmasi_password')} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock" />
                                </div>
                            </div>
                        </div>
                        <ReCAPTCHA
                            hl="id"
                            ref={recaptchaRef}
                            sitekey="6LfEKfEcAAAAAGH6QCdvmj3wSSzFSyw0dbIoSmpK"
                            onChange={handleChangeCaptcha}
                            onExpired={handleExpired}
                        />
                        <div className="social-auth-links text-center mt-2 mb-3">
                            <Button
                                disabled={selected.myCaptcha ? false : true}
                                block
                                type="submit"
                                isLoading={isFetching}
                                theme="success"
                            >
                                Lanjut Registrasi
                            </Button>
                        </div>
                    </form>) : ''}

                    {isVerifikasi ? frmUser : ''}
                    {isCompleteProfile ? frmUser2 : ''}
                    {succesCompleteProfile ? (<h4><p className='login-box-msg'>Pendaftaran berhasil, <a href="login" className="text-center">Silahkan login</a></p></h4>) : ''}
                    {!succesCompleteProfile ? (<a href="login" className="text-center">I already have a membership</a>) : ''}

                </div>
            </div>
        </div >

    )
};

export default Register;