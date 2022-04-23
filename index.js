const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators

const BOOK_ORDERED = 'BOOK_ORDERED'
const BOOK_RESTOCK = 'BOOK_RESTOCK'

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

const initialStale = {
  noOfBooks: 10,
}

const reducer = (state = initialStale, action) => {
  switch (action.type) {
    case BOOK_ORDERED:
      return { ...state, noOfBooks: state.noOfBooks - 1 }
    case restockBook: {
      return { ...state, noOfBooks: state.noOfBooks + action.payload }
    }
    default:
      return state
  }
}

const store = createStore(reducer)
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(() =>
  console.log('updated state', store.getState())
)

// store.dispatch(orderBook())
// store.dispatch(orderBook())
// store.dispatch(orderBook())

// store.dispatch(restockBook(90))
const actions = bindActionCreators({ orderBook, restockBook }, store.dispatch)

actions.orderBook()
actions.orderBook()
actions.orderBook()
actions.restockBook(56)

unsubscribe()
