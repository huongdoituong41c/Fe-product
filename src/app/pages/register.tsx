import Logo from '../../assets/images/logoLogin2.png'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IRegisterReq } from '../interfaces/Register.interface';
import { registerUser } from '../services/Auth.service';
import { useAppDispatch } from '../store';
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterReq>();

    const onSubmit = async (data: IRegisterReq) => {
        dispatch(registerUser(data))
            .unwrap()
            .then(() => {
                toast.success('Register successfully')
                navigate('/login')
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                console.log(rejectedValueOrSerializedError)
            })
    };

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
                                    <p className="mb-0 mr-4 text-5xl bold text-black">Register</p>
                                </div>

                                <div
                                    className="my-4 w-3/4 ml-[125px] flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p
                                        className="mx-4 mb-0 text-center font-semibold dark:text-white text-[#124b38]">
                                        Or
                                    </p>
                                </div>
                                <div className="w-full mx-auto flex justify-center items-center flex-col">
                                    <div className='w-2/3 mt-2'>
                                        <div className="relative border shadow-lg" data-te-input-wrapper-init>
                                            <input
                                                type="text"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity"
                                                placeholder='First Name'
                                                {...register("first_name", { required: true, maxLength: 80 })} />
                                        </div>
                                        {errors.first_name && <span className="text-red-600 flex justify-start pt-2">This field is required.</span>}
                                    </div>

                                    <div className='w-2/3 mt-6'>
                                        <div className="relative border shadow-lg" data-te-input-wrapper-init>
                                            <input
                                                type="text"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity"
                                                placeholder='Last Name'
                                                {...register("last_name", { required: true, maxLength: 80 })} />
                                        </div>
                                        {errors.last_name && <span className="text-red-600 flex justify-start pt-2">This field is required.</span>}
                                    </div>

                                    <div className='w-2/3 mt-6'>
                                        <div className="relative border shadow-lg" data-te-input-wrapper-init>
                                            <input
                                                type="email"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity"
                                                placeholder='Email Address'
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
                                    <div className='w-2/3 mt-6' hidden>
                                        <div className="relative border shadow-lg" data-te-input-wrapper-init>
                                            <input
                                                type="text"
                                                className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity"
                                                placeholder='Password'
                                                value="User"
                                                {...register("role", { required: true, maxLength: 80 })} />
                                        </div>
                                        {errors.role && <span className="text-red-600 flex justify-start pt-2">This field is required.</span>}
                                    </div>
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
                                        Register
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-block rounded-full
                                        px-6 pb-2 pt-2.5 text-xs font-medium
                                        uppercase leading-normal text-white
                                        bg-[#86B817]
                                        shadow-[0_4px_9px_-4px_#14a44d] transition
                                        duration-150 ease-in-out
                                        w-1/4" onClick={() => navigate("/login")}>
                                        Cancel
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

export default Register
