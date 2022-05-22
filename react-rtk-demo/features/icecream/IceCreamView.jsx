import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ordered, restocked } from './icecreamSlice'

const IceCreamView = () => {
  const numIcecream = useSelector((state) => state.icecream.noOfIcecream)
  const dispatch = useDispatch()
  const [value, setValue] = useState(1)
  return (
    <div>
      <h2>No of Icecream - {numIcecream} </h2>
      <button onClick={() => dispatch(ordered())}>order Icecream</button>
      <input
        type='number'
        name='value'
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(restocked(value))}>
        Restock Icecream
      </button>
    </div>
  )
}

export default IceCreamView
