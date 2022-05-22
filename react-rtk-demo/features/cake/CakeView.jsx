import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './cakeSlice'

const CakeView = () => {
  const noOfCakes = useSelector((state) => state.cake.noOfcakes)
  const dispatch = useDispatch() // returns  reference tto dipacth fn
  return (
    <div>
      <h2>No ofcakes - {noOfCakes} </h2>
      <button onClick={() => dispatch(ordered())}>order cake</button>
      <button onClick={() => dispatch(restocked(20))}>Restock cakes</button>
    </div>
  )
}

export default CakeView
