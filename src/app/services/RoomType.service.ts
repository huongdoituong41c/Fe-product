import { createAsyncThunk } from "@reduxjs/toolkit"
import Api from "./Api.main"
import { IRoomType } from "../interfaces/RoomType.interface";

export const fetchRoomTypes = createAsyncThunk<IRoomType[], void, { rejectValue: string }>(
  'roomType/fetch',
  async (_, thunkAPI) => {
    try {
      const users = await Api.get(`${Api.url.typeRoom}`);
      return users.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch all room types.");
    }
  }
);
