import { Button, Modal } from 'flowbite-react';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { RootState, useAppDispatch } from '../store';
import { useAppSelector } from '../hooks';
import { IHotelManagement } from '../interfaces/Hotel.interface';
import { useEffect, useState } from 'react';
import { fetchAdminHotels } from '../services/Hotel.service';
import { IRoomType } from '../interfaces/RoomType.interface';
import { fetchRoomTypes } from '../services/RoomType.service';
import { addRoom, fetchAdminRooms } from '../services/Room.service';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { useSearchParams } from 'react-router-dom';

interface IFormData {
    hotelId: number
    roomTypeId: number
    availability: number,
    description: string,
    name: string,
    file: any
}

type Props = {
    openCreateRoomModal: boolean,
    setOpenCreateRoomModal: (value: boolean) => void,
    pageSize: number,
    onPageChange: (value: number) => void
}

const CreateRoomModal = ({ openCreateRoomModal, setOpenCreateRoomModal, pageSize, onPageChange }: Props) => {
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const hotels = useAppSelector((state: RootState) => state.hotel.hotels);
    const roomTypes = useAppSelector((state: RootState) => state.roomType.roomTypes);

    const { register, handleSubmit, reset } = useForm<IFormData>();

    useEffect(() => {
        dispatch(fetchAdminHotels({}));
        dispatch(fetchRoomTypes());
    }, [dispatch])

    const onSubmit = (data: IFormData) => {
        const formData = new FormData();

        formData.append('hotelId', String(data.hotelId));
        formData.append('roomTypeId', String(data.roomTypeId));
        formData.append('availability', String(data.availability));
        formData.append('description', data.description);
        formData.append('name', data.name);
        formData.append('file', data.file[0]);

        dispatch(addRoom(formData))
            .unwrap()
            .then(() => {
                // handle result here
                toast.success('Add room successful');
                reset();
                setOpenCreateRoomModal(false);
                dispatch(fetchAdminRooms({ page: currentPage, limit: pageSize }));
                setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
                dispatch(fetchAdminHotels({}))
                onPageChange(1);
            })
            .catch((rejectedValueOrSerializedError) => {
                // handle error here
                toast.error(rejectedValueOrSerializedError);
            })
    }

    const customTheme: CustomFlowbiteTheme = {
        alert: {
            base: "flex flex-col gap-2 p-2 text-sm mb-2"
        }
    }

    return (
        <>
            <Modal dismissible show={openCreateRoomModal} onClose={() => setOpenCreateRoomModal(false)}>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Modal.Header>Add Room</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div className='w-full'>
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
                                <input
                                    type="file"
                                    id="image"
                                    className="border rounded p-2 mb-4"
                                    {...register("file")}
                                    required
                                />
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">Hotel Name</label>
                                        <select className="w-full border border-solid border-gray-700 rounded px-2 py-1" {...register("hotelId")}>
                                            {hotels?.map((hotel: IHotelManagement, index: number) => (
                                                <option value={hotel.hotel_id} key={index}>{hotel.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Room Name</label>
                                        <input className="w-full border rounded px-2 py-1" type="text" {...register("name")} required />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block mb-2">Room Type</label>
                                        <select className="w-full border border-solid border-gray-700 rounded px-2 py-1" {...register("roomTypeId")}>
                                            {roomTypes?.map((roomType: IRoomType) => (
                                                <option value={roomType.type_room_id} key={roomType.type_room_id}>{roomType.type_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block mb-2">Quantity</label>
                                        <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="number" {...register("availability")} required />
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    <div className="w-full">
                                        <div className='flex space-x-2'>
                                            <label className="flex mb-2 text-center">Utilities</label>
                                            <Alert icon={HiInformationCircle} theme={customTheme.alert}>
                                                <span className="font-medium">Note!</span> Each utility is separated by 1 comma.
                                            </Alert>
                                        </div>
                                        <textarea className="w-full border border-solid border-gray-700 rounded px-2 py-1" {...register("description")} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='bg-[#86B817]' type='submit'>Create </Button>
                        <Button color="gray" onClick={() => setOpenCreateRoomModal(false)}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default CreateRoomModal
