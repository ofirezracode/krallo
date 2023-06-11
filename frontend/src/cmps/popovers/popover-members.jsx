import React, { useEffect, useState } from 'react'
import { UserImg } from '../user-img'
import { BsCheckLg } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverMembers({ members, taskMembers, onHandleTaskMembers, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')

  const updatedMembers = members.map((member) => {
    const isOnBoard = taskMembers.some((taskMember) => taskMember._id === member._id)
    return { ...member, isOnBoard }
  })

  function toggleMember({ _id, fullname, imgUrl, isOnBoard }) {
    console.log('membertask',_id);
    const activityType = isOnBoard ? 'remove-member' : 'add-member'
    onHandleTaskMembers(activityType, { _id, fullname, imgUrl })
  }

  return (
    <section>
      <PopoverCmpHeader title="Members" onClose={onClose} />
      <div className="popover-members">
        <input className='input' type="text" value={searchTerm} onChange={setSearchTerm} placeholder="Search members" />
        <h4 className="members-title">Board members</h4>
        <ul className="members-list clean-list">
          {updatedMembers.map((member) => {
            const userInfo = `${member.fullname} (${member.email ? member.email : ''})`
            return (
              <li key={member._id}>
                <button className="user-button flex align-center" onClick={() => toggleMember(member)}>
                  <UserImg userImg={member.imgUrl} size="medium" />
                  <p className="user-info">{userInfo}</p>
                  {member.isOnBoard && (
                    <span>
                      <BsCheckLg />
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
