import { FaUserGroup, FaStar, FaLocationDot, FaCalendarDays, FaUser } from "react-icons/fa6";
import { IoBedSharp } from "react-icons/io5";
import { CgShutterstock } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingModal from './bookingModal';
import { RootState, useAppDispatch } from '../store';
import { fetchHotels, getByIdHotel } from '../services/Hotel.service';
import { useAppSelector } from '../hooks';
import { getRoomsByHotelId } from '../services/Room.service';
import { IRoom } from '../interfaces/Room.interface';
import { IHotelManagement } from '../interfaces/Hotel.interface';
import { Navigation, Pagination, Scrollbar, A11y, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

const HotelDetail = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { hotelId } = useParams();

    const { hotel } = useAppSelector((state: RootState) => state.hotel);
    const rooms = useAppSelector((state: RootState) => state.room.rooms);
    const hotels = useAppSelector((state: RootState) => state.hotel.hotels);

    const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);
    const [room, setRoom] = useState<IRoom>();
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [imageThumbs, setImageThumbs] = useState<any>();

    useEffect(() => {
        if (hotelId) {
            dispatch(getByIdHotel(Number(hotelId)));
            dispatch(getRoomsByHotelId(Number(hotelId)));
        }
    }, [dispatch, hotelId])

    useEffect(() => {
        dispatch(fetchHotels({}))
    }, [dispatch])

    useEffect(() => {
        if (Array.isArray(hotel.image)) {
            setImageThumbs(hotel.image)
        }
    }, [hotel.image])

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

    const handleOpenBookingModal = (room: IRoom) => {
        setRoom(room);
        setOpenBookingModal(true)
    }

    const showAddress = (address: string) => {
        const parts = address.split(",");
        const lastPart = parts.pop();
        return lastPart;
    }

    const handleClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    };

    return (
        <div className='py-20 w-full mx-auto'>
            <div className='w-[1320px] mx-auto'>
                <div className='h-full w-full'>
                    <Swiper
                        spaceBetween={10}
                        navigation={true}
                        thumbs={thumbsSwiper && { swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        loop={true}
                        className='shadow-lg border border-black'
                    >
                        {imageThumbs?.map((image: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div className='relative cursor-pointer rounded-xl h-[600px]' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }}>
                                    <div className="opacity-40 bg-black z-10 absolute w-full h-full"></div>
                                    <img src={image} alt="" className="w-full h-full object-contain opacity-100 absolute z-20" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className='mySwiper'
                    >
                        {imageThumbs?.map((image: any, index: number) => (
                            <SwiperSlide key={index} className="shadow-xl">
                                <img src={image} alt="" className="w-full h-[250px] object-cover mt-3" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className='z-40 mx-auto mt-10 flex w-full justify-between gap-6 rounded-xl px-5'>
                    <div className='w-full'>
                        <div className='tracking-[.103rem] text-[.6875rem] leading-[1.125rem] font-bold uppercase'>{hotel.address}</div>
                        <div className="mb-4 font-headline text-4.5xl font-bold lg:text-5xl text-[#86B817] mt-2">{hotel.name}</div>
                        <div className="pb-10 leading-6 border-b border-b-[#86B817]">{hotel.description}</div>
                        <div className='relative pb-10 border-b border-b-[#86B817]'>
                            <div className="mb-2 uppercase text-[.625rem] tracking-[.075rem] leading-[1.125rem] font-bold mt-10">WELL-EQUIPPED</div>
                            <div className="mb-[20px] text-2xl font-medium text-black">Hotel-grade amenities. Everything you need.</div>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className="flex">
                                    <div className="mr-2 text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5 21H18.779C19.884 21 20.779 20.105 20.779 19V5C20.779 3.895 19.884 3 18.779 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M20.78 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8.536 16.5V16.5C8.035 15.632 8.29 14.525 9.12 13.964L9.121 13.963C9.787 13.512 10.664 13.527 11.314 14L12.686 14.999C13.336 15.472 14.213 15.487 14.879 15.036L14.88 15.035C15.71 14.474 15.964 13.367 15.464 12.499V12.499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M14.8284 11.6716C16.3905 13.2337 16.3905 15.7664 14.8284 17.3285C13.2663 18.8906 10.7336 18.8906 9.17155 17.3285C7.60945 15.7664 7.60945 13.2337 9.17155 11.6716C10.7337 10.1095 13.2663 10.1095 14.8284 11.6716" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 5.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div><div>Dryer</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx={12} cy={12} r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <rect x={2} y={2} width={20} height={20} rx="5.55556" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M13.8689 10.3548C14.0538 9.68261 14.4992 9.11194 15.1064 8.76925C15.7135 8.42655 16.4322 8.34015 17.1033 8.52917C17.9644 8.76539 18.6416 9.4311 18.8925 10.2881C19.1225 11.0617 18.9857 11.898 18.5212 12.558C18.3298 12.8182 18.0276 12.9738 17.7046 12.9785C17.3815 12.9832 17.0749 12.8365 16.876 12.582C16.2507 11.7811 15.3379 11.2553 14.3313 11.1163" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M11.1165 9.66864C11.2554 8.66209 11.7811 7.7493 12.582 7.124C12.8365 6.92507 12.9833 6.61848 12.9786 6.29546C12.9739 5.97245 12.8183 5.67025 12.5581 5.4788C11.898 5.01435 11.0617 4.87758 10.2881 5.10758C9.43109 5.3584 8.76538 6.03554 8.52917 6.89667C8.34016 7.56772 8.42657 8.28644 8.76925 8.89358C9.11192 9.50071 9.68257 9.94611 10.3547 10.1311" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12.8835 14.3314C12.7446 15.3379 12.2189 16.2507 11.418 16.876C11.1635 17.0749 11.0167 17.3815 11.0214 17.7045C11.0261 18.0275 11.1817 18.3297 11.4419 18.5211C12.102 18.9856 12.9383 19.1224 13.7119 18.8924C14.5689 18.6416 15.2346 17.9644 15.4708 17.1033C15.6599 16.4322 15.5735 15.7135 15.2308 15.1063C14.8881 14.4992 14.3175 14.0538 13.6453 13.8688" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9.6687 12.8835C8.66212 12.7446 7.7493 12.2189 7.124 11.418C6.92503 11.1635 6.61843 11.0168 6.29541 11.0215C5.97239 11.0262 5.6702 11.1818 5.47874 11.442C5.01424 12.102 4.87746 12.9384 5.10752 13.7119C5.35839 14.5689 6.03556 15.2347 6.89671 15.4709C7.56777 15.6599 8.28651 15.5735 8.89365 15.2308C9.50078 14.8881 9.94617 14.3174 10.1311 13.6452" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div><div>Air conditioning</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M16.752 19.5031H8.99875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.78478 15.6432L7.97209 18.0812" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <circle cx="7.49813" cy="19.5031" r="1.50063" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                            <path d="M15.2465 15.6318L17.3356 21.0037" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4.99708 7.99832H19.0029C19.5554 7.99832 20.0033 8.44622 20.0033 8.99874V8.99874C20.0033 12.3138 17.3159 15.0012 14.0008 15.0012H9.99917C6.68408 15.0012 3.99667 12.3138 3.99667 8.99874V8.99874C3.99667 8.44622 4.44457 7.99832 4.99708 7.99832Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.24844 4.99707C7.91497 4.55244 7.91497 3.94107 8.24844 3.49644C8.58191 3.05181 8.58191 2.44045 8.24844 1.99582" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M15.7516 4.99707C15.4181 4.55244 15.4181 3.94107 15.7516 3.49644C16.085 3.05181 16.085 2.44045 15.7516 1.99582" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M12 4.99707C11.6665 4.55244 11.6665 3.94107 12 3.49644C12.3335 3.05181 12.3335 2.44045 12 1.99582" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div><div>BBQ Area</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11.999 19.25C11.792 19.25 11.624 19.418 11.626 19.625C11.625 19.832 11.793 20 12 20C12.207 20 12.375 19.832 12.375 19.625C12.375 19.418 12.207 19.25 11.999 19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M4.591 12C8.683 8.24699 15.316 8.24699 19.408 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M1.594 7.804C7.341 2.732 16.659 2.732 22.406 7.804" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M7.579 15.821C10.02 13.393 13.979 13.393 16.42 15.821" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div><div>Wifi</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="currentColor" d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path stroke="currentColor" d="M21 13V21H3V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path stroke="currentColor" d="M22 13H2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path stroke="currentColor" d="M17 13V12.3571C17 11.5994 16.699 10.8727 16.1632 10.3368C15.6273 9.80102 14.9006 9.5 14.1429 9.5H9.85714C9.09938 9.5 8.37266 9.80102 7.83684 10.3368C7.30102 10.8727 7 11.5994 7 12.3571V13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path stroke="currentColor" d="M9 13L9 21" strokeWidth="1.5"></path>
                                            <path stroke="currentColor" d="M15 13L15 21" strokeWidth="1.5"></path>
                                            <path stroke="currentColor" d="M4.5 10C3.83333 9.427 3.83333 8.773 4.5 8.2C5.16667 7.627 5.16667 6.973 4.5 6.4C3.83333 5.827 3.83333 5.173 4.5 4.6C5.16667 4.027 5.16667 3.373 4.5 2.8C3.83333 2.227 3.83333 1.573 4.5 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path stroke="currentColor" d="M19.5 10C18.8333 9.427 18.8333 8.773 19.5 8.2C20.1667 7.627 20.1667 6.973 19.5 6.4C18.8333 5.827 18.8333 5.173 19.5 4.6C20.1667 4.027 20.1667 3.373 19.5 2.8C18.8333 2.227 18.8333 1.573 19.5 1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div><div>Hot tub</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M5 21H18.779C19.884 21 20.779 20.105 20.779 19V5C20.779 3.895 19.884 3 18.779 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M20.78 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.536 16.5V16.5C8.035 15.632 8.29 14.525 9.12 13.964L9.121 13.963C9.787 13.512 10.664 13.527 11.314 14L12.686 14.999C13.336 15.472 14.213 15.487 14.879 15.036L14.88 15.035C15.71 14.474 15.964 13.367 15.464 12.499V12.499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M14.8284 11.6716C16.3905 13.2337 16.3905 15.7664 14.8284 17.3285C13.2663 18.8906 10.7336 18.8906 9.17155 17.3285C7.60945 15.7664 7.60945 13.2337 9.17155 11.6716C10.7337 10.1095 13.2663 10.1095 14.8284 11.6716" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M16 5.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div><div>Washer</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 10V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M16.5 15H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M21 21V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M3 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8 10C8 6.134 9.79086 3 12 3C14.2091 3 16 6.134 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.99977 10H20.0002C20.3104 9.99728 20.6022 9.85227 20.7917 9.60665C20.9812 9.36103 21.0474 9.04201 20.9714 8.74126C20.1991 5.476 16.4762 3 12 3C7.5238 3 3.80091 5.476 3.02865 8.74125C2.95256 9.042 3.01878 9.36103 3.20828 9.60665C3.39777 9.85227 3.68956 9.99728 3.99977 10V10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8 21V19C8 18.4477 7.55228 18 7 18H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M16 21V19C16 18.4477 16.4477 18 17 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div><div>Outdoor dining area</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M9 21H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M14.999 17.159V18.225H8.999V17.159C8.999 16.102 8.509 15.115 7.694 14.441C6.283 13.272 5.355 11.542 5.258 9.59001C5.073 5.84901 8.148 2.56001 11.893 2.50301C15.67 2.44401 18.75 5.48701 18.75 9.25001C18.75 11.352 17.787 13.226 16.279 14.462C15.47 15.125 14.999 16.113 14.999 17.159Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M8.54 15.45H15.45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                    </div>
                                    <div><div>Smart lights</div></div>
                                </div>
                                <div className="flex">
                                    <div className="mr-2 text-lg text-4-light-grey">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M8 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M7.5 10C6.67157 10 6 9.32843 6 8.5C6 7.67157 6.67157 7 7.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <path d="M7.5 18C6.11929 18 5 16.8807 5 15.5C5 14.1193 6.11929 13 7.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                            <rect x="11" y="3" width="11" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></rect>
                                            <circle cx="16.5" cy="15.5" r="2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                            <circle cx="16.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle>
                                        </svg>
                                    </div>
                                    <div><div>Smart speakers</div></div>
                                </div>
                            </div>
                        </div>
                        <div className='relative flex flex-col border-b border-b-[#86B817]'>
                            <div className="mb-2 uppercase text-[.625rem] tracking-[.075rem] leading-[1.125rem] font-bold mt-10">SLEEPING</div>
                            <div className="mb-[20px] text-2xl font-medium text-black">Choose Your Best Room</div>
                            {
                                rooms?.map((room: IRoom) => (
                                    <div className='w-full p-6 h-[250px] border rounded-lg shadow-lg flex space-x-4' key={room.room_id}>
                                        <div className='flex w-[202px] h-full border'>
                                            <img src={room.image} alt='' className='w-full h-full object-cover' />
                                        </div>
                                        <div className='flex flex-col flex-1 w-full h-full'>
                                            <div className='w-full h-1/3 border-b border-b-gray-300 justify-between flex'>
                                                <div className='flex-col items-center'>
                                                    <div className='flex flex-wrap text-[18px] max-w-[643px] items-center font-semibold leading-[21px] pb-[10px]'>
                                                        <h3 className='m-0 text-inherit'>{room.name}</h3>
                                                    </div>
                                                    <div className='text-[#4A5568] flex items-center text-[14px] font-normal leading-[17px]'>
                                                        <div className='cursor-pointer flex items-center pr-6'>
                                                            <FaUserGroup className='mr-2' />
                                                            {adjustPersonInRoom(room.room_type) + " person"}
                                                        </div>
                                                        <div className='cursor-pointer flex items-center pr-6'>
                                                            <IoBedSharp className='mr-2' />
                                                            {room.room_type}
                                                        </div>
                                                        <div className='cursor-pointer flex items-center pr-6'>
                                                            <CgShutterstock className='mr-2' />
                                                            {adjustAcreageInRoom(room.room_type)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='text-[#E53E3E] flex py-[7px] px-[8px] items-center rounded-[8px] bg-[rgba(229,62,62,0.1)] h-fit text-[14px] font-bold leading-[17px]'>
                                                    <RiErrorWarningLine className='mr-2' />
                                                    {room.availability > 0 ? room.availability === 1 ? "Only 1 room left" : "Only " + room.availability + " rooms left" : "No room available"}
                                                </div>
                                            </div>
                                            <div className='flex w-full'>
                                                <div className='w-2/3 pt-3 border-r'>
                                                    <span className='text-[#1A202C] text-[16px] font-semibold leading-[19px] mb-[10px]'>Utilities</span>
                                                    <div className='grid grid-cols-3 gap-2 pt-2'>
                                                        {room.description.map((utility: string, index: number) => (
                                                            <span className='text-[14px] font-normal leading-[17px]' key={index}>{utility}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className='w-1/3 text-right flex flex-col pt-3 space-y-3 items-end'>
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                    <span className='text-[20px] font-semibold leading-[24px]'>{formatter.format(adjustPersonInRoom(room.room_type) * room.price)}</span>
                                                    <button className={`text-white w-[156px] border-none h-11 p-[6px_8px] text-[16px] min-h-[20px] font-semibold rounded-[8px] ${room.availability < 1 ? 'disabled:bg-slate-300' : 'bg-[#86B817]'}`} onClick={() => handleOpenBookingModal(room)} disabled={room.availability < 1}>Book room</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='relative flex flex-col'>
                            <div className="mb-2 uppercase text-[.625rem] tracking-[.075rem] leading-[1.125rem] font-bold mt-10">OTHERS</div>
                            <div className="mb-[20px] text-2xl font-medium text-black">Hotel around</div>
                            <div className="grid grid-cols-3 gap-4 justify-center py-5 mx-auto">
                                <Swiper
                                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={3}
                                    navigation
                                    pagination={{ clickable: true }}
                                    scrollbar={{ draggable: true }}
                                    className='w-[1280px] border'
                                >
                                    {
                                        hotels.map((hotel: IHotelManagement) => (
                                            <SwiperSlide key={hotel.hotel_id}>
                                                <div className="flex flex-[0_0_auto] w-full" key={hotel.hotel_id}>
                                                    <div className="shadow-[0_0_45px_rgba(0,0,0,.08)] w-full">
                                                        <div className="overflow-hidden">
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
                                                            <button className="mt-4 font-semibold px-3 bg-[#86B817] border-[#86B817] leading-[1.5] text-center align-middle cursor-pointer select-none border rounded-lg text-white h-12" onClick={() => { navigate(`/detail/${hotel.hotel_id}`); handleClick() }}>Read more</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal openBookingModal={openBookingModal} setOpenBookingModal={setOpenBookingModal} hotel={hotel} room={room} />
        </div>
    )
}

export default HotelDetail
