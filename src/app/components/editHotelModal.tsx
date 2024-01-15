import { Button, Modal } from 'flowbite-react';
import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { updateHotel } from '../services/Hotel.service';
import { IHotelManagement } from '../interfaces/Hotel.interface';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';

type Props = {
    openEditHotelModal: boolean,
    setOpenEditHotelModal: (value: boolean) => void,
    hotelEdit?: IHotelManagement;
}

interface IFormData {
    name: string
    address: string
    description: string,
    file: any
}

const EditHotelModal = ({ openEditHotelModal, setOpenEditHotelModal, hotelEdit }: Props) => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, setValue } = useForm<IFormData>();

    useEffect(() => {
        if (hotelEdit) {
            setValue("name", hotelEdit.name);
            setValue("address", hotelEdit.address);
            setValue("description", hotelEdit.description);
            setValue("file", hotelEdit.image);
        }
    }, [hotelEdit, setValue])

    const onSubmit = (data: IFormData) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('description', data.description);
        for (let i = 0; i < data.file.length; i++) {
            formData.append('file', typeof data.file[i] === 'object' ? data.file[i] : data.file[i]);
        }

        dispatch(updateHotel({
            hotel_id: hotelEdit?.hotel_id,
            data: formData
        }))
            .unwrap()
            .then(() => {
                // handle result here
                toast.success('Update hotel successful');
                setOpenEditHotelModal(false);
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                toast.error(rejectedValueOrSerializedError);
            })
    }

    return (
        <>
            <Modal dismissible show={openEditHotelModal} onClose={() => setOpenEditHotelModal(false)}>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Modal.Header>Edit Hotel</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
                                <input
                                    type="file"
                                    id="imageEdit"
                                    multiple
                                    className="border rounded p-2 mb-4"
                                    {...register("file")}
                                />
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">Hotel Name</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" {...register("name")} required />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Address</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" {...register("address")} required />
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    <div className="w-full">
                                        <label className="block mb-2">Description</label>
                                        <textarea className="w-full border border-solid border-gray-700 rounded px-2 py-1" {...register("description")} required />
                                    </div>
                                </div>
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

export default EditHotelModal
