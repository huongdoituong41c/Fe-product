import { createAsyncThunk } from '@reduxjs/toolkit';
import { IHotelManagement } from '../interfaces/Hotel.interface';
import Api from './Api.main';

export const fetchHotels = createAsyncThunk<any, any, { rejectValue: string }>(
    "hotel/fetchHotels",
    async (args: any, thunkAPI) => {
        try {
            if (args.page && args.limit) {
                const response = await Api.get(`${Api.url.hotel}?page=${args.page}&limit=${args.limit}`);
                const { data, totalCount } = response.data
                return { data, totalCount }
            }
            else {
                const response = await Api.get(`${Api.url.hotel}`);
                const { data, totalCount } = response.data
                return { data, totalCount }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch hotels.");
        }
    }
);

export const fetchAdminHotels = createAsyncThunk<any, any, { rejectValue: string }>(
    "hotel/fetchAdminHotels",
    async (args: any, thunkAPI) => {
        try {
            let response: any = [];
            if (args.page && args.limit) {
                response = await Api.get(`${Api.url.hotel}/management?page=${args.page}&limit=${args.limit}`);
            } else {
                response = await Api.get(`${Api.url.hotel}/management`);
            }
            const { data, totalCount } = response.data
            return { data, totalCount }
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch hotels.");
        }
    }
);

export const addHotels = createAsyncThunk<IHotelManagement, any, { rejectValue: string }>(
    "hotel/create",
    async (data: any, thunkAPI) => {
        try {
            const response = await Api.post(`${Api.url.hotel}/create`, data);
            return response.data.data
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add hotel.");
        }
    }
);

export const deleteHotel = createAsyncThunk<number, number, { rejectValue: string }>(
    "hotel/deleteHotel",
    async (id, thunkAPI) => {
        try {
            const response = await Api.delete(`${Api.url.hotel}/delete/${id}`);
            return response.data.hotelId;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete hotel.");
        }
    }
);

export const updateHotel = createAsyncThunk<IHotelManagement, any, { rejectValue: string }>(
    "hotel/update",
    async (args: any, thunkAPI) => {
        try {
            const response = await Api.put(`${Api.url.hotel}/update/${args.hotel_id}`, args.data)
            return response.data.data
        } catch {
            return thunkAPI.rejectWithValue("Failed to update hotel.");
        }
    }
)

export const getByIdHotel = createAsyncThunk<IHotelManagement, number, { rejectValue: string }>(
    "hotel/getByIdHotel",
    async (id, thunkAPI) => {
        try {
            const response = await Api.get(`${Api.url.hotel}/${id}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to get hotel.");
        }
    }
);

export const searchHotels = createAsyncThunk<IHotelManagement[], any, { rejectValue: string }>(
    "hotel/search",
    async (data: any, thunkAPI) => {
        try {
            const response = await Api.get(`${Api.url.hotel}/search?address=${data.address}&checkInDate=${data.checkInDate}&checkOutDate=${data.checkOutDate}&typeRoom=${data.typeRoom}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to get hotels.");
        }
    }
);
