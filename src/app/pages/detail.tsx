import { useLayoutEffect } from "react"
import HotelDetail from "../components/hotelDetail"
import Footer from "../layouts/footer"
import Header from "../layouts/header"
import Navbar from "../layouts/navbar"

const Detail = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Header />
      <Navbar />
      <HotelDetail />
      <Footer />
    </>
  )
}

export default Detail
