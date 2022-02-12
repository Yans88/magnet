import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import AppButton from '../../components/button/Button';
import { getAkunTrading, closeForm, getHistorySetor, getAkunTradingTo,actionTransfer } from '../Transfer/transferSlice';
import { profileUser } from '../main/mainSlice';
import NumberFormat from 'react-number-format';
import { AppSwalSuccess } from '../../components/modal/SwalSuccess';
import moment from 'moment';
import "moment/locale/id";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import ReactDatatable from '@ashvin27/react-datatable';
import icon from '../../assets/transfer_ijo.svg';

var yesterday = moment();
var valid_startDate = function (current) {
    return current.isBefore(yesterday);
};

class Transfer extends Component {
    constructor(props) {
        super(props);
        this.initSelected = {
            transfer_id: '',
            nominal: '',
            from: '',
            to: '',            
        }
        this.state = {
            validSd: valid_startDate,
            validEd: valid_startDate,
            lastSegmentUrl: "",
            formMT5: false,
            nextStep: false,
            nextStep1: false,
            selected: this.initSelected,
            errMsg: this.initSelected,
            start_date: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            end_date: moment().format('YYYY-MM-DD'),
            start: 1,
            limit: 10,
            search: ''
        }
    }

    componentDidMount = async () => {
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoad();
        this.props.onLoadHistory(queryString);
        const location = window.location.href;
        const BaseName = location.substring(location.lastIndexOf("/") + 1);
        await this.setState({ lastSegmentUrl: BaseName })
    }

    

    onClickRow = (record) => {
        this.setState({
            errMsg: this.initSelected,
            selected: {
                ...this.state.selected,                
                from: record.login,
                nominal: '',
                to: ''
            }
        });
		this.props.onLoadTo(record.login);
    }
	
	
	onClickRow2 = (record) => {
        this.setState({
            errMsg: this.initSelected,
            selected: {
                ...this.state.selected,                
                to: record.login
            }
        });		
    }
	

    handleNext = () => {
        var errors = this.state.errMsg;
        if (this.state.nextStep) {
            errors.nominal = !this.state.selected.nominal ? "Required" : '';
        }
        this.setState({ errors });
        if (this.validateForm(this.state.errMsg)) {
            this.setState({
                nextStep: true,
                nextStep1: this.state.nextStep ? true : this.state.nextStep1,
            });
        } else {
            console.error('Invalid Form')
        }

    }

    handleBack = () => {
        this.setState({
            nextStep: this.state.nextStep1 ? true : false,
            nextStep1: false,
        });

    }

    handleClose = () => {
        this.setState({
            errMsg: this.initSelected,
            selected: this.initSelected,
            loadingForm: false,
            nextStep1: false,
            nextStep: false,
            formMT5: false,
        });
    };

    handleSubmit() {
        this.setState({
                ...this.state,
                loadingForm: true,
            });
            //console.log(this.state.selected);
            this.props.onSetor(this.state.selected);

    }

    handleChange(event) {
        const { name, value } = event.target
        var val = value;
        this.setState({ errMsg: this.initSelected });        
        this.setState({
            selected: {
                ...this.state.selected,
                [name]: val
            }
        });

    }

    handleSearch(event) {
        this.setState({
            ...this.state,
            search: event.target.value,
        });
        const queryString = "?search=" + event.target.value + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(queryString);
    }

    validateForm(errors) {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }

    handleCloseSwal() {
        this.setState({
            errMsg: {},
            selected: this.initSelected,
            loadingForm: false,
            nextStep1: false,
            nextStep: false,
            formMT5: false,
        });
        this.props.closeSwalError();
        const queryString = "?search&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(queryString);
    }

    handleChangeEndDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format('YYYY-MM-DD');
        this.setState({ end_date: _date })
        const queryString = "?search=" + this.state.limit + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + _date;
        this.props.onLoadHistory(queryString);
    }

    handleChangeStartDate(date) {
        const selectedDate = new Date(date);
        const _date = moment(selectedDate).format('YYYY-MM-DD');
        this.setState({ start_date: _date });
        const queryString = "?search=" + this.state.search + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + _date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(queryString);
    }


    tableChangeHandler = (data) => {
        let queryString = this.state;
        Object.keys(data).map((key) => {
            if (key === "sort_order" && data[key]) {
                queryString.sort_order = data[key].order;
                queryString.sort_column = data[key].column;
            }
            if (key === "page_number") {
                queryString.start = data[key];
            }
            if (key === "page_size") {
                queryString.limit = data[key];
            }

            return true;
        });

        const Qs = "?search=" + this.state.search + "&limit=" + this.state.limit + "&start=" + (this.state.start - 1) + "&start_date=" + this.state.start_date + "&end_date=" + this.state.end_date;
        this.props.onLoadHistory(Qs);
    }

    render() {

        const { akun_trading, data_history, akun_trading_to, errorMessage, profile } = this.props;
        const { selected } = this.state;
		console.log(profile);
        
        const columns = [
            {
                key: "from",
                text: "Dari",
                width: 100,
                align: "center",
                sortable: true,

            },
            {
                key: "to",
                text: "Tujuan",
                width: 150,
                align: "center",
                sortable: true,

            },
            {
                key: "nominal",
                text: "Jumlah",
                align: "center",
                width: 100,
                sortable: true,
                cell: record => {
                    return (<div style={{ textAlign: "right" }}><Fragment>
                        <NumberFormat
                            value={record.nominal}
                            thousandSeparator={true}
                            decimalScale={2}
                            displayType={'text'}
                        />
                    </Fragment></div>)
                }
            },

            {
                key: "created_at",
                text: "WAKTU TRANSFER",
                width: 80,
                align: "center",
                sortable: true,
				cell: record => {
                    return (moment(new Date(record.created_at)).format('DD-MM-YYYY HH:mm'))
                }
            },


        ];
        const config = {
            key_column: 'transfer_id',
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: false,
            show_length_menu: false,
            show_pagination: true,
            pagination: 'advance',
            button: {
                excel: false,
                print: false
            },
            language: {
                loading_text: "Please be patient while data loads..."
            }
        }
        return (

            <div className="content-wrapper table__account">

                <section className="content">
                    <div className="container-fluid mt-3">
                        
                        <img src={icon} width="35px" className="float-left mt-3" />
                        <h1 style={{ marginBottom: 10, fontSize: 30, marginLeft: 20,color:"#2E2E2F",paddingLeft:"20px" }}>&nbsp;Transfer Internal</h1>
                        
                        
                        <div className="row mt-4">
                            <div className="col-12">
                                {/* card start */}
                                <div className="card card-success shadow-lg" style={{ "minHeight": "500px" ,borderRadius:"20px" }}>
                                    <div className="card-body">

                                        <div style={{ paddingTop: 5 }} className="px-0 lg:px-3">
                                            <h3 className="label_ijo">Akun Trading MT5</h3>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-0  py-4">
                                                
                                                <div className="">
                                                    <h3 className="form-section text-capitalize" style={{ color:"#2E2E2F" }}>Dari</h3>
                                                    <div className="p-2" style={{border:"1px solid #000",borderRadius:"5px"}}>

                                                            <div className="flex p-3" >
                                                            
                                                                <div class="flex-initial w-20 ...">
                                                                
                                                                </div>

                                                                <div class="flex-initial w-64 text-black font-bold ...">
                                                                    LOGIN
                                                                </div>

                                                                <div class="flex-initial w-64 text-black font-bold ...">
                                                                    NAMA
                                                                </div>

                                                                <div class="flex-initial w-64 text-black font-bold ...">
                                                                    Margin Free
                                                                </div>
                                                                <div class="flex-initial w-64 text-black font-bold ...">
                                                                    Equity
                                                                </div>
                                                                <div class="flex-initial w-64 text-black font-bold ...">
                                                                    Rate
                                                                </div>

                                                                

                                                            </div>

                                                            {akun_trading ? (
                                                                        akun_trading.map((at, index) => {
                                                                            return (

                                                                        <Fragment key={index}>

                                                                            <div style={{color:"#222"}} onClick={e => this.onClickRow(at)} className={this.state.selected.login === at.login ? "flex px-2 active-row" : 'flex px-2'}>
                                                                            
                                                                                <div class="flex-initial w-20 ...">

                                                                                    <input type="radio"
                                                                                    onChange={e => this.onClickRow(at)}
                                                                                    checked={this.state.selected.login === at.login ? true : false}
                                                                                    name="account-selection" value={at.login} />

                                                                                </div>

                                                                                <div class="flex-initial w-64 ...">
                                                                                    {at.login}
                                                                                </div>

                                                                                <div class="flex-initial w-64 ...">
                                                                                    {at.name}
                                                                                </div>

                                                                                <div class="flex-initial w-64 ...">
                                                                                    <NumberFormat
                                                                                        value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    />
                                                                                </div>
                                                                                <div class="flex-initial w-64 ...">
                                                                                        <NumberFormat
                                                                                                value={at.equity > 0 ? at.equity : '0.00'}
                                                                                                thousandSeparator={true}
                                                                                                decimalScale={2}
                                                                                                displayType={'text'}
                                                                                            />
                                                                                </div>
                                                                                <div class="flex-initial w-64 ...">
                                                                                        {at.rate}
                                                                                </div>

                                                                                

                                                                            </div>

                                                                        </Fragment>

                                                                    );
                                                                })
                                                            ) : ''}

                                                    </div>
                                                                    

                                                </div>
                                                
                                                <div>
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-3 col-md-3"><h3 className="form-section text-capitalize" style={{ color:"#2E2E2F" }}>Tujuan</h3></div>
                                                        <div className="col-sm-6 col-md-6 mb-0" style={{ paddingRight:0 }}>
															
                                                            <input 
															disabled = {selected.from && selected.to ? false : true}
															value = {selected.nominal}
															onChange={this.handleChange.bind(this)}
															name="nominal"
															type="number" placeholder='Jumlah' className="form-control" />
															{errorMessage ? (<span className="text-error badge badge-danger">{errorMessage}</span>) : ''}
                                                        </div>
                                                        <div className="col-sm-2 col-md-2 mb-0" style={{ paddingLeft:0 }}>
                                                            <AppButton
																disabled = {selected.nominal >= 10000 ? false : true}
                                                                style={{ minHeight: 32 }}
                                                                type="button"
                                                                size="sm"
																onClick={this.handleSubmit.bind(this)}
                                                                theme="success">Transfer</AppButton>
                                                        </div>
														
                                                    </div>

                                                    <div className="p-2 pt-0" style={{border:"1px solid #000",borderRadius:"5px"}}>
                                                    <div className="flex p-3">

                                                       

                                                        <div class="flex-initial w-20 ...">
                                                        
                                                        </div>

                                                        <div class="flex-initial w-64 text-black font-bold ...">
                                                            LOGIN
                                                        </div>

                                                    

                                                        <div class="flex-initial w-64 text-black font-bold ...">
                                                            NAMA
                                                        </div>

                                                        <div class="flex-initial w-64 text-black font-bold ...">
                                                            Margin Free
                                                        </div>
                                                        <div class="flex-initial w-64 text-black font-bold ...">
                                                            Equity
                                                        </div>
                                                        <div class="flex-initial w-64 text-black font-bold ...">
                                                            Rate
                                                        </div>

                                                        

                                                    </div>

                                                    {akun_trading_to ? (
                                                                        akun_trading_to.map((at, index) => {
                                                                            return (

                                                                        <Fragment key={index}>
                                                                            
                                                                            <div style={{color:"#222"}} onClick={e => this.onClickRow2(at)} className={this.state.selected.login === at.login ? "flex px-2 active-row" : 'flex px-2'}>
                                                                            
                                                                                <div class="flex-initial w-20 ...">

                                                                                <input type="radio"
                                                                                        onChange={e => this.onClickRow(at)}
                                                                                        checked={this.state.selected.to === at.login ? true : false}
                                                                                        name="account-selection2" value={at.login} />

                                                                                </div>

                                                                                <div class="flex-initial w-64 ...">
                                                                                    {at.login}
                                                                                </div>

                                                                                <div class="flex-initial w-64 ...">
                                                                                    {at.name}
                                                                                </div>

                                                                                <div class="flex-initial w-64 ...">
                                                                                    <NumberFormat
                                                                                        value={at.margin_free > 0 ? at.margin_free : '0.00'}
                                                                                        thousandSeparator={true}
                                                                                        decimalScale={2}
                                                                                        displayType={'text'}
                                                                                    />
                                                                                </div>
                                                                                <div class="flex-initial w-64 ...">
                                                                                        <NumberFormat
                                                                                                value={at.equity > 0 ? at.equity : '0.00'}
                                                                                                thousandSeparator={true}
                                                                                                decimalScale={2}
                                                                                                displayType={'text'}
                                                                                            />
                                                                                </div>
                                                                                <div class="flex-initial w-64 ...">
                                                                                        {at.rate}
                                                                                </div>

                                                                                

                                                                            </div>

                                                                        </Fragment>

                                                                    );
                                                                })
                                                            ) : ''}

                                                    </div>

                                                </div>
                                                
                                            </div>

                                            <br />
                                            <h3 style={{ color:"#2E2E2F" }}>Daftar Transfer Internal</h3>

                                            <div className="row mt-3 mb-4">
                                                <div className="col-md-12">
                                                    <div className="mb-3">
                                                        <div className="pull-left margin-left-0 max-w-250">
                                                            <label style={{ color:"#2E2E2F" }}>Tanggal: Awal</label>
                                                            <Datetime
                                                                closeOnSelect={true}
                                                                timeFormat={false}
                                                                setViewDate={moment(this.state.start_date).format('DD/MM/YYYY')}
                                                                value={moment(this.state.start_date).format('DD/MM/YYYY')}
                                                                onChange={this.handleChangeStartDate.bind(this)}
                                                                inputProps={{
                                                                    readOnly: true,
                                                                    autoComplete: "off",
                                                                    placeholder: 'Tanggal Awal',
                                                                    name: 'start_date',
                                                                    className: 'form-control form-control-lg'
                                                                }}

                                                                locale="id" isValidDate={this.state.validSd}
                                                            />
                                                        </div>
                                                        <div className="pull-left ml-4 lg:ml-1 max-w-250">
                                                            <label style={{ color:"#2E2E2F" }}>Tanggal: Akhir</label>
                                                            <Datetime
                                                                closeOnSelect={true}
                                                                timeFormat={false}
                                                                setViewDate={moment(this.state.end_date).format('DD/MM/YYYY')}
                                                                value={moment(this.state.end_date).format('DD/MM/YYYY')}
                                                                onChange={this.handleChangeEndDate.bind(this)}
                                                                inputProps={{
                                                                    readOnly: true,
                                                                    autoComplete: "off",
                                                                    placeholder: 'Tanggal Awal',
                                                                    name: 'end_date',
                                                                    className: 'form-control form-control-lg'
                                                                }}

                                                                locale="id" isValidDate={this.state.validSd}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>

                                            {data_history ? (
                                                <ReactDatatable
                                                    config={config}
                                                    records={data_history}
                                                    columns={columns}
                                                    dynamic={true}
                                                    onChange={this.tableChangeHandler}
                                                    loading={this.props.isLoading}
                                                    total_record={this.props.totalData}
                                                />
                                            ) : (<h3 style={{textAlign:"center"}}><br/><br/><br/><br/>Halaman ini tidak bisa diakses mulai dari Sabtu jam 04.00 WIB sampai dengan Senin jam 05.00 WIB</h3>)}
												
										   


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
    akun_trading: state.transfer.akunTrading || [],
    akun_trading_to: state.transfer.akunTradingTo || [],
    data_history: state.transfer.dataHistory || [],
    totalData: state.transfer.totalData,
    contentMsg: state.transfer.contentMsg || null,
    errorMessage: state.transfer.errorMessage || '',
    showFormSuccess: state.transfer.showFormSuccess,
    tipeSWAL: state.transfer.tipeSWAL,
    isLoading: state.transfer.isFetching,
	profile: state.main.dtProfileUser,
    user: state.main.currentUser
});
const mapDispatchToPros = (dispatch) => {
    return {
        onLoad: () => {
			dispatch(profileUser());
            dispatch(getAkunTrading());
        },
		onLoadTo: (param) => {			
            dispatch(getAkunTradingTo(param));
        },
        onLoadHistory: (param) => {
            dispatch(getHistorySetor(param));
        },
        onSetor: (param) => {
			dispatch(profileUser());
            dispatch(actionTransfer(param));
        },
        closeSwalError: () => {
            dispatch(closeForm());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToPros)(Transfer);