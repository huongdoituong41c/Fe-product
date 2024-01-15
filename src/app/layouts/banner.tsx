import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";
import { useAppSelector } from "../hooks";
import { RootState, useAppDispatch } from "../store";
import { fetchRoomTypes } from "../services/RoomType.service";
import { IRoomType } from "../interfaces/RoomType.interface";
import { useForm, Controller } from 'react-hook-form';

interface IFormSearch {
    address: string
    checkInDate: any
    checkOutDate: any,
    typeRoom: string,
}

const Banner = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const roomTypes = useAppSelector((state: RootState) => state.roomType.roomTypes);

    const { register, handleSubmit, control } = useForm<IFormSearch>();

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
        dispatch(fetchRoomTypes());
    }, [dispatch])

    const onSubmit = (data: IFormSearch) => {
        navigate(`/search?address=${data.address}&checkInDate=${formatDateToDDMMYYYY(data.checkInDate)}&checkOutDate=${formatDateToDDMMYYYY(data.checkOutDate)}&typeRoom=${data.typeRoom}`);
    }

    return (
        <div className="w-full mx-auto bg-[url('/src/assets/images/bg-banner.png')] bg-center bg-no-repeat bg-cover py-5 mb-5 h-[592.8px] items-center flex">
            <div className='container mx-auto py-5'>
                <div className="py-5 mt-20 justify-center flex flex-wrap">
                    <div className="pt-5 mt-5 text-center w-5/6">
                        <div className="w-full border-none rounded-lg shadow-lg flex p-2 relative bg-white items-center justify-between">
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
                        <div className="text-white flex pt-6 flex-col w-full mx-auto">
                            <span className="text-[26px] max-w-[566px] font-semibold leading-[36px] text-left">Log in to receive more incentives and many attractive offers when booking hotels.</span>
                            <div className="w-fit mt-6">
                                <button className="w-[198px] h-11 text-base font-semibold leading-[19px] rounded-lg text-white bg-[#86B817]" onClick={() => navigate('/login')} > Register / Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
