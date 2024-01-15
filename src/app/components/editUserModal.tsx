import { Button, Modal } from 'flowbite-react';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Select } from 'antd';
import { IUser } from '../interfaces/User.interface';
import { useAppDispatch } from '../store';
import { updateUser } from '../services/User.service';
import { toast } from "react-toastify";
import '../../assets/styles/select-antd.css'

type Props = {
    openEditHotelModal: boolean,
    setOpenEditHotelModal: (value: boolean) => void,
    userEdit?: IUser
}

interface IFormData {
    first_name: string
    last_name: string
    email: string,
    role: string
}

const EditUserModal = ({ openEditHotelModal, setOpenEditHotelModal, userEdit }: Props) => {
    const roles = [
        { value: 'Super Admin', label: 'Super Admin' },
        { value: 'Admin', label: 'Admin' },
        { value: 'User', label: 'User' },
    ];
    const dispatch = useAppDispatch();
    const { register, handleSubmit, setValue } = useForm<IFormData>()

    useEffect(() => {
        if (userEdit) {
            setValue('first_name', userEdit.first_name);
            setValue('last_name', userEdit.last_name);
            setValue('email', userEdit.email);
            setValue('role', userEdit.role);
        }
    }, [userEdit, setValue])

    const onSubmit = (data: IFormData) => {
        const dataUpdate: any = {
            id: userEdit?.user_id,
            data: data
        }
        dispatch(updateUser(dataUpdate))
            .unwrap()
            .then(() => {
                // handle result here
                toast.success('Update user successful')
                setOpenEditHotelModal(false)
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                toast.error(rejectedValueOrSerializedError)
            });
    }

    const handleSelectChange = (role: string) => {
        setValue("role", role);
    };

    return (
        <>
            <Modal dismissible show={openEditHotelModal} onClose={() => setOpenEditHotelModal(false)}>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header>Edit User</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className='w-full'>
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">First Name</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type='text' {...register("first_name")} />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Last Name</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type='text' {...register("last_name")} />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/2">
                                        <label className="block mb-2">Email</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" {...register("email")} type='email' />
                                    </div>
                                    <div className="w-1/2 ml-4">
                                        <label className="block mb-2">Role</label>
                                        <Select
                                            defaultValue={userEdit?.role}
                                            onChange={handleSelectChange}
                                            options={roles}
                                            className='w-full border border-solid border-gray-700 rounded py-1 font-semibold h-[34px] pl-[-1px] text-black'
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2 ml-2"></div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='bg-[#86B817]' type='submit'>Edit</Button>
                        <Button color="gray" onClick={() => setOpenEditHotelModal(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default memo(EditUserModal);
