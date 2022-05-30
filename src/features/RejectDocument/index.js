import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import moment from "moment";
import "moment/locale/id";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { getRejDoc, chgProps, simpanRejDoc, closeSwal } from "./rejectDocSlice";
import { profileUser } from "../main/mainSlice";
import AppButton from "../../components/button/Button";
import { Form } from "react-bootstrap";
import { AppSwalSuccess } from "../../components/modal/SwalSuccess";
import AppModalStatus from "../../components/modal/MyModalStatus";

var yesterday = moment().subtract(40, "years");
var valid_startDate = function (current) {
  return current.isAfter(yesterday);
};

class RejecctDocument extends Component {
  constructor(props) {
    super(props);

    this.initData = {};

    this.state = {
      validSd: valid_startDate,
      validEd: valid_startDate,
      data_pribadi: {},
      kekayaan: {},
      kontak_darurat: {},
      data_pekerjaan: {},
      akun_bank: {},
      pengalaman_trading: {},
      show: false,
      errMsg: this.initData,
      myStatusDokumen: localStorage.getItem("myStatusDokumen2")
        ? localStorage.getItem("myStatusDokumen2")
        : false,
    };
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
  }

  componentDidMount = async () => {
    await this.props.onLoad();
  };

  handleChange(nama_groups, evt) {
    const { name, value } = evt.target;
    if (nama_groups === "data_pribadi") {
      this.setState({
        data_pribadi: {
          ...this.state.data_pribadi,
          [name]: value,
        },
      });
    }
    if (nama_groups === "kekayaan") {
      this.setState({
        kekayaan: {
          ...this.state.kekayaan,
          [name]: value,
        },
      });
    }
    if (nama_groups === "kontak_darurat") {
      this.setState({
        kontak_darurat: {
          ...this.state.kontak_darurat,
          [name]: value,
        },
      });
    }
    if (nama_groups === "data_pekerjaan") {
      this.setState({
        data_pekerjaan: {
          ...this.state.data_pekerjaan,
          [name]: value,
        },
      });
    }
    if (nama_groups === "akun_bank") {
      this.setState({
        akun_bank: {
          ...this.state.akun_bank,
          [name]: value,
        },
      });
    }
    if (nama_groups === "pengalaman_trading") {
      this.setState({
        pengalaman_trading: {
          ...this.state.pengalaman_trading,
          [name]: value,
        },
      });
    }
  }

  handleChangeStartDate(date) {
    const dt = {};
    if (date) {
      const selectedDate = new Date(date);
      const _date = moment(selectedDate).format("YYYY-MM-DD");
      this.setState({
        data_pribadi: {
          ...this.state.data_pribadi,
          tanggal_lahir: _date,
        },
      });
    } else {
      this.setState({
        data_pribadi: {
          ...this.state.data_pribadi,
          tanggal_lahir: "",
        },
      });
    }
  }

  renderView(mode, renderDefault, name) {
    // Only for years, months and days view
    if (mode === "time") return renderDefault();

    return (
      <div className="wrapper">
        {renderDefault()}
        <div className="controls">
          <Button
            variant="warning"
            type="button"
            onClick={() => this.clear(name)}
          >
            Clear
          </Button>
        </div>
      </div>
    );
  }

