import App from "./app/App";
import BookingManagement from "./app/components/bookingManagement";
import AuthGuard from "./app/guards/authGuards";
import AdminBooking from "./app/pages/admin/adminBooking";
import AdminHotel from "./app/pages/admin/adminHotel";
import AdminRoom from "./app/pages/admin/adminRoom";
import AdminUser from "./app/pages/admin/adminUser";
import Detail from "./app/pages/detail";
import History from "./app/pages/history";
import Home from "./app/pages/home";
import Login from "./app/pages/login";
import Register from "./app/pages/register";
import Search from "./app/pages/search";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const routes = createBrowserRouter([
    { path: "/", element: <Navigate to="/home" replace /> },
    {

        path: "/",
        element: <App />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'detail/:hotelId', element: <Detail /> },
            { path: 'search', element: <Search /> },
            { path: 'me/history', element: <History /> },
            { path: 'me/hotel_management', element: <AuthGuard component={AdminHotel} /> },
            { path: 'me/room_management', element: <AuthGuard component={AdminRoom} /> },
            { path: 'me/user_management', element: <AuthGuard component={AdminUser} /> },
            { path: 'me/booking_management', element: <AuthGuard component={AdminBooking} /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ]
    },
]);

