import { createAsyncThunk } from '@reduxjs/toolkit';
import Api from './Api.main';
import { IRoom } from '../interfaces/Room.interface';

export const fetchRooms = createAsyncThunk<any, any, { rejectValue: string }>(
    "room/fetch",
    async (args: any, thunkAPI) => {
        try {
            if (args) {
                const response = await Api.get(`${Api.url.room}?page=${args.page}&limit=${args.limit}`);
                const { data, totalCount } = response.data
                return { data, totalCount }
            } else {
                const response = await Api.get(Api.url.room);
                const { data, totalCount } = response.data
                return { data, totalCount }
            }
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch rooms.");
        }
    }
);

export const fetchAdminRooms = createAsyncThunk<any, any, { rejectValue: string }>(
    "room/fetchAdminRooms",
    async (args: any, thunkAPI) => {
        try {
            let response: any = []
            if (args.page && args.limit) {
                response = await Api.get(`${Api.url.room}/management?page=${args.page}&limit=${args.limit}`);
            } else {
                response = await Api.get(`${Api.url.room}/management`);
            }
            const { data, totalCount } = response.data
            return { data, totalCount }
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch rooms.");
        }
    }
);

export const addRoom = createAsyncThunk<IRoom, any, { rejectValue: string }>(
    "hotel/create",
    async (data: any, thunkAPI) => {
        try {
            const response = await Api.post(`${Api.url.room}/create`, data);
            return response.data.data
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to add room.");
        }
    }
);

export const deleteRoom = createAsyncThunk<number, number, { rejectValue: string }>(
    "room/delete",
    async (id, thunkAPI) => {
        try {
            const response = await Api.delete(`${Api.url.room}/delete/${id}`);
            return response.data.roomId;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to delete room.");
        }
    }
);

export const updateRoom = createAsyncThunk<IRoom, any, { rejectValue: string }>(
    "room/update",
    async (args: any, thunkAPI) => {
        try {
            const response = await Api.put(`${Api.url.room}/update/${args.room_id}`, args.data);
            return response.data.data
        } catch {
            return thunkAPI.rejectWithValue("Failed to update room.");
        }
    }
)

export const getRoomsByHotelId = createAsyncThunk<IRoom[], number, { rejectValue: string }>(
    "room/getByHotelId",
    async (id: number, thunkAPI) => {
        try {
            const response = await Api.get(`${Api.url.room}/${id}`);
            return response.data.data
        } catch {
            return thunkAPI.rejectWithValue("Failed to get rooms.");
        }
    }
)
