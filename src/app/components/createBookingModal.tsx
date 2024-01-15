import { Button, Modal } from 'flowbite-react';

type Props = {
    openCreateBookingModal: boolean,
    setOpenCreateBookingModal: (value: boolean) => void,
}

const CreateBookingModal = ({ openCreateBookingModal, setOpenCreateBookingModal }: Props) => {
    return (
        <>
            <Modal dismissible show={openCreateBookingModal} onClose={() => setOpenCreateBookingModal(false)}>
                <Modal.Header>Add Booking Room</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <form className="w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image:</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                className="border rounded p-2 mb-4"
                            />
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-2">
                                    <label className="block mb-2">Hotel Name</label>
                                    <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" name="number_of_rooms"/>
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label className="block mb-2">Room</label>
                                    <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" name="number_of_rooms"/>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-2">
                                    <label className="block mb-2">User Name	</label>
                                    <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type='number' name="number_of_people" />
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label className="block mb-2">Number Guests</label>
                                    <input className="w-full border border-solid border-gray-700 rounded px-2 py-1" type="text" name="number_of_rooms" />
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-2">
                                    <label className="block mb-2">Check in date</label>
                                    <input className="w-full border rounded px-2 py-1" type="date" name="check_in_date" />
                                </div>
                                <div className="w-1/2 ml-2">
                                    <label className="block mb-2">Check out date</label>
                                    <input className="w-full border rounded px-2 py-1" type="date" name="check_out_date" />
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-2">
                                    <label className="block mb-2">Total Price</label>
                                    <input className="w-full border rounded px-2 py-1" type="number" name="check_in_date" />
                                </div>
                                <div className="w-1/2 ml-2"></div>
                            </div>
                        </form>
                        
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='bg-[#86B817]' onClick={() => setOpenCreateBookingModal(false)}>Create</Button>
                    <Button color="gray" onClick={() => setOpenCreateBookingModal(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateBookingModal
