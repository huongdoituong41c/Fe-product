import { useEffect, useState } from "react"
import { Pagination, Table } from "flowbite-react"
import Header from "../../layouts/header"
import Navbar from "../../layouts/navbar"
import {
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai"
import Footer from "../../layouts/footer"
import Banner from "../../layouts/banner"
import EditUserModal from "../../components/editUserModal"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../../services/User.service"
import { AppDispatch, RootState } from "../../store"
import DeleteUserModal from "../../components/deleteUser"
import { IUser } from "../../interfaces/User.interface"
import { filterUsers } from "../../redux/userSlice"
import { useSearchParams } from "react-router-dom"

const AdminUser = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { users, filterUsersData, totalCount } = useSelector((state: RootState) => state.user);

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openEditModal, setOpenEditUserModal] = useState<boolean>(false)
  const [userEdit, setUserEdit] = useState<IUser>();
  const [idDelete, setIdDelete] = useState<number>();
  const [keyword, setKeyword] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const onPageChange = (page: number) => {
    setCurrentPage(page)
    setSearchParams({ page: page.toString(), limit: pageSize.toString() })
  };

  useEffect(() => {
    dispatch(getAllUsers({ page: currentPage, limit: pageSize }))
  }, [dispatch, currentPage])

  const handleOpenEditUserModal = (user: IUser) => {
    setUserEdit(user);
    setOpenEditUserModal(true);
  }

  const handleOpenDeleteUserModal = (id: number) => {
    setIdDelete(id);
    setOpenDeleteModal(true);
  }

  const handleSearchUser = (e: any) => {
    const text = e.target.value;
    setKeyword(text);
    dispatch(filterUsers(text));
  }

  const checkData = () => {
    return filterUsersData && users && filterUsersData.length > 0 ? filterUsersData : users;
  }

  const onChangeLimit = (e: any) => {
    let pageSize = e.target.value;
    setPageSize(pageSize)
    onPageChange(1)
    setSearchParams({ page: currentPage.toString(), limit: pageSize.toString() })
    dispatch(getAllUsers({ page: currentPage, limit: pageSize }))
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
    <>
      <Header />
      <Navbar />
      <Banner />
      <div className="mt-5 flex justify-center rounded-md">
        <div className="mt-5 px-4 py-4 bg-white w-[1350px]">
          <div className="text-center">
            <h6 className="text-center px-3 relative inline-block uppercase bg-white text-[#86B817] text-[1rem] mt-0 mb-2 font-extrabold leading-[1.2]">
              ミ★Hotel★彡
            </h6>
            <h1 className="mb-5 text-[2.5rem] mt-0 font-extrabold leading-[1.2] text-[#2C3E50]">
              User Management
            </h1>
          </div>
          <div className="grid grid-cols-3 justify-end mb-7">
            <h1 className="col-span-1 text-3xl pl-6 text-black font-semibold">
              All User
            </h1>
            <div className="col-span-1">
              <input
                placeholder="Search"
                className="bg-gray-200 h-10 px-6 rounded-full w-full mx-3"
                value={keyword}
                onChange={(e: any) => handleSearchUser(e)}
              />
            </div>

          </div>
          <Table hoverable className="shadow-lg">
            <Table.Head className="py-25">
              <Table.HeadCell className="text-center w-1/5">
                FIRST NAME
              </Table.HeadCell>
              <Table.HeadCell className="text-center w-1/5">LAST NAME</Table.HeadCell>
              <Table.HeadCell className="text-center w-1/5">EMAIL</Table.HeadCell>
              <Table.HeadCell className="text-center w-1/5">ROLE</Table.HeadCell>
              <Table.HeadCell className="text-center w-1/5">ACTION</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {checkData().map((user: IUser) => (
                <Table.Row
                  key={user.user_id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="text-center font-semibold">
                    {user.first_name}
                  </Table.Cell>
                  <Table.Cell className="text-center font-semibold">
                    {user.last_name}
                  </Table.Cell>
                  <Table.Cell className="text-center font-semibold">{user.email}</Table.Cell>
                  <Table.Cell className="text-center font-semibold">{user.role}</Table.Cell>
                  <Table.Cell className="text-center font-semibold">
                    <div className="flex space-x-2 justify-center">
                      <button
                        className="text-blue-500"
                        onClick={() => {
                          handleOpenEditUserModal(user);
                        }}
                      >
                        <AiOutlineEdit />
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => {
                          handleOpenDeleteUserModal(Number(user.user_id))
                        }}
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
      <EditUserModal
        openEditHotelModal={openEditModal}
        setOpenEditHotelModal={setOpenEditUserModal}
        userEdit={userEdit}
      />
      <DeleteUserModal openDeleteModal={openDeleteModal} setOpenDeleteModal={setOpenDeleteModal} idDelete={idDelete} onPageChange={onPageChange} />
      <Footer></Footer>
    </>
  )
}

export default AdminUser
