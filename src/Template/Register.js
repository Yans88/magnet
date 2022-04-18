import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { regUser, verifUser, userSelector, clearState, getCabang, getMarketing, completeData } from '../features/main/mainSlice'
import Button from '../components/button/Button';
import { Col, Form } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import banner from '../assets/image_1.svg';
import logoa from '../assets/logo.svg';
import email_icon from '../assets/email.svg';
import password_icon from '../assets/password.svg';


import { SelectTgl, SelectBln, SelectThn } from '../components/modal/SelectTgl';

const Register = () => {

    const { isFetching, isSuccess, errorMessage, isVerifikasi, user_id, isCompleteProfile, succesCompleteProfile } = useSelector(
        userSelector
    );
    const history = useHistory();
    const dispatch = useDispatch();

    const initData = { kode_verifikasi: '', nama_depan: '', nama_belakng: '', tgl: '', bln: '', thn: '', cabang: '', marketing: '', tanggal_lahir: '', myCaptcha: '', ref_code: '', email:'' };
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
        if (succesCompleteProfile) {
            dispatch(clearState());
            history.push('/login');
        }
    }, [succesCompleteProfile, dispatch, history]);

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
			
			setSelected({
				...selected,
				email: values.email
			});
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
        if (!error) dispatch(completeData(queryString));		
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
    document.getElementById('root').classList = 'hold-transition';

    const frmUser = <Form id="myForm">
        <Form.Group controlId="kode_verifikasi">
            <Form.Label>
                <div className="w-full mb-0 mt-0">
                    <div className="text-merah-button  text-lg text-center font-normal ">Verifikasi</div>
                </div>

                <div className="w-full mb-2 mt-2">
                    <div className="text-black  text-xs text-center font-normal">Silakan masukkan kode aktivasi yang dikirim ke email ? Anda {selected.email}</div>
                </div>
            </Form.Label>
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
            <div className="grid grid-cols-1 gap-0 place-items-center">
            <div className="w-full mb-2">
                <div className="text-black text-sm ">Belum menerima kode verifikasi?<a href="login" className="text-center italic text-hijau-forex"><br/> Kirim ulang kode aktivasi</a></div>
            </div>    
            <div className="w-2/4 mt-2">
                <Button
                    block
                    onClick={handleSubmit}
                    isLoading={isFetching}
                    theme=""
                    style={{ backgroundColor:"#C1242B",color:"#fff"}}
                >
                    Lanjut Registrasi
                </Button>
            </div>
            </div>
        </div>
    </Form>;

    const frmUser2 = <Form id="myForm2">
        <Form.Row>
        <Form.Group as={Col} controlId="nama_depan">
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
        <Form.Group as={Col} controlId="nama_belakng">
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
        </Form.Row>

        <Form.Row>
            <Form.Group as={Col} controlId="tgl">
                <Form.Label><span className="text-merah-button">Tanggal Lahir</span></Form.Label>
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
                <Form.Label>&nbsp;</Form.Label>
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
                <Form.Label>&nbsp;</Form.Label>
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
            <Form.Label><span className="text-merah-button">Referral code</span> </Form.Label>
            {errMsg.ref_code ?
                (<span className="float-right text-error badge badge-danger">{errMsg.ref_code}</span>) : ''}
            <Form.Control
                size="sm"
                autoComplete="off"
                name="ref_code"
                type="text"
                value={selected.ref_code}
                onChange={handleChange}
                placeholder="000" />
        </Form.Group>
        <div className="social-auth-links text-center mt-2 mb-3">
            <div className="grid grid-cols-1 gap-0 place-items-center">
                <div className="w-3/5">
                
				{succesCompleteProfile ? (
                    <Button
						block
						disabled={true}
						isLoading={isFetching}
						theme="danger"> Daftar </Button>                                            
					) : (
					<Button
						block
						onClick={handleSubmit2}
						isLoading={isFetching}
						theme="danger"> Daftar </Button>
					) }
                </div>
            </div>
        </div>
    </Form>;

    return (

        <div class="">
            <div class="w-full grid lg:grid-cols-2 gap-4 bg-white">

                <div className="overflow-hidden mobile-view">
                                <img src={banner} className="scale-100" />
                </div>

                <div className="grid grid-cols-1 gap-0 place-items-center">
                    <div className="login-box ">

                <div class="grid grid-cols-1 place-items-center">
                    <div className="card border-white">
                        <div className="card-header text-center h1 text-red-500 text-lg bg-white border-white grid grid-cols-1 place-items-center lg:mt-4">
                            <div class="grid grid-cols-1 place-items-center">
                                <img src={logoa} width="60%" />
                            </div>
                            <div><b><span className="text-merah-button font-bold text-lg">Daftar</span></b></div>
                        </div>
                        <div class="grid grid-cols-1 place-items-center">
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
                                    <div className="input-group mb-3" style={{border:"1px solid #B7B7B7",padding:"5px",borderRadius:"5px"}}>
                                        <div className="input-group-append">
                                            <div className="input-group-text bg-white border-white">
                                                <img src={email_icon} width="22px" />
                                            </div>
                                        </div>
                                        <input
                                            autoFocus
                                            autoComplete="off"
                                            type="text"
                                            className="form-control"
                                            placeholder="Email"
                                            style={{backgroundColor:"#fff",border:"0"}}
                                            {...formik.getFieldProps('email')} />
                                        

                                    </div>

                                    {formik.touched.password &&
                                        formik.errors.password ? (
                                        <span className="float-right text-error badge badge-danger">{formik.errors.password}</span>
                                    ) : null}
                                    <div className="input-group mb-3" style={{border:"1px solid #B7B7B7",padding:"5px",borderRadius:"5px"}}>
                                        <div className="input-group-append">
                                            <div className="input-group-text bg-white border-white">
                                                <img src={password_icon} width="22px" />
                                            </div>
                                        </div>
                                        <input
                                            autoComplete="off"
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            style={{backgroundColor:"#fff",border:"0"}}
                                            {...formik.getFieldProps('password')} />
                                        
                                    </div>

                                    {formik.touched.konfirmasi_password &&
                                        formik.errors.konfirmasi_password ? (
                                        <span className="float-right text-error badge badge-danger">{formik.errors.konfirmasi_password}</span>
                                    ) : null}
                                    <div className="input-group mb-3" style={{border:"1px solid #B7B7B7",padding:"5px",borderRadius:"5px"}}>
                                    <div className="input-group-append">
                                            
                                            <div className="input-group-text bg-white border-white">
                                                <img src={password_icon} width="22px" />
                                            </div>

                                        </div>
                                        <input
                                            autoComplete="off"
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirmation Password"
                                            style={{backgroundColor:"#fff",border:"0"}}
                                            {...formik.getFieldProps('konfirmasi_password')} />
                                        
                                    </div>
                                    <ReCAPTCHA
                                        hl="id"
                                        ref={recaptchaRef}
                                        sitekey="6LfEKfEcAAAAAGH6QCdvmj3wSSzFSyw0dbIoSmpK"
                                        onChange={handleChangeCaptcha}
                                        onExpired={handleExpired}
                                    />
                                    <div className="social-auth-links text-center mt-2 mb-3">
                                        <div className="grid grid-cols-1 gap-0 place-items-center">
                                            <div className="w-2/4">
                                                <Button
                                                    disabled={selected.myCaptcha ? false : true}
                                                    block
                                                    type="submit"
                                                    isLoading={isFetching}
                                                    theme=""
                                                    style={{ backgroundColor:"#C1242B",color:"#fff",marginRight:"2%"}}
                                                >
                                                    Lanjut Registrasi
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </form>) : ''}
                                <div className="text-left">            
                                {isVerifikasi ? frmUser : ''}
                                {isCompleteProfile ? frmUser2 : ''}
                                {succesCompleteProfile ? (<h4><p className='login-box-msg'>Pendaftaran berhasil, <a href="login" className="text-center">Silahkan login</a></p></h4>) : ''}
                                {!succesCompleteProfile ? (<div className="text-black text-center">Sudah punya akun ? <a href="login" className="text-center font-bold text-hijau-forex">Login</a></div>) : ''}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>

            <div className="h-auto overflow-hidden mobile-hide">
                <img src={banner} className="scale-100" />
            </div>


            </div>
        </div>

    )
};

export default Register;