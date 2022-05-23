import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'
import axios from 'axios'
import { openModal } from '../modal/modalSlice'

const initialState = {
  cartItems: [],
  amount: 9,
  total: 0,
  isLoading: true,
}

const url = 'https://course-api.com/react-usereducer-cart-project'

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkApi) => {
    try {
      console.log(thunkApi)
      console.log(thunkApi.getState())
      // thunkApi.dispatch(openModal()) //even this featuires is not available in this cart
      const res = await axios.get(url)
      return res.data
    } catch (error) {
      return thunkApi.rejectWithValue('something went wrong')
    }
    // return fetch(url)
    //   .then((res) => res.json())
    //   .catch((err) => console.log(err))
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      console.log(action)
      const id = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== id)
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)

      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload)
      cartItem.amount = cartItem.amount - 1
    },
    calculatetotal: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action)
      state.isLoading = true
    },
  },
})

export default cartSlice.reducer
export const { clearCart, removeItem, increase, decrease, calculatetotal } =
  cartSlice.actions
