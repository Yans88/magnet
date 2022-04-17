import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getAkunTrading, getAkunTradingDemo } from "../Setoran/setoranSlice";
import { profileUser, chgPass, chgPhonePass } from "../main/mainSlice";
import NumberFormat from "react-number-format";
import akun_icon from "../../assets/akun_white.svg";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import AppModal from "../../components/modal/MyModal";
import AppModall from "../../components/modal/MyModall";
import { Button, Form } from "react-bootstrap";

class Beranda extends Component {
  constructor(props) {
    super(props);
    this.initSelected = {
      login: "",
      phonepass: "",
      setor: "",
      akun_trading: "",
      img: "",
      konf_password: "",
      password: "",
      password2: "",
      password3: "",
      phonepwd: "",
    };
    this.state = {
      selected: this.initSelected,
      errMsg: this.initSelected,
      showFormResPass: false,
      showFormResPhonePass: false,
      myStatusDokumen: localStorage.getItem("myStatusDokumen")
        ? localStorage.getItem("myStatusDokumen")
        : false,
    };
  }

  componentDidMount() {
    //await this.sleep(300);
    sessionStorage.removeItem("data_tipe_akun_id");
    sessionStorage.removeItem("act_tipe_akun_id");
    this.props.onLoad();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  to_at = async () => {
    await sessionStorage.setItem("act_tipe_akun_id", "create_new_akun");
    this.props.history.push("/account-type");
  };

  handleChange(event) {
    const { name, value } = event.target;
    var val = value;
    this.setState({
      loadingForm: false,
      errMsg: { ...this.state.errMsg, [name]: "" },
      selected: {
        ...this.state.selected,
        [name]: val,
      },
    });
  }

  handleSubmit = async () => {
    var errors = this.state.errMsg;
    this.setState({
      ...this.state,
      loadingForm: true,
    });
    errors.password = !this.state.selected.password ? "Password required" : "";
    if (this.state.selected.password) {
      var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      var test = reg.test(this.state.selected.password);
      errors.password = !test ? "password must be 8 characters" : "";
      errors.password2 = !test ? "least one uppercase letter" : "";
      errors.password3 = !test ? "one lowercase letter and one number" : "";
    }
    errors.konf_password = !this.state.selected.konf_password
      ? "Konfirmasi password required"
      : "";
    if (errors.konf_password === "")
      errors.konf_password =
        this.state.selected.konf_password !== this.state.selected.password
          ? "Password not match"
          : "";

    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      const param = {
        login: this.state.selected.login,
        password: this.state.selected.password,
      };
      this.props.onChangePass(param);
    } else {
      console.error("Invalid Form");
      this.setState({
        loadingForm: false,
      });
    }
  };

