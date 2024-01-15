/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authUserLogin, registerUser } from "../services/Auth.service";
import { ILoginRes, ILoginUser } from "../interfaces/Login.interface";
import { ROLE } from "../constants/constant";

interface IResult {
    LoginInfo: ILoginRes,
    messageRegister: string,
    userLogin: ILoginUser,
    authLoading: boolean
}

const initialState: IResult = {
    LoginInfo: {
        message: '',
        token: '',
        userId: null
    },
    messageRegister: '',
    userLogin: {
        user_id: null,
        first_name: '',
        last_name: '',
        email: '',
        role: ROLE.USER,
        createdAt: '',
        updatedAt: ''
    },
    authLoading: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userLogin = action.payload;
        },
        logout: (state, ) => {
            localStorage.removeItem("jwt");
            // state.userLogin.user_id = null;
            // state.userLogin.first_name = '';
            // state.userLogin.last_name = '';
            // state.userLogin.email = '';
            // state.userLogin.role = ROLE.USER;
            // state.userLogin.createdAt = '';
            // state.userLogin.updatedAt = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authLogin.pending, (state, action) => {
                state.authLoading = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.authLoading = false;
                state.LoginInfo = action.payload;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.authLoading = false;
            })
            .addCase(registerUser.pending, (state, action) => {
                state.authLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.authLoading = false;
                state.messageRegister = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.authLoading = false;
            })
            .addCase(authUserLogin.fulfilled, (state, action) => {
                state.userLogin = action.payload;
            })
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
