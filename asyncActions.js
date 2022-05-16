const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunk = require('redux-thunk').default
const axios = require('axios')

const DATA_REQUEST = 'DATA_REQUEST'
const DATA_REQUEST_SUCCESS = 'DATA_REQUEST_SUCCESS'
const DATA_REQUEST_FAIL = 'DATA_REQUEST_FAIL'

const initialState = {
  loading: true,
  data: [],
  error: '',
}

const fetchData = () => {
  return {
    type: DATA_REQUEST,
  }
}

const fetchDataSuccess = (users) => {
  return {
    type: DATA_REQUEST_SUCCESS,
    payload: users,
  }
}

const fetchDataFail = (error) => {
  return {
    type: DATA_REQUEST_FAIL,
    payload: error,
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REQUEST:
      return { ...state, loading: true }
    case DATA_REQUEST_SUCCESS:
      return { ...state, data: action.payload, loading: false }
    case DATA_REQUEST_FAIL:
      return { ...state, error: action.payload }

    default:
      return state
  }
}

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchData())
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const users = res.data.map((item) => item.id)
        dispatch(fetchDataSuccess(users))
      })
      .catch((error) => {
        dispatch(fetchDataFail(error.message))
      })
  }
}

const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
