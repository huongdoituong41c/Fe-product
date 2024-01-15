import { createSlice } from "@reduxjs/toolkit"
import { deleteUser, getAllUsers, getUserById, updateUser } from "../services/User.service"
import { IUser } from "../interfaces/User.interface"
import { ROLE } from "../constants/constant"

interface IUserSlice {
  users: IUser[],
  user: IUser,
  filterUsersData: IUser[],
  userLoading: boolean,
  totalCount: number
}

const initialState: IUserSlice = {
  users: [],
  user: {
    user_id: null,
    first_name: '',
    last_name: '',
    email: '',
    role: ROLE.USER,
    createdAt: '',
    updatedAt: ''
  },
  filterUsersData: [],
  userLoading: false,
  totalCount: 0
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    filterUsers: (state, action) => {
      const keyword = action.payload.toLowerCase();
      if (keyword !== '' && state.users.length > 0) {
        state.filterUsersData = state.users.filter((user: IUser) => user.first_name.toLowerCase().includes(keyword) || user.last_name.toLowerCase().includes(keyword) || user.email.toLowerCase().includes(keyword) || user.role.toLowerCase().includes(keyword));
      } else {
        state.filterUsersData = []
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.userLoading = true;
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.userLoading = false;
      const { data, totalCount } = action.payload
      state.users = data;
      state.totalCount = totalCount;
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.userLoading = false;
    })
    builder.addCase(deleteUser.pending, (state, action) => {
      state.userLoading = true;
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.userLoading = false;
      state.users = state.users.filter((user: IUser) => user.user_id !== Number(action.payload));
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.userLoading = false;
    })
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.user = action.payload;
    })
    builder.addCase(updateUser.pending, (state, action) => {
      state.userLoading = true;
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.userLoading = false;
      const userUpdate = action.payload;
      const index = state.users.findIndex((user: IUser) => user.user_id === userUpdate.user_id);
      if (index !== -1) {
        state.users[index] = userUpdate;
      }
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.userLoading = false;
    })
  },
})

export const { filterUsers } = userSlice.actions;
export default userSlice.reducer
