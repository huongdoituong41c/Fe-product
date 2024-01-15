import Header from "../../layouts/header"
import Navbar from "../../layouts/navbar"
import Footer from "../../layouts/footer"
import Banner from "../../layouts/banner"
import RoomManagement from "../../components/roomManagement"

const AdminRoom = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Banner />
      <RoomManagement/>
      <Footer />
    </>
  )
}

export default AdminRoom
