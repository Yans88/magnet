import React, { Component } from 'react'
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import { getDataPP,action_contact_us,closeForm } from '../ProfilePerusahaan/ppSlice'
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import icon from '../../assets/hubungi_kami_2.svg';
import phone_red from '../../assets/phone.svg';
import wa_red from '../../assets/wa.svg';
import email_red from '../../assets/email_white.svg';
import location_red from '../../assets/location_white.svg';


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
                    <div className="container-fluid mt-3">
                        <img src={icon} width="35px" className="float-left mt-3" />
                        <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Hubungi Kami</h1>

                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px",borderRadius:"20px" }}>
                                    <div className="card-body p-0" >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center mt-0" >
                                            <div>
                                                
                                                <div className="hub_kami alert alert-success alert-sm" style={{ backgroundColor: '#1A9425', paddingTop: 30,color:"#fff",borderRadius:"20px",marginBottom:"0rem" }} >
                                                        <h2 style={{ color:"#fff"}}>Contact Information</h2>
                                                        <p className="text-base font-bold text-white text-left pt-2 pb-2 ...">Fill up the form and our Team will get back to you within 24 hours</p>

                                                        <div className="flex pt-5">

                                                            <div className="flex-none w-10  ...">
                                                                <img src={wa_red} width="30px" />
                                                            </div>
                                                            <div className="flex-grow  ...">
                                                                <p className="text-base font-bold text-black text-left ...">
                                                                <a href="https://api.whatsapp.com/send?phone=6287835355526&text=Halo" title="">  
                                                                <span className="text-white">{profile_perusahaan.telp}</span>
                                                                </a>
                                                                </p>
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex pt-5">

                                                            <div className="flex-none w-10  ...">
                                                            <img src={phone_red} width="30px" />
                                                            </div>
                                                            <div className="flex-grow  ...">
                                                            <p className="text-base font-bold text-gray-600 text-left ...">
                                                                <a href="tel:+62212506336" title="">
                                                                <span className="text-white">{profile_perusahaan.telp_compliance}</span>
                                                                </a>
                                                            </p>
                                                            </div>

                                                        </div>

                                                        <div className="flex pt-5">

                                                            <div className="flex-none w-10  ...">
                                                                <img src={email_red} width="30px" />
                                                            </div>
                                                            <div className="flex-grow  ...">
                                                            <p className="text-base font-bold text-gray-600 text-left ...">
                                                            <a href="mailto:info@magnetfx.co.id" title="">
                                                                    <span className="text-white">{profile_perusahaan.email}</span>
                                                                </a>
                                                            </p>
                                                            </div>

                                                        </div>

                                                        <div className="flex pt-5">

                                                            <div className="flex-none w-10  ...">
                                                            <img src={location_red} width="30px" />
                                                            </div>
                                                            <div className="flex-grow  ...">
                                                            <p className="text-base font-bold text-white text-left ...">
                                                            Gedung Sona Topas Tower - Lt. 18 Suite 1804
                                                            Jl. Jend. Sudirman Kav. 26
                                                            Jakarta Selatan 12920
                                                            Indonesia
                                                            </p>
                                                            </div>

                                                        </div>

                                                        <div className="flex pt-5 pb-20">

                                                            <div className="flex-none w-10  ...">
                                                                <img src={email_red} width="30px" />
                                                            </div>
                                                            <div className="flex-grow  ...">
                                                            <p className="text-base font-bold text-gray-600 text-left ...">
                                                                <a href={profile_perusahaan.website}><span className="text-white">{profile_perusahaan.website}</span></a>
                                                            </p>
                                                            </div>

                                                        </div>


                                                        

                                                </div>

                                            </div>

                                            <div className="w-3/4 h-[80%]">
                                            <Form>
                                                        <Form.Group controlId="subjek">
                                                            <Form.Label><span style={{fontWeight:"bold",color:"#000"}}>Subjek</span></Form.Label>
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
                                                        <div className="grid grid-cols-1 mt-0" >
                                                            <div className="w-[40%] pt-2">
                                                                <AppButton
                                                                disabled ={this.state.selected.message && this.state.selected.subjek ? false : true}
                                                                style={{ color: "#fff", marginTop: 10 }}
                                                                onClick={this.handleSubmit.bind(this)}
                                                                type="button"
                                                                size="lg"
                                                                theme=""
                                                                style={{ backgroundColor:"#C3262A",color:"#fff"}}
                                                                >
                                                                HUBUNGI KAMI</AppButton>
                                                            </div>
                                                        </div>
                                                    </Form>
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
export default connect(mapStateToProps, mapDispatchToPros)(HubungiKami);