import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { UserImg } from '../user-img'
import { BsCheckLg } from "react-icons/bs";

export function PopoverMembers({ members }) {
  const [searchTerm, setSearchTerm] = useState('')
  console.log('members', members)
  return (
    <div className="popover-members">
      <input type="text" value={searchTerm} onChange={setSearchTerm} placeholder="Search members" />
      <h4 className='members-title'>Board members</h4>
      <ul className="members-list clean-list">
        {members.map((member) => {
          const userInfo = `${member.fullname} (${member.email ? member.email : ''})`
          return (
            <li key={member._id}>
              <button className="user-button flex align-center">
                <UserImg userImg={member.imgUrl} size="large" />
                <p className="user-info">{userInfo}</p>
                <span><BsCheckLg/></span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}