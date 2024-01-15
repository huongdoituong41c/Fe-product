import React, { useEffect, useState } from 'react'
import Header from '../layouts/header'
import Navbar from '../layouts/navbar'
import { FaSearch } from 'react-icons/fa'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import Footer from '../layouts/footer'
import { RootState, useAppDispatch } from '../store'
import { useAppSelector } from '../hooks'
import { fetchHotels, searchHotels } from '../services/Hotel.service'
import { IHotelManagement } from '../interfaces/Hotel.interface'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form'
import { IRoomType } from '../interfaces/RoomType.interface'
import { fetchRoomTypes } from '../services/RoomType.service'

interface IFormSearch {
  address: string
  checkInDate: any
  checkOutDate: any,
  typeRoom: string,
}

const Search = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const hotels = useAppSelector((state: RootState) => state.hotel.hotels);
  const roomTypes = useAppSelector((state: RootState) => state.roomType.roomTypes);

  const { register, handleSubmit, control, setValue } = useForm<IFormSearch>();

  const [searchParams, setSearchParams] = useSearchParams();

  const formatDateToDDMMYYYY = (dateString: any) => {
    const checkInDate = new Date(dateString);

    // Extract day, month, and year
    const day = checkInDate.getDate();
    const month = checkInDate.getMonth() + 1; // Months are zero-based
    const year = checkInDate.getFullYear();

    // Add leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Combine components into dd/mm/yyyy format
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

    return formattedDate;
  }

  useEffect(() => {
    dispatch(fetchHotels({}));
    dispatch(fetchRoomTypes());
  }, [dispatch])

  useEffect(() => {
    if (searchParams.get('address') !== null) {
      setValue('address', searchParams.get('address') ?? '');
      setValue('typeRoom', searchParams.get('typeRoom') ?? '');
    }
  }, [searchParams, setValue])

  useEffect(() => {
    searchParams.get('address') !== null && dispatch(searchHotels({address: searchParams.get('address'), checkInDate: searchParams.get('checkInDate'), checkOutDate: searchParams.get('checkOutDate'), typeRoom: searchParams.get('typeRoom')}))
  }, [dispatch, searchParams])

  const onSubmit = (data: IFormSearch) => {
    setSearchParams({ address: data.address, checkInDate: formatDateToDDMMYYYY(data.checkInDate), checkOutDate: formatDateToDDMMYYYY(data.checkOutDate), typeRoom: data.typeRoom });
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className='py-5 w-full mx-auto'>
        <div className='w-[1320px] mx-auto'>
          <div className="w-full border-none rounded-lg shadow-lg flex p-2 relative bg-white items-center justify-between mb-6 mt-10">
            <form className="w-full flex" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-5/6 flex flex-row space-x-6">
                <div className="flex flex-col mb-4 w-2/6">
                  <label className="text-sm font-medium text-left">Address</label>
                  <input type="text" className="w-full px-4 py-2 border-gray-300 rounded-md focus:border-[#86B817]" placeholder="Choose your address" {...register('address')} required />
                </div>
                <div className="flex flex-col mb-4 w-2/6">
                  <label className="text-sm font-medium text-left">Check in date</label>
                  <Controller
                    control={control}
                    name="checkInDate"
                    defaultValue={new Date()}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        required
                        className="w-full px-3 py-2 border-gray-300 rounded-md focus:border-[#86B817]"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col mb-4 w-2/6">
                  <label className="text-sm font-medium text-left">Check out date</label>
                  <Controller
                    control={control}
                    name="checkOutDate"
                    defaultValue={new Date(new Date().getTime() + 86400000)}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <DatePicker
                        dateFormat="dd-MM-yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        required
                        className="w-full px-3 py-2 border-gray-300 rounded-md focus:border-[#86B817]"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col mb-4 w-2/6">
                  <label className="text-sm font-medium text-left">Type Room</label>
                  <select className="w-full px-3 py-2 border-gray-300 rounded-md focus:border-[#86B817]" {...register('typeRoom')} defaultValue={1}>
                    {roomTypes?.map((roomType: IRoomType) => (
                      <option value={roomType.type_room_id} key={roomType.type_room_id}>{roomType.type_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-1/6 px-4 py-2 bg-[#86B817] text-white rounded-md ml-6 h-[42px] items-center mt-5 flex justify-center">
                Search
                <FaSearch className='ml-2 w-[18px] h-[18px]' />
              </button>
            </form>
          </div>
          <div className='w-full bg-white p-6'>
            <div className='flex flex-col pb-6'>
              <span className='text-[24px] font-semibold leading-[32px] mb-1'>{searchParams.get("address")}</span>
              <div className='text-[#718096] h-[17px] text-[14px] font-normal leading-[17px]'>{hotels.length + " hotels in " + searchParams.get("address")}</div>
            </div>
            {hotels.map((hotel: IHotelManagement) => (
              <div className='w-full p-6 h-[250px] border rounded-lg shadow-lg flex space-x-4 mb-4' key={hotel.hotel_id}>
                <div className='flex w-[202px] h-full border'>
                  <img src={hotel.image[0]} alt='' className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-col flex-1 w-full h-full'>
                  <div className='w-full h-1/3 border-b border-b-gray-300 justify-between flex'>
                    <div className='flex-col items-center'>
                      <div className='flex flex-wrap text-[18px] max-w-[643px] items-center font-semibold leading-[21px] pb-[10px]'>
                        <h3 className='m-0 text-inherit'>{hotel.name}</h3>
                      </div>
                      <div className='text-[#4A5568] flex items-center text-[14px] font-normal leading-[17px]'>
                        <div className='cursor-pointer flex items-center pr-6'>
                          <FaLocationDot className='mr-2 text-blue-500' />
                          {hotel.address}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col w-full pt-2 h-full'>
                    <div className="leading-6 h-3/4 flex-wrap">{hotel.description}</div>
                    <button className="mt-2 font-semibold px-3 bg-[#86B817] border-[#86B817] leading-[1.5] text-center align-middle cursor-pointer select-none border rounded-lg text-white w-fit h-1/4" onClick={() => navigate(`/detail/${hotel.hotel_id}`)}>Read more</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Search
