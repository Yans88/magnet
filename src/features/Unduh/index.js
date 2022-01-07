import React, { Component } from 'react'
import { Panel } from 'rsuite';


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
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Unduh</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>

                                            <h3>MT5 For Dekstop</h3>
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="https://download.mql5.com/cdn/web/pt.victory.international/mt5/victoryinternational5setup.exe">
                                                        <Panel bordered style={{ padding: 15, textAlign: "center" }}>
                                                            <img alt="Windows" height="200" src="https://new.vifx.co/assets/cabinet/_ui/media/windows_r.png" />

                                                        </Panel>
                                                    </a>
                                                </div>

                                                <div className="col-sm-6">
                                                    <a href="https://www.metatrader5.com/en/terminal/help/start_advanced/install_mac" target="_new">
                                                        <Panel bordered style={{ padding: 15, textAlign: "center" }}>
                                                            <img alt="MAC" height="200" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" />
                                                        </Panel>
                                                    </a>
                                                </div>

                                            </div>

                                            <br />
                                            <br />
                                            <br />
                                            <h3>MT5 For Mobile</h3>
                                            <br />
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <a href="https://download.mql5.com/cdn/mobile/mt5/android?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                        <Panel bordered style={{ padding: 15, textAlign: "center" }}>
                                                            <img alt="Android" height="200" src="https://new.vifx.co/assets/cabinet/_ui/media/android_r.png" />

                                                        </Panel>
                                                    </a>
                                                </div>
                                                <div className="col-sm-6">
                                                    <a href="https://download.mql5.com/cdn/mobile/mt5/ios?server=VictoryInternational-DEMO,VictoryInternational-REAL&amp;utm_source=vifxpro.com&amp;utm_campaign=VIFXPRO" target="_new">
                                                        <Panel bordered style={{ padding: 15, textAlign: "center" }}>
                                                            <img alt="IOS" height="200" src="https://new.vifx.co/assets/cabinet/_ui/media/mac_r.png" />

                                                        </Panel>
                                                    </a>
                                                </div>
                                            </div>

                                            <br />
                                            <br />
                                            <br />
                                            <h3>Installation Guide for Windows</h3>
                                            <br />

                                            <ol>
                                                <li>
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
