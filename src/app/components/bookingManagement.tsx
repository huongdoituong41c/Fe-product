import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai"
import { Pagination, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import CreateBookingModal from "./createBookingModal"
import EditBookingModal from "./editBookingModal"
import { useAppSelector } from "../hooks"
import { RootState, useAppDispatch } from "../store"
import { fetchBookings, updateStatusBooking } from "../services/Booking.service"
import { toast } from "react-toastify"
import { IBooking } from "../interfaces/Booking.interface"
import { format, parseISO } from "date-fns";
import { useSearchParams } from "react-router-dom"

const BookingManagement = () => {

  const dispatch = useAppDispatch();
  const dataBooking = useAppSelector((state: RootState) => state.booking.bookings);
  const totalCount = useAppSelector((state: RootState) => state.booking.totalCount);

  const [openCreateModal, setOpenCreateBookingModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditBookingModal] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [searchData, setSearchData] = useState<any>(dataBooking);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchBookings({ page: currentPage, limit: pageSize }))
  }, [dispatch, currentPage])

  useEffect(() => {
    setSearchData(dataBooking);
  }, [dataBooking]);

  const handleChange = (e: any, bookingId: number) => {
    let bookingStatusId;
    e.target.value === "Confirmed" ? bookingStatusId = 2 : bookingStatusId = 3
    dispatch(updateStatusBooking({
      bookingId: bookingId,
      data: bookingStatusId
    })).unwrap()
      .then(() => {
        toast.success('Update status successful');
        dispatch(fetchBookings({ page: currentPage, limit: pageSize }))
        onPageChange(1)
      })
      .catch((rejectedValueOrSerializedError) => {
        toast.error(rejectedValueOrSerializedError);
      })
  };

  const handleSearchChange = (searchValue: string) => {
    const searchValueTrimmed = searchValue.trim().toLowerCase();
    setSearchData(dataBooking)
    if (searchValueTrimmed) {
      const filteredData = dataBooking.filter((item) => {
        return (
          item.room.toLowerCase().includes(searchValueTrimmed) ||
          item.checkInDate.toString().includes(searchValueTrimmed) ||
          item.checkOutDate.toString().includes(searchValueTrimmed)
        );
      });
      setSearchData(filteredData);
    };
  }

  const getColor = (value: any) => {
    switch (value) {
      case "Confirmed":
        return "text-green-800 bg-green-100";
      case "Pending":
        return "text-yellow-800 bg-yellow-100";
      case "Cancelled":
        return "text-red-800 bg-red-100";
      default:
        return "";
    }
  };

  const getDisabled = (value: any) => {
    getColor(value)
    return value === "Confirmed" || value === "Cancelled";
  };

  const convertDate = (date: string) => {
    const dateObj = parseISO(date);
    const formattedDate = format(dateObj, "EEEE, dd/MM/yyyy, HH:mm:ss");
    return formattedDate
  }

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  const onChangeLimit = (e: any) => {
    let pageSize = e.target.value;
    setPageSize(pageSize)
    onPageChange(1)
    setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() })
    dispatch(fetchBookings({ page: currentPage, limit: pageSize })).unwrap().then((res) => {
      if (res.data.length === 0) {
        setCurrentPage(1)
      }
    })
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    setSearchParams({ page: page.toString(), limit: pageSize.toString() })
  };

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
  }, [currentPage, pageSize]);

  return (
    <div className="mt-5 flex justify-center rounded-md">
      <div className="mt-5 px-4 py-4 bg-white w-[1350px]">
        <div className="text-center">
          <h6 className="text-center px-3 relative inline-block uppercase bg-white text-[#86B817] text-[1rem] mt-0 mb-2 font-extrabold leading-[1.2]">
            ミ★Hotel★彡
          </h6>
          <h1 className="mb-5 text-[2.5rem] mt-0 font-extrabold leading-[1.2] text-[#2C3E50]">
            Booking Room Management
          </h1>
        </div>
        <div className="grid grid-cols-3 justify-end pt-5 mb-5">
          <h1 className="col-span-1 text-3xl pl-6 text-black font-semibold">
            All Booking
          </h1>
          <div className="col-span-1">
            <input
              placeholder="Search"
              className="bg-gray-200 h-10 px-6 rounded-full w-full mx-3"
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="w-full mt-7">
            <Table hoverable className="shadow-lg">
              <Table.Head>
                <Table.HeadCell className="text-center">Email</Table.HeadCell>
                <Table.HeadCell className="text-center">Hotel Name</Table.HeadCell>
                <Table.HeadCell className="text-center">Room Name</Table.HeadCell>
                <Table.HeadCell className="text-center">Check In Day</Table.HeadCell>
                <Table.HeadCell className="text-center">Check Out Day</Table.HeadCell>
                <Table.HeadCell className="text-center">Number Rooms</Table.HeadCell>
                <Table.HeadCell className="text-center">Number Guests</Table.HeadCell>
                <Table.HeadCell className="text-center">Total Price</Table.HeadCell>
                <Table.HeadCell className="text-center">Status</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {searchData.map((booking: IBooking) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={booking.booking_id}>
                    <Table.Cell className="text-center font-semibold">
                      {booking.user}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {booking.hotel}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {booking.room}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {convertDate(String(booking.checkInDate))}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {convertDate(String(booking.checkOutDate))}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {booking.numberOfRooms}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {booking.numberOfGuests}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {formatter.format(booking.totalPrice)}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      <select
                        className={`inline-flex px-2 text-xs font-semibold leading-4 rounded-2xl appearance-none text-center ${getColor(
                          booking.status
                        )}`}
                        value={booking.status}
                        onChange={(e) => handleChange(e, booking.booking_id)}
                        disabled={getDisabled(booking.status)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>

                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <div className="flex justify-between items-center pl-6 mt-4">
              <div className="flex items-center">
                <span className="mr-2">Display:</span>
                <select className="border rounded p-1" onChange={(e) => onChangeLimit(e)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <span className="ml-2">Item</span>
              </div>
              <Pagination layout="pagination" currentPage={currentPage} totalPages={Math.ceil(totalCount / pageSize)} onPageChange={onPageChange} />
            </div>
          </div>
        </div>
      </div>
      <CreateBookingModal openCreateBookingModal={openCreateModal} setOpenCreateBookingModal={setOpenCreateBookingModal} />
      <EditBookingModal openEditBookingModal={openEditModal} setOpenEditBookingModal={setOpenEditBookingModal} />
    </div >
  )
}

export default BookingManagement
