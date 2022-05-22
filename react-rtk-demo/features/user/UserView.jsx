import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from './userSlice'

const UserView = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users)
  console.log(user)
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <div>
      <h2>List of Users</h2>
      {user.loading && <div>Loading....</div>}
      {user.error && user.loading ? <div>Error : {user.error} </div> : null}
      {user.users ? (
        <ul>
          {user.users.map((user) => {
            console.log(user)
            return <li key={user.id}>{user}</li>
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default UserView
