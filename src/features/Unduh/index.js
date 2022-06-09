import React, { Component, Fragment } from 'react'
import { Panel } from 'rsuite';
import icon from '../../assets/unduh_ijo.svg';
import { connect } from 'react-redux';
import { getSetting } from '../KetentuanTrading/ktSlice'

class Unduh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSegmentUrl: "",
        }
    }

    componentDidMount = async () => {
		this.props.onLoad();
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
    render() {
		const { data_setting } = this.props;
        return (

            <div className="content-wrapper pr-1">

                <section className="content">
                    <div className="container-fluid">
                        
                        
                        <div className="mobile-hide">
                        <img src={icon} width="35px" className="float-left mt-3" />    
                        <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Unduh</h1>
                        </div>

                        <div className="mobile-view">
                        <img src={icon} width="30px" className="float-left mt-3" />    
                        <h1 style={{ marginBottom: 10, fontSize: 20, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Unduh</h1>
                        </div>

                        <div className="row">
                            <div className="w-full px-3">
                                {/* card start */}
                                <div className="shadow-lg px-3" style={{ "minHeight": "800px" }}>
                                    
                                       <div className="mobile-hide">

                                       <div className="grid grid-cols-2 place-items-center mt-0" >
                                                
                                                <div className="w-full px-0 py-3">

                                                    <div className="border px-5 py-4 rounded-2xl shadow-lg">
                                                        <h3 style={{ color:'#2DB147' }} className="text-lg">MT5 For Dekstop</h3>
                                                        <div className="grid grid-cols-1 place-items-center mt-3 w-full" >

                                                            <div className="w-full">
                                                                <a href="https://download.mql5.com/cdn/web/pt.victory.international/mt5/victoryinternational5setup.exe">
                                                                    <img alt="Windows" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/windows_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ marginBottom: 10, fontSize: 28, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }} className="mt-3">&nbsp;Windows</h1>
                                                            </div>

                                                            <div className="w-full mt-1 mt-5">
                                                                <a href="https://www.metatrader5.com/en/terminal/help/start_advanced/install_mac" target="_new">
                                                                        <img alt="MAC" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ marginBottom: 10, fontSize: 28, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }} className="mt-3">&nbsp;Mac OS</h1>
                                                            </div>

                                                        </div>
                                                    </div>

                                                
                                                </div>

                                                
                                                <div className="w-full px-3 py-3">

                                                    <div className="border px-5  py-4 rounded-2xl shadow-lg">
                                                        <h3 style={{ color:'#2DB147' }} className="text-lg">MT5 For Mobile</h3>
                                                        <div className="grid grid-cols-1 place-items-center mt-3 w-full" >

                                                            <div className="w-full">
                                                                <a href="https://download.mql5.com/cdn/mobile/mt5/android?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                                    <img alt="Android" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/android_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }} className="mt-3">&nbsp;Android</h1>
                                                            </div>

                                                            <div className="w-full mt-5">
                                                                <a href="https://download.mql5.com/cdn/mobile/mt5/ios?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                                        <img alt="IOS" width="80x" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }} className="mt-3">&nbsp;iOS</h1>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                       </div>
                                       
                                       <div className="mobile-view">

                                            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center mt-0" >
                                                
                                                <div className="w-full px-0 py-3">

                                                    <div className="border px-2 lg:px-5 py-4 rounded-2xl shadow-lg">
                                                        <div className="text-center">
                                                        <h3 style={{ color:'#2DB147',fontSize:"20px" }} className="text-lg">MT5 For Dekstop</h3>
                                                         </div>

                                                         <div className="grid grid-cols-2 place-items-center mt-3 w-full" >

                                  

                                                            <div className="w-[100%] flex flex-col justify-center items-center col-span-12 lg:col-span-6">
                                                                <a href="https://download.mql5.com/cdn/web/pt.victory.international/mt5/victoryinternational5setup.exe">
                                                                    <img alt="Windows" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/windows_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ fontSize: 18, color:"#2E2E2F" }} className="mt-2">&nbsp;Windows</h1>  
                                                            </div>

                                                            <div className="w-[100%] flex flex-col justify-center items-center col-span-12 lg:col-span-6">
                                                            <a href="https://www.metatrader5.com/en/terminal/help/start_advanced/install_mac" target="_new">
                                                                        <img alt="MAC" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ fontSize: 18, color:"#2E2E2F"}} className="mt-2">&nbsp;Mac OS</h1>
                                                            </div>

                                                        </div>
                                                    </div>

                                                
                                                </div>

                                                
                                                <div className="w-full px-0 py-3">

                                                    <div className="border px-2 lg:px-5 py-4 rounded-2xl shadow-lg">
                                                        <div className="text-center">
                                                        <h3 style={{ color:'#2DB147',fontSize:"20px" }} className="text-lg">MT5 For Mobile</h3>
                                                         </div>

                                                        <div className="grid grid-cols-2 place-items-center mt-3 w-full" >

                                                            <div className="flex flex-col justify-center items-center col-span-12 lg:col-span-6">
                                                                <a href="https://download.mql5.com/cdn/mobile/mt5/android?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                                    <img alt="Android" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/android_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ fontSize: 18, color:"#2E2E2F" }} className="mt-2">&nbsp;Android</h1> 
                                                            </div>

                                                            <div className="flex flex-col justify-center items-center col-span-12 lg:col-span-6">
                                                                <a href="https://download.mql5.com/cdn/mobile/mt5/ios?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                                        <img alt="IOS" width="80x" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" className="float-left" />
                                                                </a>
                                                                <h1 style={{ fontSize: 18, color:"#2E2E2F"}} className="mt-2">&nbsp;iOS</h1> 
                                                            </div>

                                  

                                                        </div>
                                                    </div>


                                                </div>

                                            </div>


                                        </div>
                                        
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10,color:'#222' }}>

                                            
                                            <br />
                                            <br />
                                            <br />
                                            <h3 style={{color:"#222"}}>Installation Guide for Windows</h3>
                                            <br />
											
											 {data_setting
                          ? data_setting.map((dp, index) => {
                              return (
                                <Fragment key={dp.setting_id}>
									{dp.nama_setting === 'link_youtube_unduh' &&
									   <iframe
										  width="700"
										  height="500"

										  src={dp.value}
										  title="Installation Guide for Windows"
										  frameBorder="0"
										  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										  allowFullScreen="1"
										></iframe>
								  }
                                </Fragment>
                              );
                            })
                          : ""}

                                           




                                        </div>

                                

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>



        )
    }
}
const mapStateToProps = (state) => ({
    data_setting: state.dtSetting.dataSetting || [],
   
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
            dispatch(getSetting());            
        },
        
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Unduh);