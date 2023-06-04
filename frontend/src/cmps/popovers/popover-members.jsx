import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import UserImg from '../user-img'

function PopoverMembers({ members }) {
  const [searchTerm, setSearchTerm] = useState('')
  console.log('members', members)
  return (
    <div className="popover-members">
      <input type="text" value={searchTerm} onChange={setSearchTerm} placeholder="Search members" />
      <p>Board members</p>
      <ul className="members-list clean-list">
        {members.map((member) => {
          const userInfo = `${member.fullname} (${member.email ? member.email : ''})`
          return (
            <li key={member._id}>
              <button className="user-button flex align-center">
                <UserImg userImg={member.imgUrl} size="large" />
                <p className="user-info">{userInfo}</p>
                <BsPencil className="edit-icon" />
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PopoverMembers
