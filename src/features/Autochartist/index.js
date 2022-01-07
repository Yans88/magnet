import React, { Component } from 'react'
import { Panel } from 'rsuite';


export default class Autochartist extends Component {
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
                        <h1 style={{ marginBottom: 10, fontSize: 35, marginLeft: 10 }}>Autochartist</h1>
                        <div className="row">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "800px" }}>
                                    <div className="card-body">
                                        <div style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>

                                            <a href="https://victoryif.autochartist.com/aclite/VictoryIFMain?username=20001&account_type=LIVE&expire=1640024599&logintoken=3e5ba40216dd7aae171386000903f846&locale=in_ID" target="_blank">
                                                <h2 className='ahref-autochartist'>Autochartist Web Version</h2><br />
                                                <div classname="row">
                                                    <div classname="col-md-1" />
                                                    <div classname="col-md-3">
                                                        <div classname="download-box-item" style={{ background: '#FFF' }}><img src="https://victoryif.autochartist.com/aclite/images/logo.png" classname="header-logo" /></div>
                                                    </div>
                                                </div>
                                            </a>

                                            <br />
                                            <hr />
                                            <br />

                                            <h2 style={{ color: '#ffaf24' }}>Download Autochartist Mobile Apps</h2>
                                            <br />
                                            <div className="row">
                                                <div className="col-md-1" />
                                                <div className="col-md-3">
                                                    <a href="https://play.google.com/store/apps/details?id=com.autochartist.mobile" target="_blank"><div className="download-box-item" style={{ background: '#FFF' }}><img src="https://vifx.co.id/assets/cabinet/_ui/media/black_android.svg" className="header-logo" /></div></a>
                                                </div>
                                                <div className="col-md-3">
                                                    <a href="https://itunes.apple.com/us/app/autochartist/id903348229?mt=8" target="_blank"><div className="download-box-item" style={{ background: '#FFF' }}><img src="https://vifx.co.id/assets/cabinet/_ui/media/black_appstore.svg" className="header-logo" /></div></a>
                                                </div>
                                            </div>

                                            <br />
                                            <hr />
                                            <br />
                                            <h2 style={{ color: '#ffaf24' }}>Mobile App Activation QR Code</h2>

                                            <br />

                                            <div className="row">
                                                <div className="col-md-1" />
                                                <div className="col-md-3" id="qrcode"><img style={{ maxWidth: '100%' }} src="https://component.autochartist.com/to/resources/mobile/qr/image/?broker_id=489&account_type=LIVE&user=20001&token=5bc54a31de77e909d7d45846373dbca8&expire=1640025142" /></div>
                                            </div>

                                            <br />
                                            <hr />
                                            <br />
                                            <a href="https://component.autochartist.com/to/?broker_id=489&account_type=LIVE&user=20001&token=3e5ba40216dd7aae171386000903f846&expire=1640024599&trade_now=n&layout=horizontal&locale=id&css=https://www.autochartist.com/components-css/victory-to.css" target="_blank">
                                                <h2 className='ahref-autochartist'>Autochartist Trading Opportunities</h2><br />
                                                <div className="row">
                                                    <div className="col-md-1" />
                                                    <div className="col-md-3">
                                                        <div className="download-box-item" style={{ background: '#FFF' }}><img src="https://victoryif.autochartist.com/aclite/images/logo.png" className="header-logo" /></div>
                                                    </div>
                                                </div>
                                            </a>

                                            <br />
                                            <hr />
                                            <br />
                                            <a href="https://reports.autochartist.com/mr/?broker_id=489&rid=367&user=20001&demo=0&token=3e5ba40216dd7aae171386000903f846&expire=1640024599&css=https://www.autochartist.com/components-css/victory-mr.css" target="_blank">
                                                <h2 className='ahref-autochartist'>Autochartist Market Report</h2><br />
                                                <div className="row">
                                                    <div className="col-md-1" />
                                                    <div className="col-md-3">
                                                        <div className="download-box-item" style={{ background: '#FFF' }}><img src="https://victoryif.autochartist.com/aclite/images/logo.png" className="header-logo" /></div>
                                                    </div>
                                                </div>
                                            </a>


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
