import React, { Component } from 'react'
import { Nav, Sidebar, Sidenav, Icon } from 'rsuite';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clickExpand} from '../features/main/mainSlice'
import { Disclosure } from '@headlessui/react'
import { BiCaretRight } from 'react-icons/bi'
import icon_akun from '../assets/icon/akun_white.svg';
import icon_finance from '../assets/icon/keuangan_white.svg';
import icon_hubungi from '../assets/icon/hubungi_kami_white.svg';
import icon_unduh from '../assets/icon/unduh_white.png';
import icon_belajar from '../assets/icon/yuk_belajar_white.svg';
import icon_autochartist from '../assets/icon/autochartist_white.svg';
import icon_pengaturan from '../assets/icon/pengaturan_white.png';
import icon_reject from '../assets/icon/reject_white.png';

import icon_penarikan from '../assets/icon/penarikan.png';
import icon_setoran from '../assets/icon/setoran.png';
import icon_transfer from '../assets/icon/transfer_internal.png';
import icon_akun_bank from '../assets/icon/akun_bank.png';

class MySidebar extends Component {

    constructor(props) {
        super(props);
        this.state = { lastSegmentUrl: "" }
    }

    componentDidMount = async () => {
        const location = window.location.href;
        this.props.onLoad();
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    

    handleMenu = async (dt) => {
        await (this.setState({ lastSegmentUrl: dt }));
    }

    handleToggle() {
        this.props.onClickExpand();
    }

    render() {
        const { expandMenu } = this.props.main;
        const { profile } = this.props;
        const { lastSegmentUrl } = this.state;

        return (
            <div onLoad={this.handleToggle.bind(this)} >
                <div className='absolute mobile-view' style={{zIndex:'1000'}} >
                <Sidebar
                    style={{  flexDirection: 'column' }}
                    width={expandMenu ? 400 : 0}
                    collapsible
                >
                    <Sidenav
                        className="my-sidebar "
                        expanded={expandMenu}
                        width={expandMenu ? 390 : 0}
                        //defaultOpenKeys={[`${defaultOpenKeys}`]}
                        appearance="subtle">

                        <Sidenav.Body>
                            <Nav>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item
                                    onSelect={e => this.handleMenu("/")}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/'
                                    eventKey='/'
                                    exact='/'
                                    className={lastSegmentUrl === "/" || lastSegmentUrl === "" || lastSegmentUrl === "personal" || lastSegmentUrl === "account-type" || lastSegmentUrl === "decleration" || lastSegmentUrl === "trading_rules" || lastSegmentUrl === "company_profile" || lastSegmentUrl === "cooljek" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    
                                    >

                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_akun} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Akun Saya
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    

                                    onSelect={e => this.handleMenu('deposit')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/deposit'
                                    exact='/deposit'
                                    eventKey='/deposit'
                                    className={lastSegmentUrl === "deposit" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                        
                                       
                                        <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_setoran} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Setoran
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								 <Nav.Item                                    

                                    onSelect={e => this.handleMenu('bank-accounts')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/bank-accounts'
                                    exact='/bank-accounts'
                                    eventKey='/bank-accounts'
                                    className={lastSegmentUrl === "bank-accounts" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_akun_bank} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Akun Bank
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								<Nav.Item                                    
                                    onSelect={e => this.handleMenu('withdrawal')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/withdrawal'
                                    exact='/withdrawal'
                                    eventKey='/withdrawal'
                                    className={lastSegmentUrl === "withdrawal" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_penarikan} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Penarikan
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								<Nav.Item                                    
                                    onSelect={e => this.handleMenu('internal-transfer')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/internal-transfer'
                                    exact='/internal-transfer'
                                    eventKey='/internal-transfer'
                                    className={lastSegmentUrl === "internal-transfer" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_transfer} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Transfer Internal
                                        </div>
                                    </div> 


                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    
                                    onSelect={e => this.handleMenu('downloads')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/downloads'
                                    exact='/downloads'
                                    eventKey='/downloads'
                                    className={lastSegmentUrl === "downloads" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_unduh} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Unduh
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    
                                    onSelect={e => this.handleMenu('contact')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/contact'
                                    exact='/contact'
                                    eventKey='/contact'
                                    className={lastSegmentUrl === "contact" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                   

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_hubungi} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Hubungi Kami
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
								 <Nav.Item                                    
                                    onSelect={e => this.handleMenu('autochartist')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/autochartist'
                                    exact='/autochartist'
                                    eventKey='/autochartist'
                                    className={lastSegmentUrl === "autochartist" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_autochartist} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Autochartist
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item
                                    onSelect={e => this.handleMenu('education')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/education'
                                    exact='/education'
                                    eventKey='/education'
                                    className={lastSegmentUrl === "education" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_belajar} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Yuk Belajar!
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                
                                <Nav.Item
                                    onSelect={e => this.handleMenu('setting')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/setting'
                                    exact='/setting'
                                    eventKey='/setting'
                                    className={lastSegmentUrl === "setting" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_pengaturan} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Pengaturan
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                <div className="menu_side mx-2 my-2 rounded-xl">
                                <Nav.Item                                    
                                    onSelect={e => this.handleMenu('rej-doc')}
                                    onClick={this.handleToggle.bind(this)}
                                    componentClass={Link}
                                    to='/rej-doc'
                                    exact='/rej-doc'
                                    eventKey='/rej-doc'
                                    className={lastSegmentUrl === "rej-doc" ? ("my-dropdown my-dropdown-active") : ("my-dropdown")}
                                    >
                                    
                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_reject} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Reject Document

                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>


                </Sidebar>

                </div>    
                <div className="mobile-hide">
                <Sidebar
                    style={{ display:'flex', flexDirection: 'column' }}
                    width={expandMenu ? 230 : 56}
                    collapsible
                >
                    <Sidenav
                        className="my-sidebar "
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
                                    >
                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_akun} width="22px" className="float-left" />    
                                        </div>
                                        <div>
                                            Akun Saya
                                        </div>
                                    </div>    
                                   

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
                                    >
                                        
                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_setoran} width="22px" className="float-left" />    
                                        </div>
                                        <div>
                                            Setoran
                                        </div>
                                    </div>   
                                   
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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_akun_bank} width="22px" className="float-left" />    
                                        </div>
                                        <div>
                                        Akun Bank
                                        </div>
                                    </div>

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
                                    >
                                    
                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_penarikan} width="22px" className="float-left" />    
                                        </div>
                                        <div>
                                        Penarikan
                                        </div>
                                    </div>

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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_transfer} width="22px" className="float-left" />    
                                        </div>
                                        <div>
                                        Transfer Internal
                                        </div>
                                    </div>

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
                                    >
                                    
                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_unduh} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                            Unduh
                                        </div>
                                    </div>   

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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_hubungi} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Hubungi Kami
                                        </div>
                                    </div>   

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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_autochartist} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Autochartist
                                        </div>
                                    </div> 

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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_belajar} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Yuk Belajar!
                                        </div>
                                    </div>

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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_pengaturan} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Pengaturan
                                        </div>
                                    </div> 

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
                                    >
                                    

                                    <div className="flex">
                                        <div className="px-2">
                                            <img src={icon_reject} width="18px" className="float-left" />    
                                        </div>
                                        <div>
                                        Reject Document
                                        </div>
                                    </div> 

                                </Nav.Item>
                                </div>
                                
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>


                </Sidebar>
                </div>
            </div>
        )
    }
}

const mapDispatchToPros = (dispatch) => {
    return {
        onClickExpand: () => {
            dispatch(clickExpand());
        },
        onLoad: (dt) => {
            dispatch(clickExpand());
        }
    }
}

const mapStateToProps = (state) => {

    return {
        main: state.main,
        profile: state.main.dtProfileUser
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(MySidebar);