  clear(name) {
    if (name === "tanggal_lahir") {
      this.handleChangeStartDate();
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
    var errors = this.state.errMsg;

    for (let [key, value] of Object.entries(this.state.data_pribadi)) {
      let dt = {
        field: key,
        value: value,
        note: 1,
      };

      field_pribadi.push(dt);
    }
    for (let [key, value] of Object.entries(this.state.kekayaan)) {
      let dt2 = {
        field: key,
        value: value,
        note: 1,
      };
      if (key === "njop") {
        var value_njop = parseInt(value ? value : 0);
        errors.njop = value_njop < 100000000 ? "Min. 100.000.000" : "";
      }
      if (key === "deposit_bank") {
        var value_db = parseInt(value ? value : 0);
        errors.deposit_bank = value_db < 10000000 ? "Min. 10.000.000" : "";
      }
      field_kekayaan.push(dt2);
    }
    for (let [key, value] of Object.entries(this.state.kontak_darurat)) {
      let dt3 = {
        field: key,
        value: value,
        note: 1,
      };
      field_kontak_darurat.push(dt3);
    }
    for (let [key, value] of Object.entries(this.state.data_pekerjaan)) {
      let dt4 = {
        field: key,
        value: value,
        note: 1,
      };
      field_data_kerja.push(dt4);
    }
    for (let [key, value] of Object.entries(this.state.akun_bank)) {
      let dt5 = {
        field: key,
        value: value,
        note: 1,
      };
      field_akun_bank.push(dt5);
    }
    for (let [key, value] of Object.entries(this.state.pengalaman_trading)) {
      let dt6 = {
        field: key,
        value: value,
        note: 1,
      };
      field_pengalaman_trading.push(dt6);
    }
    let post_dt = "";
    if (field_pribadi.length > 0) {
      post_dt = { nama_group: "data_pribadi", data_field: field_pribadi };
      saveData.push(post_dt);
    }
    if (field_kekayaan.length > 0) {
      post_dt = { nama_group: "kekayaan", data_field: field_kekayaan };
      saveData.push(post_dt);
    }
    if (field_kontak_darurat.length > 0) {
      post_dt = {
        nama_group: "kontak_darurat",
        data_field: field_kontak_darurat,
      };
      saveData.push(post_dt);
    }
    if (field_data_kerja.length > 0) {
      post_dt = { nama_group: "data_pekerjaan", data_field: field_data_kerja };
      saveData.push(post_dt);
    }
    if (field_akun_bank.length > 0) {
      post_dt = { nama_group: "akun_bank", data_field: field_akun_bank };
      saveData.push(post_dt);
    }
    if (field_pengalaman_trading.length > 0) {
      post_dt = {
        nama_group: "pengalaman_trading",
        data_field: field_pengalaman_trading,
      };
      saveData.push(post_dt);
    }
    this.setState({ errors });
    if (this.validateForm(this.state.errMsg)) {
      if (saveData.length > 0) {
        this.props.onSave(saveData);
      }
    } else {
      console.error("Invalid Form");
    }
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  }

  handleClose() {
    localStorage.removeItem("myStatusDokumen2");
    this.setState({
      myStatusDokumen: false,
    });
  }

  render() {
    const { dataRejDoc } = this.props;
    const { errMsg, myStatusDokumen } = this.state;
    // console.log(this.state);

    const contentDelete = (
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<div id="caption" style="padding-bottom:20px; text-align:left;">Asset dan content nya disesuaikan</div>',
        }}
      />
    );

    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>
              Data yang Anda masukkan salah
            </h1>
            <div className="row">
              <div className="col-12">
                <div
                  className="card card-success shadow-lg"
                  style={{ minHeight: "800px" }}
                >
                  <div className="card-body">
                    <div
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingTop: 20,
                      }}
                    >
                      <Form>
                        {dataRejDoc
                          ? dataRejDoc.map((dr, index) => {
                              return (
                                <div key={index}>
                                  <h4>{dr.label_group}</h4>
                                  <br />
                                  {dr.data_field.map((df, ix) => {
                                    return (
                                      <div key={df.field}>
                                        <Form.Group controlId={df.field}>
                                          <Form.Label>
                                            {df.label_field}
                                          </Form.Label>{" "}
                                          {errMsg && errMsg[df.field] ? (
                                            <span className="text-error badge badge-danger">
                                              {errMsg[df.field]}
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                          {dr.type_field === "text" && (
                                            <Form.Control
                                              autoComplete="off"
                                              onChange={this.handleChange.bind(
                                                this,
                                                dr.nama_group
                                              )}
                                              size="lg"
                                              value={
                                                this.state[dr.nama_group][
                                                  dr.field
                                                ]
                                              }
                                              name={df.field}
                                              type="text"
                                              required
                                              placeholder={df.label_field}
                                            />
                                          )}
                                          {df.field === "jenis_kelamin" && (
                                            <Fragment>
                                              <br />
                                              <Form.Check
                                                onChange={this.handleChange.bind(
                                                  this,
                                                  dr.nama_group
                                                )}
                                                inline
                                                checked={
                                                  this.state.data_pribadi
                                                    .jenis_kelamin ===
                                                  "Laki-Laki"
                                                    ? true
                                                    : false
                                                }
                                                value="Laki-Laki"
                                                type="radio"
                                                name="jenis_kelamin"
                                                label="Laki-laki"
                                              />
                                              <Form.Check
                                                onChange={this.handleChange.bind(
                                                  this,
                                                  dr.nama_group
                                                )}
                                                inline
                                                value="Perempuan"
                                                type="radio"
                                                checked={
                                                  this.state.data_pribadi
                                                    .jenis_kelamin ===
                                                  "Perempuan"
                                                    ? true
                                                    : false
                                                }
                                                name="jenis_kelamin"
                                                label="Perempuan"
                                              />
                                            </Fragment>
                                          )}
                                          {df.field === "jenis_akun_bank" && (
                                            <Fragment>
                                              <br />
                                              <Form.Check
                                                onChange={this.handleChange.bind(
                                                  this,
                                                  dr.nama_group
                                                )}
                                                inline
                                                checked={
                                                  this.state[dr.nama_group][
                                                    dr.field
                                                  ] === "Giro"
                                                    ? "checked"
                                                    : ""
                                                }
                                                value="Giro"
                                                type="radio"
                                                name="jenis_akun_bank"
                                                label="Giro"
                                              />
                                              <Form.Check
                                                onChange={this.handleChange.bind(
                                                  this,
                                                  dr.nama_group
                                                )}
                                                inline
                                                value="Rekening tabungan"
                                                type="radio"
                                                checked={
                                                  this.state[dr.nama_group][
                                                    dr.field
                                                  ] === "Rekening tabungan"
                                                    ? "checked"
                                                    : ""
                                                }
                                                name="jenis_akun_bank"
                                                label="Rekening tabungan"
                                              />
                                              <Form.Check
                                                onChange={this.handleChange.bind(
                                                  this,
                                                  dr.nama_group
                                                )}
                                                inline
                                                value="Lainnya"
                                                type="radio"
                                                checked={
                                                  this.state[dr.nama_group][
                                                    dr.field
                                                  ] === "Lainnya"
                                                    ? "checked"
                                                    : ""
                                                }
                                                name="jenis_akun_bank"
                                                label="Lainnya"
                                              />
                                            </Fragment>
                                          )}
                                          {dr.type_field === "number" && (
                                            <Form.Control
                                              autoComplete="off"
                                              onChange={this.handleChange.bind(
                                                this,
                                                dr.nama_group
                                              )}
                                              size="lg"
                                              name={df.field}
                                              value={
                                                this.state[dr.nama_group][
                                                  dr.field
                                                ]
                                              }
                                              type="text"
                                              required
                                              placeholder={df.label_field}
                                            />
                                          )}
                                          {dr.type_field === "date" && (
                                            <Datetime
                                              closeOnSelect={true}
                                              timeFormat={false}
                                              setViewDate={
                                                this.state[dr.nama_group][
                                                  dr.field
                                                ]
                                                  ? new Date(
                                                      this.state[dr.nama_group][
                                                        dr.field
                                                      ]
                                                    )
                                                  : new Date()
                                              }
                                              value={
                                                this.state[dr.nama_group][
                                                  dr.field
                                                ]
                                                  ? new Date(
                                                      this.state[dr.nama_group][
                                                        dr.field
                                                      ]
                                                    )
                                                  : ""
                                              }
                                              onChange={
                                                this.handleChangeStartDate
                                              }
                                              inputProps={{
                                                readOnly: true,
                                                autoComplete: "off",
                                                placeholder: "Tanggal Lahir",
                                                name: "tanggal_lahir",
                                                className:
                                                  "form-control form-control-lg",
                                              }}
                                              renderView={(
                                                mode,
                                                renderDefault,
                                                tanggal_lahir
                                              ) =>
                                                this.renderView(
                                                  mode,
                                                  renderDefault,
                                                  "tanggal_lahir"
                                                )
                                              }
                                              locale="id"
                                              isValidDate={this.state.validSd}
                                            />
                                          )}
                                          {dr.type_field === "dropdown" && (
                                            <Form.Control
                                              as="select"
                                              onChange={this.handleChange.bind(
                                                this,
                                                dr.nama_group
                                              )}
                                              size="lg"
                                              name={df.field}
                                              type="text"
                                              required
                                            >
                                              <option value="">Pilih</option>
                                              {df.field ===
                                                "jenis_identitas" && (
                                                <Fragment>
                                                  <option value="KTP">
                                                    KTP
                                                  </option>
                                                  <option value="SIM">
                                                    SIM
                                                  </option>
                                                  <option value="Passpor">
                                                    Passport
                                                  </option>
                                                </Fragment>
                                              )}
                                              {df.field ===
                                                "tujuan_pembukaan_rekening" && (
                                                <Fragment>
                                                  <option value="Spekulasi">
                                                    Spekulasi
                                                  </option>
                                                  <option value="Keuntungan">
                                                    Keuntungan
                                                  </option>
                                                  <option value="Lindung Nilai">
                                                    Lindung Nilai
                                                  </option>
                                                  <option value="Lainnya">
                                                    Lainnya
                                                  </option>
                                                </Fragment>
                                              )}
                                              {df.field ===
                                                "pengalaman_trading" && (
                                                <Fragment>
                                                  <option value="Spekulasi">
                                                    Spekulasi
                                                  </option>
                                                  <option value="Keuntungan">
                                                    Keuntungan
                                                  </option>
                                                  <option value="Lindung Nilai">
                                                    Lindung Nilai
                                                  </option>
                                                  <option value="Lainnya">
                                                    Lainnya
                                                  </option>
                                                </Fragment>
                                              )}
                                              {df.field ===
                                                "status_pernikahan" && (
                                                <Fragment>
                                                  <option value="Belum Kawin">
                                                    Belum Kawin
                                                  </option>
                                                  <option value="Kawin">
                                                    Kawin
                                                  </option>
                                                  <option value="Cerai">
                                                    Cerai
                                                  </option>
                                                  <option value="Janda/Duda">
                                                    Janda/Duda
                                                  </option>
                                                </Fragment>
                                              )}

                                              {df.field ===
                                                "status_kepemilikan" && (
                                                <Fragment>
                                                  <option value="Milik">
                                                    Pribadi
                                                  </option>
                                                  <option value="Keluarga">
                                                    Keluarga
                                                  </option>
                                                  <option value="Sewa/Kontrak">
                                                    Sewa/Kontrak
                                                  </option>
                                                </Fragment>
                                              )}

                                              {df.option &&
                                              (df.field === "tempat_lahir" ||
                                                df.field === "provinsi")
                                                ? df.option.map(function (
                                                    prov
                                                  ) {
                                                    return (
                                                      <option
                                                        value={
                                                          prov.nama_provinsi
                                                        }
                                                        key={prov.provinsi_id}
                                                      >
                                                        {prov.nama_provinsi}
                                                      </option>
                                                    );
                                                  })
                                                : ""}
                                              {df.option &&
                                              df.field === "warga_negara"
                                                ? df.option.map(function (
                                                    prov
                                                  ) {
                                                    return (
                                                      <option
                                                        value={prov.nama_negara}
                                                        key={prov.negara_id}
                                                      >
                                                        {prov.nama_negara}
                                                      </option>
                                                    );
                                                  })
                                                : ""}
                                            </Form.Control>
                                          )}
                                          <div style={{ color: "red" }}>
                                            {df.note}
                                          </div>
                                        </Form.Group>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })
                          : ""}
                      </Form>
                      {dataRejDoc.length > 0 ? (
                        <div style={{ textAlign: "center" }}>
                          <strong>
                            Dengan mendaftar saya menyetujui <br /> syarat dan
                            kebijakan privasi
                          </strong>
                          <br />
                          <br />
                          <AppButton
                            onClick={this.handlesubmit.bind(this)}
                            isLoading={this.props.isAddLoading}
                            style={{ color: "#ffffff", marginRight: 5 }}
                            type="button"
                            size="lg"
                            theme=""
                            style={{
                              backgroundColor: "#C3262A",
                              color: "#fff",
                              marginRight: "2%",
                            }}
                          >
                            Selanjutnya
                          </AppButton>
                        </div>
                      ) : (
                        <h3>No Data</h3>
                      )}
                    </div>
                  </div>
                  <AppModalStatus
                    show={myStatusDokumen}
                    size="xs"
                    form={contentDelete}
                    handleClose={this.handleClose.bind(this)}
                    backdrop="static"
                    keyboard={false}
                    title="Status"
                    formSubmit={this.handleClose.bind(this)}
                    titleButton="Lengkapi"
                    themeButton="danger"
                  ></AppModalStatus>
                  {this.props.showFormSuccess ? (
                    <AppSwalSuccess
                      show={this.props.showFormSuccess}
                      title={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.props.contentMsg,
                          }}
                        />
                      }
                      type={this.props.tipeSWAL}
                      handleClose={this.props.closeSwal}
                    ></AppSwalSuccess>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  dataRejDoc: state.rejDoc.dataRejDoc || [],
  isFetching: state.rejDoc.isFetching,
  showFormSuccess: state.rejDoc.showFormSuccess,
  contentMsg: state.rejDoc.contentMsg,
  tipeSWAL: state.rejDoc.tipeSWAL,
  isAddLoading: state.rejDoc.isAddLoading,
  user: state.main.currentUser,
});
const mapDispatchToPros = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(profileUser());
      dispatch(getRejDoc());
    },
    changeProps: (param) => {
      dispatch(chgProps(param));
    },
    onSave: (param) => {
      dispatch(profileUser());
      dispatch(simpanRejDoc(param));
    },
    closeSwal: () => {
      dispatch(closeSwal());
      dispatch(getRejDoc());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToPros)(RejecctDocument);
