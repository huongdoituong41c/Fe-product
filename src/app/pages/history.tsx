import React from 'react'
import Header from '../layouts/header'
import Navbar from '../layouts/navbar'
import BookingHistory from '../components/bookingHistory'
import Banner from '../layouts/banner'
import Footer from '../layouts/footer'

const History = () => {
  return (
    <>
        <Header />
        <Navbar />
        <Banner />
        <BookingHistory />
        <Footer />
    </>
  )
}

export default History
