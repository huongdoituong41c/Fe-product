import { FaLocationDot, FaCalendarDays, FaUser, FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";
import { fetchHotels } from "../services/Hotel.service";
import { IHotelManagement } from "../interfaces/Hotel.interface";

const Hotel = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const hotels = useAppSelector((state: RootState) => state.hotel.hotels);

    useEffect(() => {
        dispatch(fetchHotels({}))
    }, [dispatch])

    const showAddress = (address: string) => {
        const parts = address.split(",");
        const lastPart = parts.pop();
        return lastPart;
    }

    return (
        <div className='py-5 w-full mx-auto'>
            <div className='w-[1320px] mx-auto'>
                <div className="text-center">
                    <h6 className="text-center px-3 relative inline-block uppercase bg-white text-[#86B817] text-[1rem] mt-0 mb-2 font-extrabold leading-[1.2]">ミ★Hotel★彡</h6>
                    <h1 className="mb-5 text-[2.5rem] mt-0 font-extrabold leading-[1.2] text-[#2C3E50]">Awesome Hotel</h1>
                </div>
                <div className="grid grid-cols-3 gap-4 justify-center py-5">
                    {hotels.map((hotel: IHotelManagement) => (
                        <div className="flex flex-[0_0_auto] w-full" key={hotel.hotel_id}>
                            <div className="shadow-[0_0_45px_rgba(0,0,0,.08)] w-full">
                                <div className="overflow-hidden relative w-full h-[272px]">
                                    <img src={hotel.image[0]} alt="" className="w-full h-[272px] object-cover" />
                                </div>
                                <div className="border-b grid grid-cols-3 h-14">
                                    <small className="ml-2 items-center py-2 flex border-r justify-center">
                                        <FaLocationDot className='font-black text-[#86B817!important] mr-2' />
                                        <p className="line-clamp-1">{showAddress(hotel.address)}</p>
                                    </small>
                                    <small className="items-center py-2 flex border-r justify-center">
                                        <FaCalendarDays className='font-black text-[#86B817!important] mr-2' />
                                        3 days
                                    </small>
                                    <small className="items-center py-2 flex justify-center">
                                        <FaUser className='font-black text-[#86B817!important] mr-2' />
                                        5 person
                                    </small>
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="mb-0 text-[1.75rem] font-extrabold leading-[1.2] text-[#2C3E50]">{hotel.name}</h3>
                                    <div className="mb-3 flex items-center justify-center">
                                        <small className="items-center py-2 flex mr-2">
                                            <FaStar className='font-black text-[#86B817!important]' />
                                        </small>
                                        <small className="items-center py-2 flex mr-2">
                                            <FaStar className='font-black text-[#86B817!important]' />
                                        </small>
                                        <small className="items-center py-2 flex mr-2">
                                            <FaStar className='font-black text-[#86B817!important]' />
                                        </small>
                                        <small className="items-center py-2 flex mr-2">
                                            <FaStar className='font-black text-[#86B817!important]' />
                                        </small>
                                        <small className="items-center py-2 flex mr-2">
                                            <FaStar className='font-black text-[#86B817!important]' />
                                        </small>
                                    </div>
                                    <p className="h-12 line-clamp-2">{hotel.description}</p>
                                    <button className="mt-4 font-semibold px-3 bg-[#86B817] border-[#86B817] leading-[1.5] text-center align-middle cursor-pointer select-none border rounded-lg text-white h-12" onClick={() => navigate(`/detail/${hotel.hotel_id}`)}>Read more</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Hotel
