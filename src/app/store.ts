import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { useDispatch } from "react-redux";
import authReducer from "./redux/authSlice";
import hotelReducer from "./redux/hotelSlice";
import userReducer from "./redux/userSlice";
import roomReducer from "./redux/roomSlice";
import roomTypeReducer from "./redux/roomTypeSlice";
import bookingReducer from "./redux/bookingSlice";

export const store = configureStore({
   reducer: {
      counter: counterReducer,
      auth: authReducer,
      user: userReducer,
      hotel: hotelReducer,
      room: roomReducer,
      roomType: roomTypeReducer,
      booking: bookingReducer
   },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
