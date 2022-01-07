import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import "moment/locale/id";
import axios from 'axios';

const tokenLogin = process.env.REACT_APP_TOKEN_LOGIN;
const API_URL = process.env.REACT_APP_URL_API;

export const loginUser = createAsyncThunk(
    'users/login',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/login', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    let payload = data.payload;                    
                    await localStorage.setItem(tokenLogin, payload.accessToken);					
                    return data;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchUserBytoken = createAsyncThunk(
    'users/fetchUserBytoken',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

        var config = {
            method: 'get',
            url: API_URL + '/get-data-pribadi',
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
                        let payload = {
                            ...data.payload,
                            agreement1: data.payload.no_identitas ? 1 : ''
                        }
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

export const profileUser = createAsyncThunk(
    'users/profileUser',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";

        var config = {
            method: 'get',
            url: API_URL + '/profile',
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

                        return data.payload;
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

export const regUser = createAsyncThunk(
    'users/register',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/register', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const verifUser = createAsyncThunk(
    'users/verifikasi',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/verifikasi-akun', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getCabang = createAsyncThunk(
    'option/getCabang',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'backoffice-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.get(API_URL + '/general-option/data-cabang', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getMarketing = createAsyncThunk(
    'option/getMarketing',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'backoffice-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.get(API_URL + '/general-option/data-marketing?kode_cabang=' + param.kode_cabang, param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const completeData = createAsyncThunk(
    'user/completeData',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'backoffice-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/kelengkapan-diri', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const changePass = createAsyncThunk(
    'user/changePass',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        const config = {
            headers: {
                'Authorization': token,
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/change-password', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const updProfile = createAsyncThunk(
    'user/updProfile',
    async (param, thunkAPI) => {
        const token = localStorage.getItem(tokenLogin) ? "Bearer " + localStorage.getItem(tokenLogin) : "";
        const config = {
            headers: {
                'Authorization': token,
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/update-profile', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const action_contact_us = createAsyncThunk(
    'users/contact_us',
    async (param, thunkAPI) => {
        const config = {
            headers: {
                'x-app-origin': 'cabinet-app',
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };
        try {
            const response = await axios.post(API_URL + '/action-data-contact-us', param, config);
            let data = '';
            let _data = await response;
            if (response.status === 200) {
                data = _data.data;
                if (data.error_message === 0) {
                    return data.payload;
                } else {
                    return thunkAPI.rejectWithValue(data);
                }
            } else {
                return thunkAPI.rejectWithValue(_data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

const initialState = {
    expandMenu: true,
    isLoggedIn: !!localStorage.getItem(tokenLogin),
    token: localStorage.getItem(tokenLogin),
    isFetching: false,
    isSuccess: false,
    isError: false,
    isVerifikasi: false,
    isCompleteProfile: false,
    succesCompleteProfile: false,
    errorMessage: '',
    errFetchUserByToken: '',
    user_id: '',
    defaultOpenKeys: '/',
    currentUser: {},
    profile: {},
    dtProfileUser: {},
    dataCabang: [],
    dataMarketing: [],
	showFormSuccess: false,
};

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        clickExpand: (state) => {
            state.expandMenu = !state.expandMenu ? true : false;
            return state;
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.errorMessage = null;
            return state;
        },
        onLogout: (state) => {
            localStorage.removeItem(tokenLogin);
            state.isLoggedIn = false;
            state.token = null;
            state.fetchUserBytoken = '';
            state.currentUser = initialState.currentUser;
            return state;
        },
        setDefaultOpenKeys: (state, dt) => {
            state.defaultOpenKeys = dt.payload;
        },
        chgProps: (state, { payload }) => {
            state.currentUser[payload.key] = payload.value;
        },
        chgPropsProfile: (state, { payload }) => {
            state.dtProfileUser[payload.key] = payload.value;
        },
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.isLoggedIn = !!localStorage.getItem(tokenLogin);
            state.token = localStorage.getItem(tokenLogin);
            state.currentUser = payload;
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
            state.errFetchUserByToken = '';
        },
        [fetchUserBytoken.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errFetchUserByToken = '';
            state.currentUser = payload;
        },
        [fetchUserBytoken.rejected]: (state, { payload }) => {
            localStorage.removeItem(tokenLogin);
            state.isFetching = false;
            state.isError = true;
            state.isLoggedIn = false;
            state.token = '';
            state.errFetchUserByToken = payload.message;
        },
        [profileUser.pending]: (state) => {
            state.errFetchUserByToken = '';
        },
        [profileUser.fulfilled]: (state, { payload }) => {
            state.errFetchUserByToken = '';
            state.dtProfileUser = payload;
        },
        [profileUser.rejected]: (state, { payload }) => {
            state.errFetchUserByToken = '';
        },
        [regUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.user_id = payload.user_id;
            state.isVerifikasi = payload.user_id ? true : false;
            return state;
        },
        [regUser.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [regUser.pending]: (state) => {
            state.isFetching = true;
        },
        [verifUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isVerifikasi = false;
            state.isCompleteProfile = true;
            return state;
        },
        [verifUser.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [verifUser.pending]: (state) => {
            state.isFetching = true;
        },
        [getCabang.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataCabang = payload;
            return state;
        },
        [getCabang.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getCabang.pending]: (state) => {
            state.isFetching = true;
        },
        [getMarketing.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.dataMarketing = payload;
            return state;
        },
        [getMarketing.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [getMarketing.pending]: (state) => {
            state.dataMarketing = [];
        },
        [completeData.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.succesCompleteProfile = true;
            state.dataMarketing = payload;
            return state;
        },
        [completeData.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [completeData.pending]: (state) => {
            state.dataMarketing = [];
        },
        [changePass.fulfilled]: (state, { payload }) => {
            state.isFetching = false;      
            state.isError = false;      
            state.errorMessage = payload.message;
            return state;
        },
        [changePass.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [changePass.pending]: (state) => {
            state.errorMessage = '';
        },
        [updProfile.fulfilled]: (state, { payload }) => {
            state.isFetching = false;      
            state.isError = false;      
            state.errorMessage = payload.message;
            return state;
        },
        [updProfile.rejected]: (state, { payload }) => {
            //console.log('payload', payload);
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [updProfile.pending]: (state) => {
            state.errorMessage = '';
        },
		
    }
})

export const { clickExpand, clearState, onLogout, setDefaultOpenKeys, chgProps, chgPropsProfile } = mainSlice.actions;
export const userSelector = (state) => state.main;
//export default mainSlice.reducer;