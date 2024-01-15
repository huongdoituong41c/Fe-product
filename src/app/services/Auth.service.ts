import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from './Api.main';
import { ILoginReq, ILoginRes, ILoginUser } from '../interfaces/Login.interface';
import { IRegisterReq } from '../interfaces/Register.interface';

const authLogin = createAsyncThunk<ILoginRes, ILoginReq, { rejectValue: string }>(
    'auth/login',
    async (data: ILoginReq, thunkAPI) => {
        try {
            const login = await Api.post(`${Api.url.user}/login`, data);
            return login.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to login.");
        }
    }
);

const authUserLogin = createAsyncThunk<ILoginUser, void, { rejectValue: string }>(
    'auth/userLogin',
    async (_, thunkAPI) => {
        try {
            const login = await Api.get(`${Api.url.user}/userInfo`);
            return login.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to login.");
        }
    }
);

const registerUser = createAsyncThunk<string, IRegisterReq, { rejectValue: string }>(
    'auth/register',
    async (data: IRegisterReq, thunkAPI) => {
        try {
            const register = await Api.post(`${Api.url.user}/register`, data);
            return register.data.message;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to login.");
        }
    }
);

export {
    authLogin,
    authUserLogin,
    registerUser
};
