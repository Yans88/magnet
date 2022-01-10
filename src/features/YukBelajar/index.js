import React, { Component } from 'react'
import { Nav } from 'rsuite';
import { connect } from 'react-redux';
import { getDataPP, action_contact_us, closeForm } from '../ProfilePerusahaan/ppSlice'
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';

class YukBelajar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastSegmentUrl: "",
            active_tab: "detil_pribadi",

            loadingForm: false
        }
    }

    componentDidMount = async () => {
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }




    handleSelect(activeKey) {
        this.setState({ active_tab: activeKey });
    }

    render() {

        const { profile_perusahaan } = this.props;
        const { active_tab } = this.state;

        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Yuk Belajar!</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25 }}>
                                            <h3>Edukasi Tingkat Pemula</h3>
											<br/>
                                            <div className="row">

                                                <div className="col-sm-3">
                                                    <Nav appearance="subtle" reversed activeKey={active_tab} vertical className="tab_personal">
                                                        <Nav.Item
                                                            onSelect={this.handleSelect.bind(this)}
                                                            active={active_tab === 'perkenalan' ? true : false}
                                                            eventKey="perkenalan"
                                                            className="yb" >PERKENALAN
                                                        </Nav.Item>

                                                        <Nav.Item
                                                            eventKey="terminologi"
                                                            onSelect={this.handleSelect.bind(this)}
                                                            active={active_tab === 'terminologi' ? true : false}
                                                            className="yb">TERMINOLOGI
                                                        </Nav.Item>
														
														<Nav.Item
                                                            eventKey="kesalahan"
                                                            onSelect={this.handleSelect.bind(this)}
                                                            active={active_tab === 'terminologi' ? true : false}
                                                            className="yb">KESALAHAN <br/>TERBURUK YANG <br/>DIBUAT TRADER 
                                                        </Nav.Item>

                                                    </Nav>
                                                </div>

                                                <div className="col-sm-9">

                                                </div>
                                            </div>




                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {this.props.showFormSuccess ? (<AppSwalSuccess
                    show={this.props.showFormSuccess}
                    title={<div dangerouslySetInnerHTML={{ __html: this.props.contentMsg }} />}
                    type={this.props.tipeSWAL}
                    handleClose={this.handleCloseSwal.bind(this)}
                >
                </AppSwalSuccess>) : ''}

            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    profile_perusahaan: state.companyProfile.profile_perusahaan || {},
    contentMsg: state.companyProfile.contentMsg || null,
    showFormSuccess: state.companyProfile.showFormSuccess,
    tipeSWAL: state.companyProfile.tipeSWAL,
    profile: state.main.dtProfileUser,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(getDataPP());
        },
        onSubmit: (param) => {
            dispatch(action_contact_us(param));
        },
        closeSwal: () => {
            dispatch(closeForm());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(YukBelajar);