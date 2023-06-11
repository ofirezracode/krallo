import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { UserImg } from '../user-img'
import { BsCheckLg } from 'react-icons/bs'


export function PopoverShare({ board, onClose }) {


  const members = board.members

  function toggleMember({ _id, fullname, imgUrl, isOnBoard }) {
    const activityType = isOnBoard ? 'remove-member' : 'add-member'

  }

  return (
    <div>
      <PopoverCmpHeader title="Share Board" onClose={onClose} />
      <div className="popover-members">
        <ul className="members-list clean-list">
          {members.map((member) => {
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
    </div>
  )
}
