import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai"
import { Pagination, Table } from "flowbite-react"
import { useEffect, useState } from "react"
import CreateRoomModal from "./createRoomModal"
import EditRoomModal from "./editRoomModal"
import DeleteModal from "./deleteModal"
import { useAppSelector } from "../hooks"
import { RootState, useAppDispatch } from "../store"
import { IRoom } from "../interfaces/Room.interface"
import { fetchAdminRooms } from "../services/Room.service"
import { filterRooms } from "../redux/roomSlice"
import { useSearchParams } from "react-router-dom"

const RoomManagement = () => {
  const dispatch = useAppDispatch();

  const { rooms, filterRoomsData, totalCount } = useAppSelector((state: RootState) => state.room)

  const [openCreateRoomModal, setOpenCreateRoomModal] = useState<boolean>(false)
  const [openEditRoomModal, setOpenEditRoomModal] = useState<boolean>(false)
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
  const [roomEdit, setRoomEdit] = useState<IRoom>();
  const [idDelete, setIdDelete] = useState<number>();
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchAdminRooms({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage])

  const handleOpenModalRoomEdit = (roomEdit: IRoom) => {
    setOpenEditRoomModal(true);
    setRoomEdit(roomEdit);
  }

  const handleSearchRooms = (e: any) => {
    const text = e.target.value;
    setKeyword(text);
    dispatch(filterRooms(text));
  }

  const checkData = () => {
    return filterRoomsData && rooms && filterRoomsData.length > 0 ? filterRoomsData : rooms;
  }

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    setSearchParams({ page: page.toString(), limit: pageSize.toString() })
  };

  const onChangeLimit = (e: any) => {
    let pageSize = e.target.value;
    setPageSize(pageSize)
    onPageChange(1)
    setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() })
    dispatch(fetchAdminRooms({ page: currentPage, limit: pageSize }))
      .unwrap().then((res) => {
        if (res.data.length === 0) {
          setCurrentPage(1)
        }
      })
  }

  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() });
  }, [currentPage, pageSize]);

  return (
    <div className="mt-5 flex justify-center rounded-md">
      <div className="mt-5 px-4 py-4 bg-white w-[1350px]">
        <div className="text-center">
          <h6 className="text-center px-3 relative inline-block uppercase bg-white text-[#86B817] text-[1rem] mt-0 mb-2 font-extrabold leading-[1.2]">
            ミ★Hotel★彡
          </h6>
          <h1 className="mb-5 text-[2.5rem] mt-0 font-extrabold leading-[1.2] text-[#2C3E50]">
            Room Management
          </h1>
        </div>
        <div className="grid grid-cols-3 justify-end pt-5">
          <h1 className="col-span-1 text-3xl pl-6 text-black font-semibold">
            All Room
          </h1>
          <div className="col-span-1">
            <input
              placeholder="Search"
              className="bg-gray-200 h-10 px-6 rounded-full w-full mx-3"
              value={keyword}
              onChange={(e: any) => handleSearchRooms(e)}
            />
          </div>
          <div className="col-span-1 flex justify-end ml-20 items-center ">
            <button
              onClick={() => setOpenCreateRoomModal(true)}
              className="flex w-30 items-center justify-center h-8 px-5 rounded-md bg-[#135846] text-white space-x-1.5 hover:text-white col-span-2"
              uk-toggle="target: #create-post-modal"
            >
              <AiFillPlusCircle className="text-white" />
              <span>Add Room</span>
            </button>
          </div>
        </div>
        <div>
          <div className="w-full mt-7">
            <Table hoverable className="shadow-lg">
              <Table.Head>
                <Table.HeadCell className="w-[200px]"></Table.HeadCell>
                <Table.HeadCell className="text-center">Room Name</Table.HeadCell>
                <Table.HeadCell className="text-center">Hotel Name</Table.HeadCell>
                <Table.HeadCell className="text-center">Type</Table.HeadCell>
                <Table.HeadCell className="text-center">Price</Table.HeadCell>
                <Table.HeadCell className="text-center">Remaining</Table.HeadCell>
                <Table.HeadCell className="text-center">Utilities</Table.HeadCell>
                <Table.HeadCell className="text-center">Option</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {checkData().map((room: IRoom) => (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={room.room_id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <img
                        src={room.image}
                        className="w-20 h-20 object-cover mx-auto"
                        alt=""
                      />
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {room.name}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {room.hotel}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {room.room_type}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {`${room.price}đ / night`}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {room.availability}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      {Array.isArray(room?.description) ? room.description.join(",") : ''}
                    </Table.Cell>
                    <Table.Cell className="text-center font-semibold">
                      <div className="flex space-x-2 justify-center">
                        <button
                          className="text-blue-500"
                          onClick={() => handleOpenModalRoomEdit(room)}
                        >
                          <AiOutlineEdit />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => {
                            setIdDelete(room.room_id);
                            setOpenModalDelete(true)
                          }
                          }
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>

            <div className="flex justify-between items-center pl-6 mt-4">
              <div className="flex items-center">
                <span className="mr-2">Display:</span>
                <select className="border rounded p-1" onChange={(e) => onChangeLimit(e)}>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
                <span className="ml-2">Item</span>
              </div>
              <Pagination layout="pagination" currentPage={currentPage} totalPages={Math.ceil(totalCount / pageSize)} onPageChange={onPageChange} />
            </div>
          </div>
        </div>
      </div>
      <CreateRoomModal openCreateRoomModal={openCreateRoomModal} setOpenCreateRoomModal={setOpenCreateRoomModal} pageSize={pageSize} onPageChange={onPageChange} />
      <EditRoomModal openEditRoomModal={openEditRoomModal} setOpenEditRoomModal={setOpenEditRoomModal} roomEdit={roomEdit} />
      <DeleteModal openModalDelete={openModalDelete} setOpenModalDelete={setOpenModalDelete} isHotel={false} isRoom={true} idDelete={idDelete} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />
    </div>
  )
}

export default RoomManagement
