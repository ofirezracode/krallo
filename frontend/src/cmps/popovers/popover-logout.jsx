import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { useSelector } from 'react-redux'
import { UserImg } from '../user-img'

export function PopoverLogout({ onLogout, onClose }) {
  const user = useSelector((storeState) => storeState.userModule.user)

  return (
    <div className='popover-logout'>
      {/* <PopoverCmpHeader title="ACCOUNT" onClose={onClose} /> */}
      <div className='popover-header-logout'>
        <h5>Account</h5>
      </div>
      <div>
        <div className='popover-logout-container flex'>
          <UserImg size="large" userImg={user.imgUrl} padding={true} />
          <div className='flex column'>
            <span className='fullname'>{user.fullname}</span>
            <span className='email'>{user.email}</span>
          </div>
        </div>
      </div>
      <button className='logout' onClick={onLogout}>Log out</button>

    </div>
  )
}
