import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useAppDispatch } from "../store"
import { deleteUser } from '../services/User.service';
import { toast } from "react-toastify";

type Props = {
  openDeleteModal: boolean
  setOpenDeleteModal: (value: boolean) => void
  idDelete?: number,
  onPageChange: (value: number) => void
}

const DeleteUserModal = ({ openDeleteModal, setOpenDeleteModal, idDelete, onPageChange }: Props) => {
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    idDelete && dispatch(deleteUser(idDelete))
      .unwrap()
      .then(() => {
        // handle result here
        toast.success('Delete user successful')
        setOpenDeleteModal(false)
        onPageChange(1)
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
        toast.error(rejectedValueOrSerializedError)
      });
  }
  return (
    <>
      <Modal show={openDeleteModal} size="md" onClose={() => setOpenDeleteModal(false)} popup >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="text-lg font-normal text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this user?
            </h3>
            <h4 className='mb-5 text-lg font-normal text-gray-600 dark:text-gray-400'>If you delete, all information relate to you will be deleted!</h4>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleConfirm()}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DeleteUserModal
