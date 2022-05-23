import './App.css'
import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { calculatetotal, getCartItems } from './features/cart/cartSlice'
import { useEffect } from 'react'
import Modal from './components/Modal'

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)
  const dispacth = useDispatch()

  useEffect(() => {
    dispacth(calculatetotal())
  }, [cartItems])

  useEffect(() => {
    dispacth(getCartItems('random'))
  }, [])

  if (isLoading) {
    return (
      <div className='loading'>
        <h4>Loading...</h4>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      {isOpen && <Modal />}

      <CartContainer />
    </main>
  )
}

export default App
