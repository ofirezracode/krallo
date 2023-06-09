import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { useSelector } from 'react-redux'
import { UserImg } from '../user-img'

export function PopoverLogout({ onLogout, onClose }) {
  const user = useSelector((storeState) => storeState.userModule.user)

  console.log('user',user);
  return (
    <div>
      <PopoverCmpHeader title="ACCOUNT" onClose={onClose} />
      <div>
      <div className='popover-logout-container flex'>
      <UserImg size="small" hover="circle" userImg={user.imgUrl} padding={true} />
        <span className='fullname'>{user.fullname}</span>
        {/* <span className='email'>{user.email}</span> */}
      </div>
      </div>
      <button className='logout' onClick={onLogout}>Log out</button>

    </div>
  )
}
