const { default: axios } = require('axios')

const createSlice = require('@reduxjs/toolkit').createSlice
const createAsyncThunk = require('@reduxjs/toolkit').createAsyncThunk

const initialState = {
  loading: false,
  users: [],
  error: '',
}

//generates pending.fulfilled, and rejected action types
const fetchUsers = createAsyncThunk('user/fetchUsers', () => {
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

module.exports = userSlice.reducer // default exports
module.exports.fetchUsers = fetchUsers //name exports
