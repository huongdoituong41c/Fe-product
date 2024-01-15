import { createSlice } from "@reduxjs/toolkit";
import { IRoomType } from "../interfaces/RoomType.interface";
import { fetchRoomTypes } from "../services/RoomType.service";

interface IRoomTypeSlice {
    roomTypes: IRoomType[];
}

const initialState: IRoomTypeSlice = {
    roomTypes: []
}

const roomTypeSlice = createSlice({
    name: "roomType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoomTypes.fulfilled, (state, action) => {
                state.roomTypes = action.payload;
            })
    },
});
export default roomTypeSlice.reducer;
