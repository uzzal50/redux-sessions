import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  loading: false,
  users: [],
  error: '',
}

//generates pending.fulfilled, and rejected action types
export const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
  return axios // it creates a async logic and returns a promise
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.data.map((user) => user.id))
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.loading = false
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.payload
      state.loading = false
    })
  },
})

export default userSlice.reducer // default exports
