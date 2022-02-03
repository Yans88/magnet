import React, { Component } from 'react'
import { Nav, Sidebar, Sidenav, Icon } from 'rsuite';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class MySidebar extends Component {

    constructor(props) {
        super(props);
        this.state = { lastSegmentUrl: "" }
    }

    componentDidMount = async () => {
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    handleMenu = async (dt) => {
        await (this.setState({ lastSegmentUrl: dt }));
    }

    render() {
        const { expandMenu } = this.props.main;
        const { profile } = this.props;
        const { lastSegmentUrl } = this.state;

        return (
            <div>
                <Sidebar
                    style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'rgb(31, 30, 30)' }}
                    width={expandMenu ? 230 : 56}
                    collapsible
                >
                    <Sidenav
                        className="my-sidebar"
                        expanded={expandMenu}
                        //defaultOpenKeys={[`${defaultOpenKeys}`]}
                        appearance="subtle">

                        <Sidenav.Body>
                            {expandMenu && (<h5 style={{ fontWeight: 600, fontSize: 14, marginLeft: 8 }}>STATUS<br /><span style={{ color: '#dc3545' }}>{profile.status_dokumen} </span>{profile.status_dokumen !== 'Approve' && (<a style={{ color: '#269647' }} href="personal">- Daftar disini</a>)}</h5>)}
                            <Nav>
                                <Nav.Item
                                    onSelect={e => this.handleMenu("/")}
                                    componentClass={Link}
                                    to='/'
                                    eventKey='/'
                                    exact='/'
                                    className={lastSegmentUrl === "/" || lastSegmentUrl === "" || lastSegmentUrl === "cooljek" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="user" />}>
                                    Akun Saya
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('deposit')}
                                    componentClass={Link}
                                    to='/deposit'
                                    exact='/deposit'
                                    eventKey='/deposit'
                                    className={lastSegmentUrl === "deposit" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" />}>
                                    Setoran
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('bank-accounts')}
                                    componentClass={Link}
                                    to='/bank-accounts'
                                    exact='/bank-accounts'
                                    eventKey='/bank-accounts'
                                    className={lastSegmentUrl === "bank-accounts" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" />}>
                                    Akun Bank
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('withdrawal')}
                                    componentClass={Link}
                                    to='/withdrawal'
                                    exact='/withdrawal'
                                    eventKey='/withdrawal'
                                    className={lastSegmentUrl === "withdrawal" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" />}>
                                    Penarikan
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('internal-transfer')}
                                    componentClass={Link}
                                    to='/internal-transfer'
                                    exact='/internal-transfer'
                                    eventKey='/internal-transfer'
                                    className={lastSegmentUrl === "internal-transfer" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" />}>
                                    Transfer Internal
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('downloads')}
                                    componentClass={Link}
                                    to='/downloads'
                                    exact='/downloads'
                                    eventKey='/downloads'
                                    className={lastSegmentUrl === "downloads" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="download2" />}>
                                    Unduh
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('contact')}
                                    componentClass={Link}
                                    to='/contact'
                                    exact='/contact'
                                    eventKey='/contact'
                                    className={lastSegmentUrl === "contact" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="tty" />}>
                                    Hubungi Kami
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('autochartist')}
                                    componentClass={Link}
                                    to='/autochartist'
                                    exact='/autochartist'
                                    eventKey='/autochartist'
                                    className={lastSegmentUrl === "autochartist" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="tty" />}>
                                    Autochartist
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('education')}
                                    componentClass={Link}
                                    to='/education'
                                    exact='/education'
                                    eventKey='/education'
                                    className={lastSegmentUrl === "education" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="mortar-board" />}>
                                    Yuk Belajar!
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('setting')}
                                    componentClass={Link}
                                    to='/setting'
                                    exact='/setting'
                                    eventKey='/setting'
                                    className={lastSegmentUrl === "setting" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="gear" />}>
                                    Pengaturan
                                </Nav.Item>
                                <Nav.Item
                                    onSelect={e => this.handleMenu('rej-doc')}
                                    componentClass={Link}
                                    to='/rej-doc'
                                    exact='/rej-doc'
                                    eventKey='/rej-doc'
                                    className={lastSegmentUrl === "rej-doc" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="gear" />}>
                                    Reject Document
                                </Nav.Item>
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>


                </Sidebar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        main: state.main,
        profile: state.main.dtProfileUser
    }
}

export default connect(mapStateToProps)(MySidebar);