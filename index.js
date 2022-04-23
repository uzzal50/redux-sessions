const BOOK_ORDERED = 'BOOK_ORDERED'

const buyBook = () => {
  return {
    type: BOOK_ORDERED,
    quantity: 10,
  }
}

const initialStale = {
  noOfBooks: 10,
}

const reducer = (state = initialStale, action) => {
  switch (action.type) {
    case BOOK_ORDERED:
      return { ...state, noOfBooks: state.noOfBooks - 1 }
    default:
      return state
  }
}
