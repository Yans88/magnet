import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, userSelector, clearState } from '../features/main/mainSlice'
import Button from '../components/button/Button';
import AppModal from '../components/modal/MyModal';

const Login = () => {
	const [showModalDialog, setShowModalDialog] = useState(false);
    const { isFetching, isSuccess, errorMessage, myStatus } = useSelector(
        userSelector
    );
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(clearState());
        };
    }, [dispatch]);

    useEffect(() => {
		if(myStatus){
			setShowModalDialog(true);
		}
        if (isSuccess && !myStatus) {
            dispatch(clearState());
            history.push('/');
        }
    }, [isSuccess, myStatus, dispatch, history]);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Please enter email').email('Please enter a valid email'),
            password: Yup.string()
                .required('Please provide a password')
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values));
			
        }
    });

    const hideAlert = () => { dispatch(clearState()) }
    document.getElementById('root').classList = 'hold-transition login-page';
	const contentDelete = <div dangerouslySetInnerHTML={{ __html: '<div id="caption" style=padding-bottom:20px;">Akun Anda sudah tidak dapat digunakan Untuk bantuan lebih lanjut Anda bisa menghubungi kami di <a href=" https://www.magnetfx.co.id/contact">sini</a></div>' }} />;
    return (
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center h1">
                    <b>Magnet</b>
                </div>
                <div className="card-body">

                    {errorMessage ? (
                        <div className="alert alert-danger alert-sm">
                            <button onClick={hideAlert} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <span className="fw-semi-bold text-error-login">Error: {errorMessage}</span>
                        </div>
                    ) : (<p className='login-box-msg'>Sign in to start your session</p>)}

                    <form onSubmit={formik.handleSubmit}>
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

                        <div className="social-auth-links text-center mt-2 mb-3">
                            <Button
                                block
                                type="submit"
                                isLoading={isFetching}
                                icon="sign"
                                theme="primary"
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>
                    <a href="register" className="text-center">Register a new membership</a>

                </div>
            </div>
			<AppModal
                        show={showModalDialog}
                        size="sm"
                        form={contentDelete}
                        // handleClose={}
                        backdrop="static"
                        keyboard={false}
                        noBtnAction={true}
                        myCloseButton={false}
                        title="Info"
                        titleButton="Delete"
                        themeButton="danger"                    
                        
                    ></AppModal>
        </div>

    )
};

export default Login;