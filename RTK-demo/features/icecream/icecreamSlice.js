const createSlice = require('@reduxjs/toolkit').createSlice

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
})

module.exports = icecreamSlice.reducer
module.exports.icecreamActions = icecreamSlice.actions
