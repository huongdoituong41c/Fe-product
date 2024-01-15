import { Button, Modal } from 'flowbite-react';
import { CgShutterstock } from 'react-icons/cg';
import { FaUserGroup } from 'react-icons/fa6';
import { IoBedSharp } from 'react-icons/io5';
import { IHotelManagement } from '../interfaces/Hotel.interface';
import { IRoom } from '../interfaces/Room.interface';
import { FaMoneyBillWave } from "react-icons/fa6";
import { Controller, useForm } from 'react-hook-form';
import { RootState, useAppDispatch } from '../store';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/styles/react-datepicker.css";
import { useAppSelector } from '../hooks';
import { addBooking } from '../services/Booking.service';
import { toast } from "react-toastify";
import { getRoomsByHotelId } from '../services/Room.service';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface IFormData {
    checkInDate: any
    checkOutDate: any
    numberOfGuests: number,
    numberOfRooms: number,
}

type Props = {
    openBookingModal: boolean,
    setOpenBookingModal: (value: boolean) => void,
    hotel?: IHotelManagement,
    room?: IRoom
}

const BookingModal = ({ openBookingModal, setOpenBookingModal, hotel, room }: Props) => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, control, watch } = useForm<IFormData>();

    const userLogin = useAppSelector((state: RootState) => state.auth.userLogin);

    const [money, setMoney] = useState<number>();
    const [valueChange, setValueChange] = useState<any>({
        numberOfRooms: 1,
        checkInDate: watch('checkInDate'),
        checkOutDate: watch('checkOutDate')
    })

    useEffect(() => {
        if (!room || !hotel) return;
        setMoney(adjustPersonInRoom(room.room_type) * room.price)
    }, [hotel, room])

    const onSubmit = (data: IFormData) => {
        const dataBooking = {
            ...data,
            userId: Number(userLogin.user_id),
            roomId: Number(room?.room_id),
        }

        dispatch(addBooking(dataBooking))
            .unwrap()
            .then(() => {
                toast.success('Book room successful');
                reset();
                setOpenBookingModal(false);
                hotel && dispatch(getRoomsByHotelId(hotel.hotel_id));
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                toast.error(rejectedValueOrSerializedError);
            })
    }

    const adjustPersonInRoom = (typeRoom: string) => {
        switch (typeRoom) {
            case 'Single Room':
                return 1;
            case 'Double Room':
                return 3;
            case 'Family Room':
                return 6;
            case 'Suite Room':
                return 4;
            case 'Special Room':
                return 5;
            default:
                return 0;
        }
    }

    const adjustAcreageInRoom = (typeRoom: string) => {
        switch (typeRoom) {
            case 'Single Room':
                return '16m²';
            case 'Double Room':
                return '25m²';
            case 'Family Room':
                return '35m²';
            case 'Suite Room':
                return '50m²';
            case 'Special Room':
                return '40m²';
            default:
                break;
        }
    }

    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const onHandleChangeMoney = (e: any, name: string) => {

        setValueChange((pre: any) => {
            const newValues = {
                ...pre,
                [name]: e.target ? Number(e.target.value) : e
            }

            const numberOfRooms = newValues.numberOfRooms;
            const dayBooking = moment(newValues.checkOutDate).diff(moment(newValues.checkInDate), 'days');
            const price = room && adjustPersonInRoom(room.room_type) * room.price;

            setMoney(() => {
                if (dayBooking < 1 && price) {
                    if (numberOfRooms === '') {
                        return price;
                    } else {
                        return price * numberOfRooms;
                    }
                } else {
                    if (numberOfRooms === '' && price) {
                        return price * dayBooking;
                    } else {
                        return price && price * numberOfRooms * dayBooking;
                    }
                }
            })
            return newValues
        })
    }

    return (
        <>
            <Modal dismissible show={openBookingModal} onClose={() => { setOpenBookingModal(false); reset(); setMoney(room && adjustPersonInRoom(room.room_type) * room.price) }}>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>{hotel?.name}</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className='w-full flex'>
                                <div className='w-20 h-20 mr-3 flex'>
                                    <div className='w-full h-full relative'>
                                        <div className='opacity-0 transition-[opacity_500ms] top-0 left-0 right-0 w-full bottom-0 h-full flex z-[1] absolute items-center justify-center bg-[#EDF2F7]'></div>
                                        <div className='h-full'>
                                            <img src={room?.image} alt='' className='rounded-[8px] absolute top-0 left-0 w-full h-full object-cover' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-[16px] font-semibold leading-[19px] mb-1'>{room?.name}</p>
                                    <div className='text-[#4A5568] flex items-center text-[14px] font-normal leading-[17px] mt-2'>
                                        <div className='cursor-pointer flex items-center pr-6'>
                                            <FaUserGroup className='mr-2' />
                                            {room && adjustPersonInRoom(room.room_type) + " person"}
                                        </div>
                                        <div className='cursor-pointer flex items-center pr-6'>
                                            <IoBedSharp className='mr-2' />
                                            {room?.room_type}
                                        </div>
                                        <div className='cursor-pointer flex items-center pr-6'>
                                            <CgShutterstock className='mr-2' />
                                            {room && adjustAcreageInRoom(room.room_type)}
                                        </div>
                                    </div>
                                    <div className='mt-2 flex'>
                                        <div className='cursor-pointer flex items-center pr-6'>
                                            <FaMoneyBillWave className='mr-2' />
                                            <span className='text-red-500'>{money && formatter.format(money)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">Check in date</label>
                                        <Controller
                                            control={control}
                                            name="checkInDate"
                                            defaultValue={new Date()}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                <DatePicker
                                                    dateFormat="dd-MM-yyyy h:mm aa"
                                                    showTimeSelect
                                                    onChange={(e) => {
                                                        onChange(e);
                                                        onHandleChangeMoney(e, 'checkInDate');
                                                    }}
                                                    onBlur={onBlur}
                                                    selected={value}
                                                    required
                                                    className="w-full border rounded px-2 py-1"
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Check out date</label>
                                        <Controller
                                            control={control}
                                            name="checkOutDate"
                                            defaultValue={new Date(new Date().getTime() + 86400000)}
                                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                                <DatePicker
                                                    dateFormat="dd-MM-yyyy h:mm aa"
                                                    showTimeSelect
                                                    onChange={(e) => {
                                                        onChange(e);
                                                        onHandleChangeMoney(e, 'checkOutDate');
                                                    }}
                                                    onBlur={onBlur}
                                                    selected={value}
                                                    required
                                                    className="w-full border rounded px-2 py-1"
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">Number of guests</label>
                                        <input className="w-full border rounded px-2 py-1" type="number" min={1} max={room && adjustPersonInRoom(room.room_type)} {...register("numberOfGuests")} />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Number of rooms</label>
                                        <input className="w-full border rounded px-2 py-1" type="number" min={1} max={room?.availability} {...register("numberOfRooms")} onChange={(e: any) => onHandleChangeMoney(e, 'numberOfRooms')} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='bg-[#86B817]' type='submit'>Book now</Button>
                        <Button color="gray" onClick={() => { setOpenBookingModal(false); reset(); setMoney(room && adjustPersonInRoom(room.room_type) * room.price) }}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default BookingModal
