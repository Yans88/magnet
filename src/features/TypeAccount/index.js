import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRate, getTA, chgPropsTA, closeForm, confirmDel, simpanDataTA } from './taSlice';
import { profileUser } from '../main/mainSlice';
import { Button, Col, Row, Form, Card, ListGroup } from 'react-bootstrap'
import AppModal from '../../components/modal/MyModal';

class TypeAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSegmentUrl: "",
            rate: ""
        }
    }

    componentDidMount = async () => {
		sessionStorage.removeItem("data_tipe_akun_id");
		sessionStorage.removeItem("tipe_akun");
		const act = sessionStorage.getItem('act_tipe_akun_id');
		if(act){
			const dt = {};
			dt['key'] = 'act';
			dt['value'] = act;
			this.props.changeProps(dt);
		}
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    handleChange(evt) {
        const name = evt.target.name;
        var value = evt.target.value;
        const dt = {};
        dt['key'] = name;
        dt['value'] = value;
        this.props.changeProps(dt);
    }

    handleClickBtn(record) {
        const dt = {};
        dt['key'] = 'tipe_akun';
        dt['value'] = record.tipe_akun_id;
        this.props.changeProps(dt);
        this.props.showConfirm(record.nama_tipe_akun);
    }

    handleNext= async () => {		
		console.log(this.props.dataSelect);
        await sessionStorage.setItem('tipe_akun', this.props.dataSelect.tipe_akun);
        this.props.onSave(this.props.dataSelect);
        this.props.history.push("/decleration");
        this.props.closeModal();
    }

    handleClose() {
        this.props.closeModal();
    };

    render() {
        const { lastSegmentUrl } = this.state;
        const { dataRate, dataTypeAccount, dataSelect } = this.props;
        const contentDelete = <div dangerouslySetInnerHTML={{ __html: '<div id="caption" style=padding-bottom:20px;">Anda yakin memesan tipe akun <strong>' + dataSelect.message + '</strong> ?</div>' }} />;

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
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Registrasi Akun Online</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "600px",borderRadius:"2rem"  }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20 }}>
                                            <Form.Group as={Row} controlId="rate">
                                                <Form.Label column sm={2}><h5>Rate</h5></Form.Label>
                                                <Col sm={3}>
                                                    <Form.Control
                                                        name="rate"
                                                        size="lg"
                                                        value={dataSelect.rate ? dataSelect.rate : ''}
                                                        onChange={this.handleChange.bind(this)}
                                                        as="select">
                                                        <option value="">Pilih</option>
                                                        {dataRate ? (
                                                            dataRate.map(function (dr) {
                                                                return <option
                                                                    value={dr.rate_id}
                                                                    key={dr.rate_id}>{dr.nama_rate}
                                                                </option>
                                                            })

                                                        ) : ''}

                                                    </Form.Control>
                                                </Col>

                                            </Form.Group>
                                            <br />
                                            <Row>
                                                {dataTypeAccount ? (
                                                    dataTypeAccount.map((dta) => {
                                                        return <Col key={dta.tipe_akun_id} xs={4}>
                                                            <Card
                                                                bg="light">
                                                                <Card.Header><strong>{dta.nama_tipe_akun}</strong></Card.Header>

                                                                <ListGroup variant="flush">
                                                                    <ListGroup.Item>Deposit Minimum <span className="pull-right"> {dta.deposit} </span> </ListGroup.Item>
                                                                    <ListGroup.Item>Leverage  <span className="pull-right"> {dta.leverage}</span></ListGroup.Item>
                                                                    <ListGroup.Item>Komisi <span className="pull-right"> {dta.komisi}</span></ListGroup.Item>
                                                                    <ListGroup.Item>Lot Minimum <span className="pull-right"> {dta.lot_minimum} lot/klik</span></ListGroup.Item>
                                                                    <ListGroup.Item>Lot Maximum <span className="pull-right"> {dta.lot_maximum} lot/klik</span></ListGroup.Item>
                                                                    <ListGroup.Item>Spread <span className="pull-right">{dta.spread}</span></ListGroup.Item>
                                                                </ListGroup>
                                                                <Card.Body style={{ padding: ".65rem" }}>
                                                                    <Button
                                                                        onClick={this.handleClickBtn.bind(this, dta)}
                                                                        disabled={dataSelect.rate ? false : true}
                                                                        size="lg" variant="" style={{ backgroundColor:"#C3262A",color:"#fff",marginRight:"2%"}}>Daftar Akun</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    })

                                                ) : ''}

                                            </Row>


                                        </div>

                                    </div>

                                </div>
                                <AppModal
                                    show={this.props.showFormDelete}
                                    size="xs"
                                    form={contentDelete}
                                    handleClose={this.handleClose.bind(this)}
                                    backdrop="static"
                                    keyboard={false}
                                    title="Confirm"
                                    titleButton="Selanjutanya"
                                    themeButton=""
                                    style={{ backgroundColor:"#C3262A",color:"#fff",marginRight:"2%"}}
                                    isLoading={false}
                                    formSubmit={this.handleNext.bind(this)}
                                ></AppModal>
                            </div>
                        </div>
                    </div>
                </section>
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    dataRate: state.typeAcc.dataRate || [],
    dataTypeAccount: state.typeAcc.dataTypeAccount || [],
    dataSelect: state.typeAcc.dataSelect || {},
    isError: state.typeAcc.isError,
    errorMessage: state.typeAcc.errorMessage,
    isFetching: state.typeAcc.isFetching,
    isSuccess: state.typeAcc.isSuccess,
    showFormDelete: state.typeAcc.showFormDelete,
    user: state.main.currentUser,
})

const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
			dispatch(profileUser());
            dispatch(getRate());
            dispatch(getTA());
        },
        onSave: (param) => {
			dispatch(profileUser());
            dispatch(simpanDataTA(param));
        },
        changeProps: (param) => {
            dispatch(chgPropsTA(param));
        },
        showConfirm: (data) => {
            dispatch(confirmDel(data));
        },
        closeModal: () => {
            dispatch(closeForm());
        },
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(TypeAccount);