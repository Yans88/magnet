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
                    style={{ display: 'flex', flexDirection: 'column' }}
                    width={expandMenu ? 230 : 56}
                    collapsible
                >
                    <Sidenav
                        className="my-sidebar"
                        expanded={expandMenu}
                        //defaultOpenKeys={[`${defaultOpenKeys}`]}
                        appearance="subtle">

                        <Sidenav.Body>
                            <Nav>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item
                                    onSelect={e => this.handleMenu("/")}
                                    componentClass={Link}
                                    to='/'
                                    eventKey='/'
                                    exact='/'
                                    className={lastSegmentUrl === "/" || lastSegmentUrl === "" || lastSegmentUrl === "personal" || lastSegmentUrl === "account-type" || lastSegmentUrl === "decleration" || lastSegmentUrl === "trading_rules" || lastSegmentUrl === "company_profile" || lastSegmentUrl === "cooljek" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    
                                    icon={<Icon icon="user" style={{left:"14px"}} />}>

                                    Akun Saya
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    

                                    onSelect={e => this.handleMenu('deposit')}
                                    componentClass={Link}
                                    to='/deposit'
                                    exact='/deposit'
                                    eventKey='/deposit'
                                    className={lastSegmentUrl === "deposit" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" style={{left:"9px"}} />}>
                                        
                                        Setoran
                                   
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								 <Nav.Item                                    

                                    onSelect={e => this.handleMenu('bank-accounts')}
                                    componentClass={Link}
                                    to='/bank-accounts'
                                    exact='/bank-accounts'
                                    eventKey='/bank-accounts'
                                    className={lastSegmentUrl === "bank-accounts" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" style={{left:"9px"}} />}>
                                    Akun Bank
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								<Nav.Item                                    
                                    onSelect={e => this.handleMenu('withdrawal')}
                                    componentClass={Link}
                                    to='/withdrawal'
                                    exact='/withdrawal'
                                    eventKey='/withdrawal'
                                    className={lastSegmentUrl === "withdrawal" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" style={{left:"9px"}} />}>
                                    Penarikan
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								<Nav.Item                                    
                                    onSelect={e => this.handleMenu('internal-transfer')}
                                    componentClass={Link}
                                    to='/internal-transfer'
                                    exact='/internal-transfer'
                                    eventKey='/internal-transfer'
                                    className={lastSegmentUrl === "internal-transfer" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="credit-card" style={{left:"9px"}} />}>
                                    Transfer Internal
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    
                                    onSelect={e => this.handleMenu('downloads')}
                                    componentClass={Link}
                                    to='/downloads'
                                    exact='/downloads'
                                    eventKey='/downloads'
                                    className={lastSegmentUrl === "downloads" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="download2" style={{left:"9px"}} />}>
                                    Unduh
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    
                                    onSelect={e => this.handleMenu('contact')}
                                    componentClass={Link}
                                    to='/contact'
                                    exact='/contact'
                                    eventKey='/contact'
                                    className={lastSegmentUrl === "contact" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="tty" style={{left:"9px"}} />}>
                                    Hubungi Kami
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								 <Nav.Item                                    
                                    onSelect={e => this.handleMenu('autochartist')}
                                    componentClass={Link}
                                    to='/autochartist'
                                    exact='/autochartist'
                                    eventKey='/autochartist'
                                    className={lastSegmentUrl === "autochartist" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="tty" style={{left:"9px"}} />}>
                                    Autochartist
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item
                                    onSelect={e => this.handleMenu('education')}
                                    componentClass={Link}
                                    to='/education'
                                    exact='/education'
                                    eventKey='/education'
                                    className={lastSegmentUrl === "education" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="mortar-board" style={{left:"9px"}} />}>
                                    Yuk Belajar!
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                
                                <Nav.Item
                                    onSelect={e => this.handleMenu('setting')}
                                    componentClass={Link}
                                    to='/setting'
                                    exact='/setting'
                                    eventKey='/setting'
                                    className={lastSegmentUrl === "setting" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="gear" style={{left:"9px"}} />}>
                                    Pengaturan
                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    
                                    onSelect={e => this.handleMenu('rej-doc')}
                                    componentClass={Link}
                                    to='/rej-doc'
                                    exact='/rej-doc'
                                    eventKey='/rej-doc'
                                    className={lastSegmentUrl === "rej-doc" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    icon={<Icon icon="gear" style={{left:"9px"}} />}>
                                    Reject Document
                                </Nav.Item>
                                </div>
                                
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