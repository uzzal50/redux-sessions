import { createSlice } from '@reduxjs/toolkit'
import { ordered as cakeOrdered } from '../cake/cakeSlice'

const initialState = {
  noOfIcecream: 20,
}

const icecreamSlice = createSlice({
  name: 'icecream',
  initialState,
  reducers: {
    ordered: (state) => {
      state.noOfIcecream--
    },
    restocked: (state, action) => {
      state.noOfIcecream += action.payload
    },
  },
  // extraReducers: {
  //   ['cake/ordered']: (state) => {
  //     state.noOfIcecream--
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state) => {
      state.noOfIcecream--
    })
  },
})
export default icecreamSlice.reducer
export const { ordered, restocked } = icecreamSlice.actions
