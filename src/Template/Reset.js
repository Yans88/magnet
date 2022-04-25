import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { regUser, verifUser, userSelector, clearState, getCabang, getMarketing, completeData, loginUser } from '../features/main/mainSlice'
import Button from '../components/button/Button';
import { Col, Form } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import banner from '../assets/image_1.svg';
import logoa from '../assets/logo.svg';
import email_icon from '../assets/email.svg';
import password_icon from '../assets/password.svg';


import { SelectTgl, SelectBln, SelectThn } from '../components/modal/SelectTgl';

const Reset = () => {

    const { isFetching, isSuccess, errorMessage, isVerifikasi, user_id, isCompleteProfile, succesCompleteProfile } = useSelector(
        userSelector
    );
    const history = useHistory();
    const dispatch = useDispatch();

    const initData = { kode_verifikasi: '', nama_depan: '', nama_belakng: '', tgl: '', bln: '', thn: '', cabang: '', marketing: '', tanggal_lahir: '', myCaptcha: '', ref_code: '', email:'', password:'' };
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
            dispatch(loginUser(selected));
        }
    }, [succesCompleteProfile, dispatch, selected]);

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
				password: values.password,
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

    const handleSubmit2 = async() => {
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
	
	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

    function handleChangeCaptcha(value) {
        setSelected({
            ...selected,
            "myCaptcha": value
        });
        //console.log("Captcha value:", value);
    }

    function handleExpired() {
        const recaptchaValue = recaptchaRef.current.getValue();
        setSelected({
            ...selected,
            "myCaptcha": recaptchaValue
        });
        // console.log("recaptchaValue:", recaptchaValue);

    }
    const recaptchaRef = React.createRef();

    const hideAlert = () => { dispatch(clearState()) }
    document.getElementById('root').classList = 'hold-transition';

    

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
                            <div><b><span className="text-merah-button font-bold text-lg">Reset Password</span></b></div>
                        </div>
                        <div class="grid grid-cols-1 place-items-center">
                            <div className="card-body" style={{paddingTop:"0px"}}>
                                {

                                    errorMessage ? (
                                        <div className="alert alert-danger alert-sm" >
                                            <button onClick={hideAlert} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                            <span className="fw-semi-bold text-error-login">Error: {errorMessage}</span>
                                        </div>
                                    ) : (<p className='login-box-msg'></p>)}

                                {!isCompleteProfile && !isVerifikasi && !succesCompleteProfile ? (<form onSubmit={formik.handleSubmit}>
                                    

                                    <Form.Label>
                                        
                                        <div className="w-full mb-2 mt-2">
                                            <div className="text-black  text-xs text-center font-normal">Silahkan masukan Password baru anda.</div>
                                        </div>
                                    </Form.Label>
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

                                    
                                    

                                    <div className="social-auth-links text-center mt-2 mb-3">
                                    <div className="grid grid-cols-1 gap-0 place-items-center">
                                      
                                    <div className="w-2/4 mt-2">
                                        <Button
                                            block
                                            onClick={handleSubmit}
                                            isLoading={isFetching}
                                            theme=""
                                            style={{ backgroundColor:"#C1242B",color:"#fff"}}
                                        >
                                            Masuk
                                        </Button>
                                    </div>
                                    </div>
                                </div>

                                </form>) : ''}
                                

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

export default Reset;