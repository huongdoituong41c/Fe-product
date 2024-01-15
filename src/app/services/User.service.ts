import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "./Api.main"
import { IUser } from "../interfaces/User.interface";

export const getAllUsers = createAsyncThunk<any, any, { rejectValue: string }>(
  'user/getAll',
  async (args: any, thunkAPI) => {
    try {
      const users = await Api.get(`${Api.url.user}?page=${args.page}&limit=${args.limit}`);
      const { data, totalCount } = users.data
      return { data, totalCount }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch all users.");
    }
  }
);

export const getUserById = createAsyncThunk<IUser, number, { rejectValue: string }>(
  'user/getUserById',
  async (id: number, thunkAPI) => {
    try {
      const user = await Api.get(`${Api.url.user}/detailUser/${id}`);
      return user.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user.");
    }
  }
);

export const updateUser = createAsyncThunk<IUser, any, { rejectValue: string }>(
  'user/update',
  async (args: any, thunkAPI) => {
    try {
      const user = await Api.put(`${Api.url.user}/update/${args.id}`, args.data);
      return user.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update user.");
    }
  }
);

export const deleteUser = createAsyncThunk<number, number, { rejectValue: string }>(
  'user/delete',
  async (id: number, thunkAPI) => {
    try {
      const user = await Api.delete(`${Api.url.user}/delete/${id}`);
      return user.data.userId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update user.");
    }
  }
);
