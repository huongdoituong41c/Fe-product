import React, { useEffect, useState } from 'react'
import { RootState, useAppDispatch } from '../store';
import { fetchBookings, getBookingByUser, updateStatusBooking } from '../services/Booking.service';
import { useAppSelector } from '../hooks';
import { IBooking } from '../interfaces/Booking.interface';
import { Pagination, Table } from "flowbite-react"
import { format, parseISO } from "date-fns";
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const BookingHistory = () => {

    const dispatch = useAppDispatch();
    const dataBooking = useAppSelector((state: RootState) => state.booking.bookings);
    const totalCount = useAppSelector((state: RootState) => state.booking.totalCount);
    const [searchData, setSearchData] = useState<any>(dataBooking);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(getBookingByUser({ page: currentPage, limit: pageSize }))
    }, [dispatch, currentPage])

    useEffect(() => {
        setSearchData(dataBooking);
    }, [dataBooking]);

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

    const convertDate = (date: string) => {
        const dateObj = parseISO(date);
        const formattedDate = format(dateObj, "EEEE, dd/MM/yyyy, HH:mm:ss");
        return formattedDate
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const onPageChange = (page: number) => {
        setCurrentPage(page)
        setSearchParams({ page: page.toString(), limit: pageSize.toString() })
    };

    const onChangeLimit = (e: any) => {
        let pageSize = e.target.value;
        setPageSize(pageSize)
        onPageChange(1)
        setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() })
        dispatch(getBookingByUser({ page: currentPage, limit: pageSize })).unwrap().then((res) => {
            if (res.data.length === 0) {
                setCurrentPage(1)
            }
        })
    }

    useEffect(() => {
        setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
    }, [currentPage, pageSize]);

    const onHandleCancelBooking = (bookingId: number) => {
        dispatch(updateStatusBooking({
            bookingId: bookingId,
            data: 3
        })).unwrap()
            .then(() => {
                toast.success('Update status successful');
                dispatch(getBookingByUser({ page: currentPage, limit: pageSize }))
                onPageChange(1)
            })
            .catch((rejectedValueOrSerializedError) => {
                toast.error(rejectedValueOrSerializedError);
            })
    }

    const getDisabled = (value: any) => {
        return value === "Confirmed" || value === "Cancelled";
    };

    return (
        <>
            <div className="mt-5 flex justify-center rounded-md">
                <div className="mt-5 px-4 py-4 bg-white w-[1350px]">
                    <div className="text-center">
                        <h6 className="text-center px-3 relative inline-block uppercase bg-white text-[#86B817] text-[1rem] mt-0 mb-2 font-extrabold leading-[1.2]">
                            ミ★Hotel★彡
                        </h6>
                        <h1 className="mb-5 text-[2.5rem] mt-0 font-extrabold leading-[1.2] text-[#2C3E50]">
                            Booking History
                        </h1>
                    </div>
                    <div className="grid grid-cols-3 justify-end pt-5 mb-5">
                        <h1 className="col-span-1 text-3xl pl-6 text-black font-semibold">
                            Booking History
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
                                    <Table.HeadCell className="text-center">Hotel Name</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Room Name</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Check In Day</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Check Out Day</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Number Rooms</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Number Guests</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Total Price</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Status</Table.HeadCell>
                                    <Table.HeadCell className="text-center">Action</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {searchData.map((booking: IBooking) => (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={booking.booking_id}>
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
                                                <span
                                                    className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${booking.status === "Confirmed"
                                                        ? "text-green-800 bg-green-100"
                                                        : booking.status === "Pending"
                                                            ? "text-yellow-800 bg-yellow-100"
                                                            : "text-red-800 bg-red-100"
                                                        }`}
                                                >
                                                    {booking.status}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell className="text-center font-semibold">
                                                <button type="submit" className='text-red-600' onClick={() => onHandleCancelBooking(booking.booking_id)} disabled={getDisabled(booking.status)}>Cancel</button>
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

            </div ></>
    );
}

export default BookingHistory
