import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  actionPassword,
  userSelector,
  clearState,
} from "../features/main/mainSlice";
import Button from "../components/button/Button";
import { Form } from "react-bootstrap";

import banner from "../assets/image_1.png";
import logoa from "../assets/logo.svg";

import password_icon from "../assets/password.svg";
import { useLocation } from "react-router-dom";

const Reset = () => {
  const {
    isFetching,
    errorMessage,
    isVerifikasi,
    isCompleteProfile,
    succesCompleteProfile,
    token,
  } = useSelector(userSelector);

  const dispatch = useDispatch();

  const { search } = useLocation();

  useEffect(async() => {
    if (token) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      dispatch(clearState());
      window.location.reload();
    } else {
      await dispatch(clearState());
    }
  }, [dispatch, token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      konfirmasi_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Please provide a password")
        .min(8, "Minimum 8 characters"),
      konfirmasi_password: Yup.string()
        .required("Required!")
        .oneOf([Yup.ref("password")], "Password's not match"),
    }),
    onSubmit: (values) => {
      const val = {
        ...values,
        token: search.replace("?", "/"),
      };
      dispatch(actionPassword(val));
    },
  });

  const hideAlert = () => {
    formik.setFieldValue("konfirmasi_password", "");
    formik.setFieldValue("password", "");
    formik.resetForm({ password: "", konfirmasi_password: "" });
    dispatch(clearState());
  };
  document.getElementById("root").classList = "hold-transition";

  return (
    <div class="">
      <div class="w-full grid lg:grid-cols-2 gap-4 bg-white">
        <div className="overflow-hidden mobile-view">
          <img src={banner} className="w-[100%] h-[100%]" />
        </div>

        <div className="grid grid-cols-1 gap-0 place-items-center">
          <div className="login-box ">
            <div class="grid grid-cols-1 place-items-center">
              <div className="card border-white">
                <div className="card-header text-center h1 text-red-500 text-lg bg-white border-white grid grid-cols-1 place-items-center lg:mt-4">
                  <div class="grid grid-cols-1 place-items-center">
                    <img src={logoa} width="60%" />
                  </div>
                  <div>
                    <b>
                      <span className="text-merah-button font-bold text-lg">
                        Reset Password
                      </span>
                    </b>
                  </div>
                </div>
                <div class="grid grid-cols-1 place-items-center">
                  <div className="card-body" style={{ paddingTop: "0px",width:"100%"}}>
                    {errorMessage ? (
                      <div
                        className={
                          new RegExp("\\b" + "berhasil" + "\\b").test(
                            errorMessage
                              ? errorMessage.toLowerCase()
                              : "no match"
                          )
                            ? "alert alert-success alert-sm"
                            : "alert alert-danger alert-sm"
                        }
                      >
                        <button
                          onClick={hideAlert}
                          type="button"
                          className="close"
                          data-dismiss="alert"
                          aria-hidden="true"
                        >
                          ×
                        </button>
                        <span className="fw-semi-bold text-white">
                          Info: {errorMessage}
                        </span>
                      </div>
                    ) : (
                      <p className="login-box-msg"></p>
                    )}

                    {!isCompleteProfile &&
                    !isVerifikasi &&
                    !succesCompleteProfile ? (
                      <form onSubmit={formik.handleSubmit}>
                        <Form.Label>
                          <div className="w-full mb-2 mt-2">
                            <div className="text-black  text-xs text-center font-normal">
                              Silahkan masukan Password baru anda.
                            </div>
                          </div>
                        </Form.Label>
                        {formik.touched.password && formik.errors.password ? (
                          
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.password}
                          </span>
                        ) : null}
                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
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
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("password")}
                          />
                        </div>

                        {formik.touched.konfirmasi_password &&
                        formik.errors.konfirmasi_password ? (
                          <span className="float-right text-error badge badge-danger">
                            {formik.errors.konfirmasi_password}
                          </span>
                        ) : null}
                        <div
                          className="input-group mb-3"
                          style={{
                            border: "1px solid #B7B7B7",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
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
                            style={{ backgroundColor: "#fff", border: "0" }}
                            {...formik.getFieldProps("konfirmasi_password")}
                          />
                        </div>

                        <div className="social-auth-links text-center mt-2 mb-3">
                          <div className="grid grid-cols-1 gap-0 place-items-center">
                            <div className="w-2/4 mt-2">
                              <Button
                                block
                                type="submit"
                                isLoading={isFetching}
                                theme=""
                                style={{
                                  backgroundColor: "#C1242B",
                                  color: "#fff",
                                }}
                              >
                                Ubah
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-auto overflow-hidden mobile-hide">
          <img src={banner} className="w-[100%] h-[100%]" />
        </div>
      </div>
    </div>
  );
};

export default Reset;
