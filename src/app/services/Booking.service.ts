import { createAsyncThunk } from "@reduxjs/toolkit";
import { IBooking, IBookingReq } from "../interfaces/Booking.interface";
import Api from "./Api.main"

const fetchBookings = createAsyncThunk<any, any, { rejectValue: string }>(
    "booking/fetchBookings",
    async (args: any, thunkAPI) => {
        try {
            const response = await Api.get(`${Api.url.booking}?page=${args.page}&limit=${args.limit}`);
            const { data, totalCount } = response.data;
            return { data, totalCount };
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to fetch bookings.");
        }
    }
);

const updateStatusBooking = createAsyncThunk<IBooking, any, { rejectValue: string }>(
    "booking/updateStatus",
    async (args: any, thunkAPI) => {
        try {
            const response = await Api.patch(`${Api.url.booking}/updateStatus/${args.bookingId}`, { bookingStatusId: args.data });
            return response.data
        }
        catch (error) {
            return thunkAPI.rejectWithValue("Failed to update status bookings.")
        }
    }
)

const addBooking = createAsyncThunk<IBooking, IBookingReq, { rejectValue: string }>(
    'booking/create',
    async (data: IBookingReq, thunkAPI) => {
        try {
            const booking = await Api.post(`${Api.url.booking}/create`, data);
            return booking.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to login.");
        }
    }
);

const getBookingByUser = createAsyncThunk(
    "booking/userBooking",
    async (args: any, thunkAPI) => {
        try {
            if (args) {
                const response = await Api.get(`${Api.url.booking}/userBooking?page=${args.page}&limit=${args.limit}`);
                const { data, totalCount } = response.data;
                return { data, totalCount };
            }
            else {
                const response = await Api.get(`${Api.url.booking}/userBooking`)
                const { data, totalCount } = response.data;
                return { data, totalCount };
            }
        }
        catch (error) { return thunkAPI.rejectWithValue("Failed to get booking by user") }
    })

export {
    fetchBookings,
    updateStatusBooking,
    addBooking,
    getBookingByUser
};
