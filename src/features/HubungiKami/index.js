import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import { getDataPP,action_contact_us,closeForm } from '../ProfilePerusahaan/ppSlice'
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import { profileUser } from '../main/mainSlice'

class HubungiKami extends Component {
    constructor(props) {
        super(props);
		this.initSelected = {
            nama_depan: "",
			nama_belakang:"",
            email: "",
            phone: "",
            message: "",    
			subjek:'',
        }
        this.state = {
            lastSegmentUrl: "",
            selected: this.initSelected,
            errMsg: this.initSelected,
			loadingForm:false
        }
    }

    componentDidMount = async () => {
        this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
	
	 handleChange(evt) {
        const name = evt.target.name;
        var val = evt.target.value;
       this.setState({
            loadingForm: false,
            errMsg: { ...this.state.errMsg, [name]: "" },
            selected: {
                ...this.state.selected,
				nama_depan:this.props.user.nama_depan,
				nama_belakang:this.props.user.nama_belakang,
				email:this.props.profile.email,
				phone:this.props.user.handphone,
                [name]: val
            }
        });
    }
	
	handleSubmit() {
        this.props.onSubmit(this.state.selected);

    }
	
	handleCloseSwal() {       
		this.setState({
			selected: {
                 ...this.state.selected,
                message: "",    
				subjek:'',
            }
		})
        this.props.closeSwal();        
    }
	
    render() {

        const { profile_perusahaan } = this.props;
        const { selected } = this.state;
		
        return (

            <div className="content-wrapper">

                <section className="content">
                    <div className="container-fluid">
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Hubungi Kami</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 25 }}>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <Form>
                                                        <Form.Group controlId="subjek">
                                                            <Form.Label>Subjek</Form.Label>
                                                            <Form.Control
                                                                autoComplete="off"
                                                                size="lg"
                                                                name="subjek"
                                                                type="text"
																onChange={this.handleChange.bind(this)}
																value={selected.subjek}
                                                                required
                                                                placeholder="Masukkan Subjek" />
                                                        </Form.Group>
                                                        <Form.Group controlId="message">
                                                            <Form.Label>Pesan</Form.Label>

                                                            <Form.Control
                                                                autoComplete="off"
																value={selected.message}
                                                                rows={10}
                                                                name="message"
                                                                as="textarea"
																onChange={this.handleChange.bind(this)}
                                                                required
                                                                placeholder="Masukkan Pesan" />
                                                        </Form.Group>
                                                        <AppButton
                                                            disabled ={this.state.selected.message && this.state.selected.subjek ? false : true}
                                                            style={{ color: "#fff", marginTop: 10 }}
															onClick={this.handleSubmit.bind(this)}
                                                            type="button"
                                                            size="lg"
                                                            theme="warning">
                                                            HUBUNGI KAMI</AppButton>
                                                    </Form>
                                                </div>

                                                <div className="col-sm-6">
                                                    <div className="hub_kami alert alert-success alert-sm" style={{ backgroundColor: '#effbf3', paddingTop: 30 }} >
                                                        <h3 className="h6 mb-4">KANTOR PUSAT</h3>
                                                        <h5><div dangerouslySetInnerHTML={{ __html: profile_perusahaan.alamat }} /></h5>
                                                       
                                                        <br />
                                                        <h3 className="h6">TELEPON</h3>
                                                        <p>
                                                            <a href={"tel:" + profile_perusahaan.telp}>{profile_perusahaan.telp}</a><br />
                                                            <a href="tel:+62 31 9924 8699">+62 31 9924 8699</a><br />
                                                        </p>
                                                        <h3 className="h6">FAX</h3>
                                                        <p>
                                                            <a href={"tel:" + profile_perusahaan.fax}>{profile_perusahaan.fax}</a>
                                                        </p>
                                                        <h3 className="h6">WHATSAPP</h3>
                                                        <p>
                                                            <a href="#">+62822 1156 5758 (Settlement)</a>
                                                        </p>
                                                        <h3 className="h6">EMAIL</h3>
                                                        <p>
                                                            <a href={"mailto:" + profile_perusahaan.email}>{profile_perusahaan.email}</a>
                                                        </p>
                                                        <h3 className="h6">WEBSITE</h3>
                                                        <p>
                                                            <a href={profile_perusahaan.website}>{profile_perusahaan.website}</a>
                                                        </p>
                                                    </div>
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
			dispatch(profileUser());
            dispatch(getDataPP());
        },
		onSubmit: (param) => {
			dispatch(profileUser());
            dispatch(action_contact_us(param));
        },
		closeSwal: () => {
            dispatch(closeForm());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(HubungiKami);