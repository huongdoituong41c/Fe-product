import { createSlice } from "@reduxjs/toolkit";
import { addHotels, deleteHotel, fetchAdminHotels, fetchHotels, getByIdHotel, searchHotels, updateHotel } from "../services/Hotel.service";
import { IHotelManagement } from "../interfaces/Hotel.interface";

interface IHotelSlice {
    hotels: IHotelManagement[];
    hotel: IHotelManagement;
    filterHotelsData: IHotelManagement[],
    hotelLoading: boolean,
    totalCount: number
}

const initialState: IHotelSlice = {
    hotels: [],
    hotel: {
        hotel_id: 0,
        name: '',
        image: [],
        address: '',
        description: ''
    },
    filterHotelsData: [],
    hotelLoading: false,
    totalCount: 0
}

const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        filterHotels: (state, action) => {
            const keyword = action.payload.toLowerCase();
            if (keyword !== '') {
                state.filterHotelsData = state.hotels.filter((hotel: IHotelManagement) => hotel.name.toLowerCase().includes(keyword) || hotel.address.toLowerCase().includes(keyword) || hotel.description.toLowerCase().includes(keyword));
            } else {
                state.filterHotelsData = []
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHotels.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.hotelLoading = false;
                const { data, totalCount } = action.payload;
                state.hotels = data;
                state.totalCount = totalCount;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.hotelLoading = false;
            })
            .addCase(addHotels.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(addHotels.fulfilled, (state, action) => {
                state.hotelLoading = false;
                state.hotels.unshift(action.payload);
            })
            .addCase(addHotels.rejected, (state, action) => {
                state.hotelLoading = false;
            })
            .addCase(deleteHotel.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(deleteHotel.fulfilled, (state, action) => {
                state.hotelLoading = false;
                state.hotels = state.hotels.filter((hotel: IHotelManagement) => hotel.hotel_id !== Number(action.payload));
            })
            .addCase(deleteHotel.rejected, (state, action) => {
                state.hotels = state.hotels.filter((hotel: IHotelManagement) => hotel.hotel_id !== Number(action.payload));
            })
            .addCase(updateHotel.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(updateHotel.fulfilled, (state, action) => {
                state.hotelLoading = false;
                const dataUpdate = action.payload;
                const hotelIndex = state.hotels.findIndex((hotel) => hotel.hotel_id === dataUpdate.hotel_id);

                if (hotelIndex !== -1) {
                    state.hotels[hotelIndex] = dataUpdate;
                }
            })
            .addCase(updateHotel.rejected, (state, action) => {
                state.hotelLoading = false;
            })
            .addCase(getByIdHotel.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(getByIdHotel.fulfilled, (state, action) => {
                state.hotelLoading = false;
                state.hotel = action.payload;
            })
            .addCase(getByIdHotel.rejected, (state, action) => {
                state.hotelLoading = false;
            })
            .addCase(searchHotels.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(searchHotels.fulfilled, (state, action) => {
                state.hotelLoading = false;
                state.hotels = action.payload;
            })
            .addCase(searchHotels.rejected, (state, action) => {
                state.hotelLoading = false;
            })
            .addCase(fetchAdminHotels.pending, (state, action) => {
                state.hotelLoading = true;
            })
            .addCase(fetchAdminHotels.fulfilled, (state, action) => {
                state.hotelLoading = false;
                const { data, totalCount } = action.payload;
                state.hotels = data;
                state.totalCount = totalCount;
            })
            .addCase(fetchAdminHotels.rejected, (state, action) => {
                state.hotelLoading = false;
            })
    },
});

export const { filterHotels } = hotelsSlice.actions;
export default hotelsSlice.reducer;