  handleSubmit2 = async () => {
    var errors = this.state.errMsg;
    this.setState({
      ...this.state,
      loadingForm: true,
    });
    errors.phonepwd = !this.state.selected.phonepwd ? "Password required" : "";
    if (this.state.selected.phonepwd) {
      var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      var test = reg.test(this.state.selected.phonepwd);
      errors.phonepwd = !test ? "password must be 8 characters" : "";
      errors.phonepwd2 = !test ? "least one uppercase letter" : "";
      errors.phonepwd3 = !test ? "one lowercase letter and one number" : "";
    }
    errors.konf_password = !this.state.selected.konf_password
      ? "Konfirmasi password required"
      : "";
    if (errors.konf_password === "")
      errors.konf_password =
        this.state.selected.konf_password !== this.state.selected.phonepwd
          ? "Password not match"
          : "";

    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      const param = {
        login: this.state.selected.login,
        phonepwd: this.state.selected.phonepwd,
      };
      this.props.onChangePhonePass(param);
    } else {
      console.error("Invalid Form");
      this.setState({
        loadingForm: false,
      });
    }
  };

  handleSubmit3 = async () => {
    localStorage.removeItem("myStatusDokumen");
    this.setState({
      showFormResPass: false,
      showFormResPhonePass: false,
      myStatusDokumen: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
    });
    this.props.history.push("/personal");
  };

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  chg_pass(record) {
    this.setState({
      showFormResPass: true,
      selected: {
        ...record,
        konf_password: "",
        password: "",
        errMsg: this.initSelected,
      },
    });
  }

  chg_pass2(record) {
    this.setState({
      showFormResPhonePass: true,
      selected: {
        ...record,
        konf_password: "",
        phonepwd: "",
        errMsg: this.initSelected,
      },
    });
  }

  handleClose() {
    localStorage.removeItem("myStatusDokumen");
    this.setState({
      showFormResPass: false,
      showFormResPhonePass: false,
      myStatusDokumen: false,
      selected: this.initSelected,
      errMsg: this.initSelected,
    });
  }

  render() {
    const { akun_trading, akun_trading_demo, profile } = this.props;
    const { selected, errMsg, myStatusDokumen } = this.state;

    const frmUser = (
      <Form id="myForm">
        <Form.Group controlId="password">
          <Form.Label>Password Baru</Form.Label>
          {errMsg.password ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.password}
              <br />
              {errMsg.password2}
              <br />
              {errMsg.password3}
            </span>
          ) : (
            ""
          )}

          <Form.Control
            size="sm"
            autoComplete="off"
            name="password"
            type="text"
            value={selected.password}
            onChange={this.handleChange.bind(this)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="konf_password">
          <Form.Label>Konfirmasi Password</Form.Label>
          {errMsg.konf_password ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.konf_password}
            </span>
          ) : (
            ""
          )}
          <Form.Control
            size="sm"
            autoComplete="off"
            name="konf_password"
            type="text"
            value={selected.konf_password}
            onChange={this.handleChange.bind(this)}
            placeholder="Konfirmasi Password"
          />
          <br />
          <span
            style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}
          >
            Password ini akan di gunakan untuk login dan trading di MT5
          </span>
        </Form.Group>
      </Form>
    );
    const frmUser2 = (
      <Form id="myForm">
        <Form.Group controlId="password">
          <Form.Label>Password Baru</Form.Label>
          {errMsg.phonepwd ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.phonepwd}
              <br />
              {errMsg.phonepwd2}
              <br />
              {errMsg.phonepwd3}
            </span>
          ) : (
            ""
          )}

          <Form.Control
            size="sm"
            autoComplete="off"
            name="phonepwd"
            type="text"
            value={selected.phonepwd}
            onChange={this.handleChange.bind(this)}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="konf_password">
          <Form.Label>Konfirmasi Password</Form.Label>
          {errMsg.konf_password ? (
            <span className="float-right text-error badge badge-danger">
              {errMsg.konf_password}
            </span>
          ) : (
            ""
          )}
          <Form.Control
            size="sm"
            autoComplete="off"
            name="konf_password"
            type="text"
            value={selected.konf_password}
            onChange={this.handleChange.bind(this)}
            placeholder="Konfirmasi Password"
          />
        </Form.Group>
        <br />
        <span style={{ color: "red", fontWeight: "bold", fontStyle: "italic" }}>
          Password ini akan di gunakan untuk menelpon dealing kamu
        </span>
      </Form>
    );
    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style="padding-bottom:20px; text-align:left;">Nasabah yang terhormat, selamat datang di Magnet, Kami sangat senang anda bergabung bersama kami, agar bisa segera memulai silahkan lengkapi data pribadi anda. Data ini diperlukan sebagai persyaratan resmi dalam pembukaan rekening.</div>',
        }}
      />
    );
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="grid grid-cols-1  my-3 mb-20">
              <div className="w-full bg-hijau-forex rounded-xl text-white pt-3 xs:pb-3 lg:pb-20 grid grid-cols-1 place-items-center static">
                <div className="mobile-hide w-[18%]  ">
                  <img src={akun_icon} width="25px" className="float-left" />
                  <span className="text-lg font-bold">&nbsp;Akun Saya</span>
                </div>

                <div className="mobile-hide absolute mt-[32rem] bg-white text-black text-center rounded-2xl shadow-lg  py-10 w-3/4 ...">
                  {akun_trading.length > 0 && (
                    <Link
                      to="/account-type"
                      className="btn btn-lgreen btn-sm"
                      onClick={() => this.to_at()}
                    >
                      <span className="font-bold text-black">
                        BUAT AKUN TRADING BARU
                      </span>
                    </Link>
                  )}
                  <div className="grid grid-cols-3 gap-4 px-5  mt-2">
                    {akun_trading
                      ? akun_trading.map((at, index) => {
                          return (
                            <Fragment key={index}>
                              <div
                                className="border border-solid border-gray-300 text-left p-4 rounded-2xl"
                                style={{ backgroundColor: "#F1F1F1" }}
                              >
                                <div className="grid grid-cols-2">
                                  <div>
                                    <span className="text-red-500">
                                      #{at.login}
                                    </span>
                                  </div>
                                  <div className="box-bank__actions place-items-end text-right">
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        size="sm"
                                        variant="secondary"
                                        style={{
                                          backgroundColor: "transparent",
                                          borderColor: "transparent",
                                          color: "#000",
                                        }}
                                        id="dropdown-basic"
                                      >
                                        <i className="fa fa-ellipsis-v"></i>
                                      </Dropdown.Toggle>

                                      <Dropdown.Menu className="my-dropdown-menu">
                                        <Dropdown.Item
                                          as="button"
                                          onClick={() => this.chg_pass(at)}
                                        >
                                          RESET PASSWORD
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          as="button"
                                          onClick={() => this.chg_pass2(at)}
                                        >
                                          RESET PHONE PASSWORD
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2">
                                  <div className="font-bold">NO AKUN</div>
                                  <div className="font-bold">FREE MARGIN</div>
                                  <div>{at.login}</div>
                                  <div>
                                    <NumberFormat
                                      value={
                                        at.margin_free > 0
                                          ? at.margin_free
                                          : "0.00"
                                      }
                                      thousandSeparator={true}
                                      decimalScale={2}
                                      displayType={"text"}
                                    />
                                  </div>
                                  <div className="font-bold">EQUITY</div>
                                  <div className="font-bold">LEVERAGE</div>
                                  <div>
                                    <NumberFormat
                                      value={at.equity > 0 ? at.equity : "0.00"}
                                      thousandSeparator={true}
                                      decimalScale={2}
                                      displayType={"text"}
                                    />
                                  </div>
                                  <div>
                                    <NumberFormat
                                      value={
                                        at.leverage > 0 ? at.leverage : "0.00"
                                      }
                                      thousandSeparator={true}
                                      decimalScale={2}
                                      displayType={"text"}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })
                      : ""}
                  </div>
                </div>

                <div className="mobile-view relative w-[50%] text-center  ">
                  <img
                    src={akun_icon}
                    width="25px"
                    className="float-left pl-0"
                  />
                  <span className="text-lg font-bold">&nbsp;Akun Saya</span>
                </div>
              </div>

              <div className="mobile-hide relative mt-[30rem] bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[80%] mb-10 mx-12 ml-[10%] ...">
                <a href="account-type" className="btn btn-lgreen btn-sm">
                  <span className="font-bold text-red-700">AKUN DEMO MT5</span>
                </a>
                <br />
                <a href="account-type" className="btn btn-lgreen btn-sm">
                  <span className="font-bold text-black">BUAT AKUN DEMO</span>
                </a>

                <div className="grid grid-cols-3 gap-4 px-5  mt-2">
                  {akun_trading_demo
                    ? akun_trading_demo.map((at, index) => {
                        return (
                          <div
                            className="rounded-2xl border border-solid border-gray-300 text-left p-4"
                            style={{ backgroundColor: "#F1F1F1" }}
                          >
                            <span className="text-red-500">#{at.login}</span>
                            <div className="grid grid-cols-2">
                              <div>
                                <span className="text-red-500">
                                  #{at.login}
                                </span>
                              </div>
                              <div className="box-bank__actions place-items-end text-right">
                                <Dropdown>
                                  <Dropdown.Toggle
                                    size="sm"
                                    variant="secondary"
                                    style={{
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      color: "#000",
                                    }}
                                    id="dropdown-basic"
                                  >
                                    <i className="fa fa-ellipsis-v"></i>
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu className="my-dropdown-menu">
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => this.chg_pass(at)}
                                    >
                                      RESET PASSWORD
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      as="button"
                                      onClick={() => this.chg_pass2(at)}
                                    >
                                      RESET PHONE PASSWORD
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                            <div className="grid grid-cols-2">
                              <div className="font-bold">NO AKUN</div>
                              <div className="font-bold">NAME</div>
                              <div>{at.login}</div>
                              <div>{at.name}</div>

                              <div className="">No Akun</div>
                              <div className="">Free Margin</div>
                              <div>{at.login}</div>
                              <div>
                                <NumberFormat
                                  value={
                                    at.margin_free > 0 ? at.margin_free : "0.00"
                                  }
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              </div>
                              <div className="">Equity</div>
                              <div className="">Leverage</div>
                              <div>
                                <NumberFormat
                                  value={at.equity > 0 ? at.equity : "0.00"}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              </div>
                              <div>
                                <NumberFormat
                                  value={at.leverage > 0 ? at.leverage : "0.00"}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>

              <div className="mobile-view  relative mt-[0rem] bg-white text-black text-center rounded-2xl shadow-lg  py-10 w-[100%] ...">
                <a href="account-type" className="btn btn-lgreen btn-sm">
                  <span className="font-bold text-black">
                    BUAT AKUN TRADING BARU
                  </span>
                </a>
                <div className="grid grid-cols-1 gap-4 px-5  mt-2">
                  {akun_trading
                    ? akun_trading.map((at, index) => {
                        return (
                          <div
                            className="border border-solid border-gray-300 text-left p-4 rounded-2xl"
                            style={{ backgroundColor: "#F1F1F1" }}
                          >
                            <span className="text-red-500">#{at.login}</span>

                            <div className="grid grid-cols-2">
                              <div className="font-bold">NO AKUN</div>
                              <div>{at.login}</div>
                              <div className="font-bold">FREE MARGIN</div>

                              <div>
                                <NumberFormat
                                  value={
                                    at.margin_free > 0 ? at.margin_free : "0.00"
                                  }
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              </div>
                              <div className="font-bold">EQUITY</div>
                              <div>
                                <NumberFormat
                                  value={at.equity > 0 ? at.equity : "0.00"}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              </div>
                              <div className="font-bold">LEVERAGE</div>

                              <div>
                                <NumberFormat
                                  value={at.leverage > 0 ? at.leverage : "0.00"}
                                  thousandSeparator={true}
                                  decimalScale={2}
                                  displayType={"text"}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>

              <div className="mobile-view relative mt-[2rem]  bg-white text-black text-center  rounded-2xl shadow-lg py-10 w-[100%] mb-10 mx-1 ...">
                <a href="account-type" className="btn btn-lgreen btn-sm">
                  <span className="font-bold text-red-700">AKUN DEMO MT5</span>
                </a>
                <br />
                <a href="account-type" className="btn btn-lgreen btn-sm">
                  <span className="font-bold text-black">BUAT AKUN DEMO</span>
                </a>

                <div className="grid grid-cols-1 gap-4 px-5  mt-2">
                  {akun_trading_demo
                    ? akun_trading_demo.map((at, index) => {
                        return (
                          <div
                            className="rounded-2xl border border-solid border-gray-300 text-left p-4"
                            style={{ backgroundColor: "#F1F1F1" }}
                          >
                            <span className="text-red-500">#{at.login}</span>
                            <div className="grid grid-cols-2">
                              <div className="font-bold">NO AKUN</div>
                              <div className="font-bold">NAME</div>
                              <div>{at.login}</div>
                              <div>{at.name}</div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </section>
        <AppModal
          size="xs"
          show={this.state.showFormResPass}
          form={frmUser}
          backdrop="static"
          keyboard={false}
          title={"RESET PASSWORD #" + this.state.selected.login}
          titleButton="Save change"
          themeButton="success"
          handleClose={this.handleClose.bind(this)}
          isLoading={
            this.props.isAddLoading
              ? this.props.isAddLoading
              : this.state.loadingForm
          }
          formSubmit={this.handleSubmit.bind(this)}
        />
        <AppModal
          size="xs"
          show={this.state.showFormResPhonePass}
          form={frmUser2}
          backdrop="static"
          keyboard={false}
          title={"RESET PHONE PASSWORD #" + this.state.selected.login}
          titleButton="Save change"
          themeButton="success"
          handleClose={this.handleClose.bind(this)}
          isLoading={
            this.props.isAddLoading
              ? this.props.isAddLoading
              : this.state.loadingForm
          }
          formSubmit={this.handleSubmit2.bind(this)}
        />
        <AppModall
          show={myStatusDokumen}
          size="sm"
          form={contentDelete}
          handleClose={this.handleClose.bind(this)}
          backdrop="static"
          keyboard={false}
          title="Status"
          formSubmit={this.handleSubmit3.bind(this)}
          titleButton="Lengkapi"
          themeButton="warning"
        ></AppModall>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  akun_trading: state.setoran.akunTrading || [],
  akun_trading_demo: state.setoran.akunTradingDemo || [],
  user: state.main.currentUser,
  profile: state.main.dtProfileUser,
});

const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getAkunTrading());
      dispatch(getAkunTradingDemo());
    },
    onChangePass: (param) => {
      dispatch(chgPass(param));
    },
    onChangePhonePass: (param) => {
      dispatch(chgPhonePass(param));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(Beranda);
