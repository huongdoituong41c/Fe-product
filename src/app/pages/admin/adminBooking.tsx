import Header from "../../layouts/header";
import Navbar from "../../layouts/navbar";
import Footer from "../../layouts/footer";
import Banner from "../../layouts/banner";
import BookingManagement from "../../components/bookingManagement";

const AdminBooking = () => {

    return (
        <>
            <Header />
            <Navbar />
            <Banner />
            <BookingManagement />
            <Footer />
        </>
    )
}

export default AdminBooking
