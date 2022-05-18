const redux = require('redux')
const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const produce = require('immer').produce
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()

const BOOK_ORDERED = 'BOOK_ORDERED'
const BOOK_RESTOCK = 'BOOK_RESTOCK'
const BOOKMARK_ORDERED = 'BOOKMARK_ORDERED'
const BOOKMARK_RESTOCKED = 'BOOKMARK_RESTOCKED'

const orderBook = () => {
  return {
    type: BOOK_ORDERED,
    quantity: 10,
  }
}

const restockBook = (qty) => {
  return {
    type: BOOK_RESTOCK,
    payload: qty,
  }
}

const buyBookMark = (qty) => {
  return {
    type: BOOKMARK_ORDERED,
    payload: qty,
  }
}

const restockBookMark = (qty) => {
  return {
    type: BOOKMARK_RESTOCKED,
    payload: qty,
  }
}

const bookInitialState = {
  noOfBooks: 10,
}

const bookmarkInitialState = {
  noOfBookMark: 50,
}

const bookReducer = (state = bookInitialState, action) => {
  switch (action.type) {
    case BOOK_ORDERED:
      return { ...state, noOfBooks: state.noOfBooks - 1 }
    case BOOK_RESTOCK:
      return { ...state, noOfBooks: state.noOfBooks + action.payload }

    default:
      return state
  }
}

const bookMarkReducer = (state = bookmarkInitialState, action) => {
  switch (action.type) {
    case BOOKMARK_ORDERED:
      return {
        ...state,
        noOfBookMark: state.noOfBookMark - 1,
      }

    case BOOKMARK_RESTOCKED:
      return {
        ...state,
        noOfBookMark: state.noOfBookMark + action.payload,
      }
    default:
      return state
  }
}

const rootReducer = redux.combineReducers({
  books: bookReducer,
  bookMark: bookMarkReducer,
})

// store.dispatch(orderBook())
// store.dispatch(orderBook())
// store.dispatch(orderBook())

// store.dispatch(restockBook(90))
// const actions = bindActionCreators({ orderBook, restockBook }, store.dispatch)

const store = createStore(rootReducer, applyMiddleware(logger))
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(() => {
  // console.log('updated state', store.getState())
})

store.dispatch(orderBook())
store.dispatch(orderBook())
store.dispatch(restockBook(10))
store.dispatch(buyBookMark())
store.dispatch(buyBookMark())
store.dispatch(buyBookMark())
store.dispatch(restockBookMark(50))

unsubscribe()
