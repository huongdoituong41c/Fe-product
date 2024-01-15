/* eslint-disable prettier/prettier */
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Loading } from './components/Loading';
import { useAppSelector } from './hooks';
import { RootState } from './store';

function App() {
    const { authLoading } = useAppSelector((state: RootState) => state.auth);
    const { bookingLoading } = useAppSelector((state: RootState) => state.booking);
    const { hotelLoading } = useAppSelector((state: RootState) => state.hotel);
    const { roomLoading } = useAppSelector((state: RootState) => state.room);
    const { userLoading } = useAppSelector((state: RootState) => state.user);

    return (
        <div className="App h-screen">
            <div className="app-content">
                <Outlet></Outlet>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            {(authLoading || bookingLoading || hotelLoading || roomLoading || userLoading) && <Loading />}
        </div>
    )
}

export default App
