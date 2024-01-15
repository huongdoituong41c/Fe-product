import { Avatar, Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { RootState, useAppDispatch } from "../store";
import { ROLE } from "../constants/constant";
import { authUserLogin } from "../services/Auth.service";

const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const userLogin = useAppSelector((state: RootState) => state.auth.userLogin)

    const [scroll, setScroll] = useState<number>(0)
    const [isExpired, setIsExpired] = useState<boolean>(false);

    useEffect(() => {
        dispatch(authUserLogin())
            .unwrap()
            .then((res: any) => {
                if (res === "token expired") {
                    window.localStorage.clear();
                    navigate("/");
                    //alert two times because of React.StrictMode
                    alert("Login session has expired. Please log in again");
                    setIsExpired(true);
                    Sign_out();
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        const setMenuFixed = () => {
            const scrollY = window.scrollY
            setScroll(scrollY)
        }
        window.addEventListener('scroll', setMenuFixed)
        return () => {
            window.removeEventListener('scroll', setMenuFixed);
        }
    }, [])

    const Sign_out = () => {
        window.localStorage.clear();
        setIsExpired(true);
    }

    return (
        <div className='w-full mx-auto p-0 relative'>
            <nav className={`w-full top-0 left-0 z-[999] border-b border-b-slate-400 py-0 px-10 flex-wrap justify-start flex items-center h-[98px] transition-all 
                ${scroll < 115 ?
                    location.pathname !== '/home' ?
                        location.pathname.startsWith('/me') ?
                            "absolute" : location.pathname.startsWith('/admin') ? 'fixed bg-white' :
                                "sticky" : "absolute"
                    : "fixed bg-white shadow-lg"}`
            }>
                <div className='text-[rgba(0,0,0,0.9)] p-0 mr-4 text-[1.25rem] whitespace-nowrap'>
                    <Link to='/home' className='text-[#86B817] m-0 flex items-center text-[2.5rem]'>
                        <img src="https://th.bing.com/th/id/OIG.G6byoRt7N_QLlRlDgcgQ?w=270&h=270&c=6&r=0&o=5&pid=ImgGn" alt="" className="w-full h-[80px] rounded-full mr-2" />
                        My Hotel
                    </Link>
                </div>
                <div className="flex flex-grow items-center">
                    <div className="py-0 ml-auto flex pl-0 mb-0 list-none">
                        <NavLink to='/home' className={`relative mr-[25px] py-[35px] px-0 text-[18px] font-semibold outline-0 transition-[.5s] ${scroll < 115 ? location.pathname !== '/home' ? location.pathname.startsWith('/me') ? "text-white" : "text-black" : "text-white" : "text-black"}`} style={({ isActive, isPending, isTransitioning }) => {
                            return {
                                color: isActive ? "#86B817" : "",
                            };
                        }}>Home</NavLink>
                        <span className={`relative mr-[25px] py-[35px] px-0 text-[18px] font-semibold outline-0 transition-[.5s] ${scroll < 115 ? location.pathname !== '/home' ? location.pathname.startsWith('/me') ? "text-white" : "text-black" : "text-white" : "text-black"}`}>About</span>
                        <span className={`relative mr-[25px] py-[35px] px-0 text-[18px] font-semibold outline-0 transition-[.5s] ${scroll < 115 ? location.pathname !== '/home' ? location.pathname.startsWith('/me') ? "text-white" : "text-black" : "text-white" : "text-black"}`}>Service</span>
                        <span className={`relative mr-[25px] py-[35px] px-0 text-[18px] font-semibold outline-0 transition-[.5s] ${scroll < 115 ? location.pathname !== '/home' ? location.pathname.startsWith('/me') ? "text-white" : "text-black" : "text-white" : "text-black"}`}>Packages</span>
                        <span className={`relative mr-[25px] py-[35px] px-0 text-[18px] font-semibold outline-0 transition-[.5s] ${scroll < 115 ? location.pathname !== '/home' ? location.pathname.startsWith('/me') ? "text-white" : "text-black" : "text-white" : "text-black"}`}>Pages</span>
                        <span className={`relative mr-[25px] py-[35px] px-0 text-[18px] font-semibold outline-0 transition-[.5s] ${scroll < 115 ? location.pathname !== '/home' ? location.pathname.startsWith('/me') ? "text-white" : "text-black" : "text-white" : "text-black"}`}>Contact</span>
                    </div>
                    {(Object.values(userLogin).length === 0) ? (
                        <button className="text-white font-semibold transition-[.5s] rounded-[50rem] py-2 px-4 bg-[#86B817] border-[#86B817] inline-flex leading-[1.5] text-center align-middle cursor-pointer select-none border text-[1rem]" onClick={() => navigate('/login')}>Register/Login</button>
                    ) : (
                        <>
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
                                }
                            >
                                {!isExpired && (
                                    <Dropdown.Header>
                                        <span className="block text-sm">{`${userLogin.first_name} ${userLogin.last_name}`}</span>
                                        <span className="block truncate text-sm font-medium">{userLogin.email}</span>
                                    </Dropdown.Header>
                                )}

                                {/* Appear if admin */}
                                {!isExpired && userLogin.role === ROLE.SUPER_ADMIN && (
                                    <Dropdown.Item onClick={() => navigate('/me/user_management')}>User Management</Dropdown.Item>
                                )}
                                {!isExpired && (userLogin.role === ROLE.ADMIN || userLogin.role === ROLE.SUPER_ADMIN) && (
                                    <>
                                        <Dropdown.Item onClick={() => navigate('/me/hotel_management')}>Hotel Management</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate('/me/room_management')}>Room Management</Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate('/me/booking_management')}>Booking management</Dropdown.Item>
                                    </>
                                )}

                                {!isExpired && userLogin.user_id !== null && (
                                    <Dropdown.Item onClick={() => navigate('/me/history')} >Booking history</Dropdown.Item>
                                )}
                                <Dropdown.Divider />
                                {!isExpired && userLogin.user_id !== null ? (
                                    <Dropdown.Item onClick={Sign_out}>Sign out</Dropdown.Item>
                                ) : (
                                    <Dropdown.Item onClick={() => navigate('/login')}>Log in</Dropdown.Item>
                                )}
                            </Dropdown>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
