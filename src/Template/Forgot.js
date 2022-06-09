import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, userSelector, clearState } from '../features/main/mainSlice'
import Button from '../components/button/Button';
import { Form } from 'react-bootstrap';
import banner from '../assets/image_1.svg';
import logoa from '../assets/logo.svg';
import email_icon from '../assets/email.svg';


const Forgot = () => {

    const { isFetching,  errorMessage, isVerifikasi,  isCompleteProfile, succesCompleteProfile } = useSelector(
        userSelector
    );
    
    const dispatch = useDispatch();

    const initData = { email:'' };
    const errorValidate = { email:'' };
    const [selected, setSelected] = useState(initData);
    const [errMsg, setErrMsg] = useState(errorValidate);

    useEffect(() => {        
        return () => {
            dispatch(clearState());

        };
    }, [dispatch]);

   

    const formik = useFormik({
        initialValues: {
            email: ''            
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Please enter email').email('Please enter a valid email')           

        }),
        onSubmit: (values, { resetForm }) => {	
			setSelected({
				...selected,				
				email: values.email
			});
            dispatch(forgotPassword(values));			
        }
    });

    
    const handleSubmit = () => {
        var error = '';
        if (selected.email === null || selected.email === "") {
            error = { ...error, email: "Please enter email" };
        }
        setErrMsg(error);
        
        //console.log(queryString);
        if (!error) dispatch(forgotPassword(selected));
    }
   

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
                            <div><b><span className="text-merah-button font-bold text-lg">Lupa Password</span></b></div>
                        </div>
                        <div class="grid grid-cols-1 place-items-center">
                            <div className="card-body" style={{paddingTop:"0px"}}>
                                {

                                    errorMessage ? (
                                        <div className={(new RegExp("\\b"+"success"+"\\b").test(errorMessage ? errorMessage.toLowerCase() : "no match"))  ? "alert alert-success alert-sm" : "alert alert-danger alert-sm"} >
                                            <button onClick={hideAlert} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                            <span className="fw-semi-bold text-error-login">{errorMessage}</span>
                                        </div>
                                    ) : (<p className='login-box-msg'></p>)}

                                {!isCompleteProfile && !isVerifikasi && !succesCompleteProfile ? (<form onSubmit={formik.handleSubmit}>
                                    

                                    <Form.Label>
                                        
                                        <div className="w-full mb-2 mt-2">
                                            <div className="text-black  text-xs text-center font-normal">Silahkan masukan email anda untuk me-reset password anda.</div>
                                        </div>
                                    </Form.Label>
                                    {formik.touched.email && formik.errors.email ? (
                                        <span className="float-right text-error badge badge-danger">{formik.errors.email}</span>
                                    ) : null}
									{errMsg && errMsg.email ? (
                                        <span className="float-right text-error badge badge-danger">{errMsg.email}</span>
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

                                    
                                    

                                    <div className="social-auth-links text-center mt-2 mb-3">
                                    <div className="grid grid-cols-1 gap-0 place-items-center">
                                    <div className="w-full mb-2">
                                        <div className="text-black text-sm ">Belum menerima password baru ?<a href="#" onClick={handleSubmit} className="text-center italic text-hijau-forex"><br/> Kirim ulang</a></div>
                                    </div>    
                                    <div className="w-2/4 mt-2">
                                        <Button
                                            block
                                            type="submit"
                                            isLoading={isFetching}
                                            theme=""
                                            style={{ backgroundColor:"#C1242B",color:"#fff"}}
                                        >
                                            Kirim
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

export default Forgot;