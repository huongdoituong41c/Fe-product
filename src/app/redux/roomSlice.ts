import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../interfaces/Room.interface";
import { addRoom, deleteRoom, fetchAdminRooms, fetchRooms, getRoomsByHotelId, updateRoom } from "../services/Room.service";

interface IRoomSlice {
    rooms: IRoom[];
    filterRoomsData: IRoom[],
    roomLoading: boolean,
    totalCount: number
}

const initialState: IRoomSlice = {
    rooms: [],
    filterRoomsData: [],
    roomLoading: false,
    totalCount: 0
}

const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        filterRooms: (state, action) => {
            const keyword = action.payload.toLowerCase();
            if (keyword !== '') {
                state.filterRoomsData = state.rooms.filter((room: IRoom) =>
                    room.name.toLowerCase().includes(keyword) ||
                    room.hotel.toLowerCase().includes(keyword) ||
                    room.room_type.toLowerCase().includes(keyword));
            } else {
                state.filterRoomsData = []
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state, action) => {
                state.roomLoading = true;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.roomLoading = false;
                const { data, totalCount } = action.payload
                state.rooms = data;
                state.totalCount = totalCount
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.roomLoading = false;
            })
            .addCase(fetchAdminRooms.pending, (state, action) => {
                state.roomLoading = true;
            })
            .addCase(fetchAdminRooms.fulfilled, (state, action) => {
                state.roomLoading = false;
                const { data, totalCount } = action.payload
                state.rooms = data;
                state.totalCount = totalCount
            })
            .addCase(fetchAdminRooms.rejected, (state, action) => {
                state.roomLoading = false;
            })
            .addCase(addRoom.pending, (state, action) => {
                state.roomLoading = true;
            })
            .addCase(addRoom.fulfilled, (state, action) => {
                state.roomLoading = false;
                state.rooms.unshift(action.payload);
            })
            .addCase(addRoom.rejected, (state, action) => {
                state.roomLoading = false;
            })
            .addCase(updateRoom.pending, (state, action) => {
                state.roomLoading = true;
            })
            .addCase(updateRoom.fulfilled, (state, action) => {
                state.roomLoading = false;
                const dataUpdate = action.payload;
                const roomIndex = state.rooms.findIndex((room) => room.room_id === dataUpdate.room_id);

                if (roomIndex !== -1) {
                    state.rooms[roomIndex] = dataUpdate;
                }
            })
            .addCase(updateRoom.rejected, (state, action) => {
                state.roomLoading = false;
            })
            .addCase(getRoomsByHotelId.pending, (state, action) => {
                state.roomLoading = true;
            })
            .addCase(getRoomsByHotelId.fulfilled, (state, action) => {
                state.roomLoading = false;
                state.rooms = action.payload;
            })
            .addCase(getRoomsByHotelId.rejected, (state, action) => {
                state.roomLoading = false;
            })
            .addCase(deleteRoom.pending, (state, action) => {
                state.roomLoading = true;
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.roomLoading = false;
                state.rooms = state.rooms.filter((room: IRoom) => room.room_id !== Number(action.payload));
            })
            .addCase(deleteRoom.rejected, (state, action) => {
                state.roomLoading = false;
            })
    },
});

export const { filterRooms } = roomSlice.actions;
export default roomSlice.reducer;
