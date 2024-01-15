import { createSlice } from "@reduxjs/toolkit";
import { IBooking } from "../interfaces/Booking.interface";
import { addBooking, fetchBookings, getBookingByUser, updateStatusBooking } from "../services/Booking.service";

interface IBookingSlice {
    bookings: IBooking[];
    bookingLoading: boolean,
    totalCount: number
}

const initialState: IBookingSlice = {
    bookings: [],
    bookingLoading: false,
    totalCount: 0
}

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(addBooking.pending, (state, action) => {
                state.bookingLoading = true;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.bookingLoading = false;
                const dataUpdate = action.payload;
                const bookingIndex = state.bookings.findIndex((booking) => booking.booking_id === dataUpdate.booking_id);

                if (bookingIndex !== -1) {
                    state.bookings[bookingIndex] = dataUpdate;
                }
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.bookingLoading = false;
            })
            .addCase(fetchBookings.pending, (state, action) => {
                state.bookingLoading = true;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookingLoading = false;
                const { data, totalCount } = action.payload
                state.bookings = data;
                state.totalCount = totalCount
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.bookingLoading = false;
            })
            .addCase(updateStatusBooking.pending, (state, action) => {
                state.bookingLoading = true;
            })
            .addCase(updateStatusBooking.fulfilled, (state, action) => {
                state.bookingLoading = false;
                const statusId = action.payload;
                const bookingIndex = state.bookings.findIndex((booking) => booking.booking_id === statusId.booking_id);

                if (bookingIndex !== -1) {
                    state.bookings[bookingIndex] = statusId;
                }
            })
            .addCase(updateStatusBooking.rejected, (state, action) => {
                state.bookingLoading = false;
            })
            .addCase(getBookingByUser.fulfilled, (state, action) => {
                const { data, totalCount } = action.payload;
                state.bookings = data;
                state.totalCount = totalCount;
            })
    },
});

export default bookingSlice.reducer;
