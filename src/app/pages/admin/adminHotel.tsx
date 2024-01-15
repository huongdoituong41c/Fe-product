import React from "react"
import Header from "../../layouts/header"
import Navbar from "../../layouts/navbar"
import Footer from "../../layouts/footer"
import Banner from "../../layouts/banner"
import HotelManagement from "../../components/hotelManagement"

const AdminHotel = () => {
  return (
    <>
      <Header />
      <Navbar />
      <Banner />
      <HotelManagement />
      <Footer />
    </>
  )
}

export default AdminHotel
