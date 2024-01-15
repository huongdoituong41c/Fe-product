import { Checkbox } from 'flowbite-react'
import Logo from '../../assets/images/logoLogin2.png'
import { FaFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ILoginReq } from '../interfaces/Login.interface';
import { useAppDispatch } from '../store';
import { authLogin } from '../services/Auth.service';
import { toast } from "react-toastify";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginReq>();

    const onSubmit = (data: ILoginReq) => {
        const login: ILoginReq = data
        dispatch(authLogin(login))
            .unwrap()
            .then((res) => {
                // handle result here
                localStorage.setItem('jwt', JSON.stringify(res));
                toast.success('login successfully')
                navigate('/home');
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                toast.error(rejectedValueOrSerializedError)
            });
    }

    return (
        <>
            <section className="h-screen">
                <div className="h-full">
                    <div className="g-6 flex flex-wrap items-center justify-center lg:justify-between">
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:shrink-0 md:w-1/2 md:h-1/2">
                            <img
                                src={Logo}
                                alt="Sample"
                                className="w-full h-[100vh]" />
                        </div>

                        <div className="mb-12 md:mb-0 px-10 w-1/2 mx-auto">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div
                                    className="flex flex-row items-center justify-center">
                                    <p className="mb-0 mr-4 text-5xl bold text-black">Sign in with</p>
                                    <button>
                                        <FaFacebook className="text-[#3b71ca] h-10 w-10" />
                                    </button>
                                    <button className="mx-4">
                                        <FaGoogle className="text-[#3b71ca] h-10 w-10" />
                                    </button>
                                    <button><FaInstagramSquare className="text-[#3b71ca] h-11 w-10" /></button>
                                </div>

                                <div
                                    className="my-4 w-3/4 ml-[125px] flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p
                                        className="mx-4 mb-0 text-center font-semibold dark:text-white text-black">
                                        Or
                                    </p>
                                </div>
                                <div className="w-full mx-auto flex justify-center items-center flex-col">
                                    <div className='w-2/3 mt-2'>
                                        <div className="relative border shadow-lg" data-te-input-wrapper-init>
                                            <input
                                                type="text"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity"
                                                placeholder="Email address"
                                                {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                                        </div>
                                        {errors.email && <span className="text-red-600 flex justify-start pt-2">This field is required.</span>}
                                    </div>

                                    <div className='w-2/3 mt-6'>
                                        <div className="relative border shadow-lg" data-te-input-wrapper-init>
                                            <input
                                                type="password"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity"
                                                placeholder='Password'
                                                {...register("password", { required: true, maxLength: 80 })} />
                                        </div>
                                        {errors.password && <span className="text-red-600 flex justify-start pt-2">This field is required.</span>}
                                    </div>
                                </div>

                                <div className="w-2/3 mt-6 flex justify-between ml-36">
                                    <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[0.5rem]">
                                        <Checkbox id="accept" defaultChecked className="mr-1" />
                                        <label
                                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor="accept">
                                            Remember me
                                        </label>
                                    </div>

                                    <a href="#!">Forgot password?</a>
                                </div>

                                <div className="mt-6 lg:text-left flex justify-center">
                                    <button
                                        type="submit"
                                        className="inline-block rounded-full
                                        px-6 pb-2 pt-2.5 text-xs font-medium
                                        uppercase leading-normal text-white
                                        bg-[#86B817]
                                        shadow-[0_4px_9px_-4px_#14a44d] transition
                                        duration-150 ease-in-out
                                        w-1/4 mr-40">
                                        Login
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-block rounded-full
                                        px-6 pb-2 pt-2.5 text-xs font-medium
                                        uppercase leading-normal text-white
                                        bg-[#86B817]
                                        shadow-[0_4px_9px_-4px_#14a44d] transition
                                        duration-150 ease-in-out
                                        w-1/4" onClick={() => navigate("/register")}>
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Login
