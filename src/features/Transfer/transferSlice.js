import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API;
const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
// const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";




export const getHistorySetor = createAsyncThunk(
    'transfer/getHistory',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/penarikan-dana' + param,
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };

        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = data.payload;


                        return payload;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } else {
                    return thunkAPI.rejectWithValue(_data);
                }
            })
            .catch(function (error) {
                console.log(error);
                return thunkAPI.rejectWithValue(error);
            });
    }
);

export const getAkunTrading = createAsyncThunk(
    'transfer/getAkunTrading',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/get-akun-trading?tipe=real',
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };

        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = data.payload;


                        return payload;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } else {
                    return thunkAPI.rejectWithValue(_data);
                }
            })
            .catch(function (error) {
                console.log(error);
                return thunkAPI.rejectWithValue(error);
            });
    }
);

export const getAkunTradingDemo = createAsyncThunk(
    'transfer/getAkunTradingDemo',
    async (param, thunkAPI) => {
		const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        var config = {
            method: 'get',
            url: API_URL + '/general-option/get-akun-trading?tipe=demo',
            headers: {
                'x-app-origin': 'cabinet-app',
                'Authorization': token,
            }
        };

        return axios(config)
            .then(function (response) {
                const _data = JSON.stringify(response);
                if (response.status === 200) {
                    let data = response.data;
                    if (data.error_message === 0) {
                        let payload = data.payload;


                        return payload;
                    } else {
                        return thunkAPI.rejectWithValue(data);
                    }
                } else {
                    return thunkAPI.rejectWithValue(_data);
                }
            })
            .catch(function (error) {
                console.log(error);
                return thunkAPI.rejectWithValue(error);
            });
    }
);




const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    showFormSuccess: false,
    errorMessage: '',
    dataBank: [],
    akunTrading: [],
    akunTradingDemo: [],
    dataHistory: [],
    totalData: 0,
};

export const transferSlice = createSlice({
    name: 'transfer',
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = null;
            return state;
        },
        closeForm: (state) => {
            state.showFormSuccess = false;
        },
        chgProps: (state, { payload }) => {
            console.log(payload);
            state.persetujuan[payload.key] = payload.value;
        },
    },
    extraReducers: {
        
        [getAkunTrading.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.akunTrading = payload;
            return state;
        },
        [getAkunTrading.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getAkunTrading.pending]: (state) => {
            state.isFetching = true;
            state.akunTrading = [];
        },
        [getAkunTradingDemo.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.akunTradingDemo = payload;
            return state;
        },
        [getAkunTradingDemo.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getAkunTradingDemo.pending]: (state) => {
            state.isFetching = true;
            state.akunTradingDemo = [];
        },
       
        [getHistorySetor.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataHistory = payload.data;
            state.totalData = payload.total_data;
            return state;
        },
        [getHistorySetor.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getHistorySetor.pending]: (state) => {
            state.isFetching = true;
            state.dataHistory = [];
        },
    }
})

export const { clearState, chgProps, closeForm } = transferSlice.actions;
export const userSelector = (state) => state.penarikan;
//export default mainSlice.reducer;