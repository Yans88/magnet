import React, { Component } from 'react'
import { Panel } from 'rsuite';
import icon from '../../assets/unduh_ijo.svg';


export default class Unduh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSegmentUrl: "",
        }
    }

    componentDidMount = async () => {

        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }
    render() {

        return (

            <div className="content-wrapper">

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
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body">
                                       <div className="mobile-hide">

                                       <div className="grid grid-cols-2 place-items-center mt-0" >
                                                
                                                <div className="w-full px-3 py-3">

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
                                                
                                                <div className="w-full px-3 py-3">

                                                    <div className="border px-2 lg:px-5 py-4 rounded-2xl shadow-lg">
                                                        <div className="text-center">
                                                        <h3 style={{ color:'#2DB147',fontSize:"20px" }} className="text-lg">MT5 For Dekstop</h3>
                                                         </div>

                                                        <div className="grid grid-cols-2 place-items-center mt-3 w-full" >

                                                            <div className="w-[60%]">
                                                                <a href="https://download.mql5.com/cdn/web/pt.victory.international/mt5/victoryinternational5setup.exe">
                                                                    <img alt="Windows" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/windows_r.png" className="float-left" />
                                                                </a>
                                                                
                                                            </div>

                                                            <div className="w-[60%]">
                                                                <a href="https://www.metatrader5.com/en/terminal/help/start_advanced/install_mac" target="_new">
                                                                        <img alt="MAC" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" className="float-left" />
                                                                </a>
                                                                
                                                            </div>

                                                            <div className="w-[60%]">
                                                                <h1 style={{ fontSize: 20, color:"#2E2E2F" }} className="mt-2">&nbsp;Windows</h1>    
                                                            </div>

                                                            <div className="w-[60%]">
                                                                <h1 style={{ fontSize: 20, color:"#2E2E2F"}} className="mt-2">&nbsp;Mac OS</h1>    
                                                            </div>

                                                        </div>
                                                    </div>

                                                
                                                </div>

                                                
                                                <div className="w-full px-3 py-3">

                                                    <div className="border px-2 lg:px-5 py-4 rounded-2xl shadow-lg">
                                                        <div className="text-center">
                                                        <h3 style={{ color:'#2DB147',fontSize:"20px" }} className="text-lg">MT5 For Mobile</h3>
                                                         </div>

                                                        <div className="grid grid-cols-2 place-items-center mt-3 w-full" >

                                                            <div className="w-[60%]">
                                                                <a href="https://download.mql5.com/cdn/mobile/mt5/android?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                                    <img alt="Android" width="80px" src="https://new.vifx.co/assets/cabinet/_ui/media/android_r.png" className="float-left" />
                                                                </a>
                                                                
                                                            </div>

                                                            <div className="w-[60%]">
                                                                <a href="https://download.mql5.com/cdn/mobile/mt5/ios?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                                        <img alt="IOS" width="80x" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" className="float-left" />
                                                                </a>
                                                                
                                                            </div>

                                                            <div className="w-[60%]">
                                                                <h1 style={{ fontSize: 20, color:"#2E2E2F" }} className="mt-2">&nbsp;Android</h1>    
                                                            </div>

                                                            <div className="w-[30%]">
                                                                <h1 style={{ fontSize: 20, color:"#2E2E2F"}} className="mt-2">&nbsp;iOS</h1>    
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

                                            <ol>
                                                <li >
                                                    If you haven't download from the link above, <a href="https://download.mql5.com/cdn/web/pt.victory.international/mt5/victoryinternational5setup.exe">download here</a>.<br />
                                                    Open the downloaded file, and if you see this screen, click RUN<br />
                                                    <img alt="" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide1.png" />
                                                </li>
                                                <li>
                                                    Click NEXT, and go to guide number 3<br />
                                                    <img alt="" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide2.png" /><br />
                                                    Or if you want to change the installation folder and start menu group you can click SETTINGS<br />
                                                    <img alt="" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide21.png" /><br />
                                                    Here you can change the installation folder and start menu group<br />
                                                    After you're done, click NEXT
                                                </li>
                                                <li>
                                                    Wait for the download and installation to complete<br />
                                                    <img alt="" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide3.png" /><br />
                                                </li>
                                                <li>
                                                    Once the installation is done, click FINISH<br />
                                                    <img alt="" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide4.png" /><br />
                                                </li>
                                                <li>
                                                    Click NEXT<br />
                                                    <img alt="" width="850" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide5.png" /><br />
                                                </li>
                                                <li>
                                                    Login details<br />
                                                    <img alt="" width="850" src="https://new.vifx.co/assets/cabinet/_ui/media/winguide6.png" /><br />
                                                    Please choose "Connect with an existing trade account"<br />
                                                    Input your login and password of the account that's already created<br />
                                                    And choose your accout type (REAL/DEMO) on the server selection<br />
                                                    Then click FINISH<br />
                                                    <em style={{ color: '#900' }}>* You can have a demo login from menu <a href={'/'}>"My Account"</a> on the left panel, as for real trading account you'll have to finish up registration first, and if you want more accounts, you can simply request/create more on the <a href={'/'}>"My Account"</a> menu</em>
                                                </li>
                                            </ol>




                                        </div>

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
