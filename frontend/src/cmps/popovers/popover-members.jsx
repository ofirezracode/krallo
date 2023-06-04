import React, { useState } from 'react'
import { UserImg } from '../user-img'
import { BsCheckLg } from "react-icons/bs";

export function PopoverMembers({ members }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isMember, setIsMember] = useState(false)

  function toggleMember() {
    setIsMember(!isMember)
}


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
              <button className="user-button flex align-center" onClick={toggleMember}>
                <UserImg userImg={member.imgUrl} size="large" />
                <p className="user-info">{userInfo}</p>
                {!isMember && <span><BsCheckLg/></span>}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}