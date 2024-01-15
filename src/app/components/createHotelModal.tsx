import { Button, Modal } from 'flowbite-react';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../store';
import { addHotels, fetchAdminHotels } from '../services/Hotel.service';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface IFormData {
    name: string
    address: string
    description: string,
    file: any
}

type Props = {
    openCreateHotelModal: boolean,
    setOpenCreateHotelModal: (value: boolean) => void,
    pageSize: number,
    onPageChange: (value: number) => void
}

const CreateHotelModal = ({ openCreateHotelModal, setOpenCreateHotelModal, pageSize, onPageChange }: Props) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormData>();

    const onSubmit = (data: IFormData) => {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('description', data.description);
        
        for (let i = 0; i < data.file.length; i++) {
            formData.append('file', data.file[i]);
        }
        

        dispatch(addHotels(formData))
            .unwrap()
            .then(() => {
                // handle result here
                toast.success('Add hotel successful');
                reset();
                setOpenCreateHotelModal(false);
                dispatch(fetchAdminHotels({ page: currentPage, limit: pageSize }))
                setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
                onPageChange(1)
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                toast.error(rejectedValueOrSerializedError);
            })
    }

    return (
        <>
            <Modal dismissible show={openCreateHotelModal} onClose={() => { setOpenCreateHotelModal(false); reset() }}>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Modal.Header>Add Hotel</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    multiple
                                    className="border rounded p-2 mb-4"
                                    {...register('file')}
                                    required
                                />
                                {errors.file && <p className="text-red-600 my-2">Need to upload image</p>}
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">Hotel Name</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" {...register('name')} required />
                                        {errors.name && <p className="text-red-600 my-2">This field is required</p>}
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Address</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" {...register('address')} required />
                                        {errors.address && <p className="text-red-600 my-2">This field is required</p>}
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-full">
                                        <label className="block mb-2">Description</label>
                                        <textarea className="w-full border border-solid border-gray-700 rounded px-2 py-1" {...register('description')} required />
                                        {errors.description && <p className="text-red-600 my-2">This field is required</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='bg-[#86B817]' type='submit'>Create</Button>
                        <Button color="gray" onClick={() => { setOpenCreateHotelModal(false); reset() }}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default CreateHotelModal
