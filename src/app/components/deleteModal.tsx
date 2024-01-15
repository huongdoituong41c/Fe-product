import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useAppDispatch } from "../store"
import { deleteHotel, fetchAdminHotels } from '../services/Hotel.service';
import { deleteRoom, fetchAdminRooms } from '../services/Room.service';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';


type Props = {
  openModalDelete: boolean
  setOpenModalDelete: (value: boolean) => void
  idDelete?: number,
  isHotel: boolean,
  isRoom: boolean,
  currentPage: number,
  pageSize: number,
  onPageChange: (value: number) => void
}

const DeleteModal = ({ openModalDelete, setOpenModalDelete, idDelete, isHotel, isRoom, currentPage, pageSize, onPageChange }: Props) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams();

  const handleConfirm = () => {
    if (isHotel) {
      idDelete && dispatch(deleteHotel(idDelete)).unwrap().then((res) => {
        toast.success('Delete hotel successful');
        dispatch(fetchAdminHotels({ page: currentPage, limit: pageSize }))
        setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
        onPageChange(1)
      });
    } else {
      idDelete && dispatch(deleteRoom(idDelete));
      dispatch(fetchAdminRooms({ page: currentPage, limit: pageSize }))
        .unwrap()
        .then(() => {
          dispatch(fetchAdminRooms({ page: currentPage, limit: pageSize }))
        })
      setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
      onPageChange(1)
    }
    setOpenModalDelete(false)
  }
  return (
    <>
      <Modal show={openModalDelete} size="md" onClose={() => setOpenModalDelete(false)} popup >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="text-lg font-normal text-gray-600 dark:text-gray-400">
              {`Are you sure you want to delete this ${isHotel ? 'hotel?' : 'room?'}`}
            </h3>
            <h4 className='mb-5 text-lg font-normal text-gray-600 dark:text-gray-400'>{`If you delete, all information relate to this ${isHotel ? 'hotel' : 'room'} will be deleted!`}</h4>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleConfirm()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeleteModal
