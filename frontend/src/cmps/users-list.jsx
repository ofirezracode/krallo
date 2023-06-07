import React from 'react'
import { UserImg } from './user-img'

export function UsersList({ users, size, hover, padding }) {
  if (!users) return <div />
  return (
    <ul className="users-list clean-list flex">
      {users.map((user) => (
        <li key={user._id}>
          <UserImg userImg={user.imgUrl} size={size} hover={hover} padding={padding} />
        </li>
      ))}
    </ul>
  )
}
