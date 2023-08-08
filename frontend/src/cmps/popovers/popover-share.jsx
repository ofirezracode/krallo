import React, { useEffect, useState } from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { UserImg } from '../user-img'
import { BsCheckLg } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { loadUsers } from '../../store/user.actions'

export function PopoverShare({ board, onHandleBoardMembers, onMemberDelete, onClose }) {
  const users = useSelector((storeState) => storeState.userModule.users)
  const [members, setMembers] = useState(board.members)

  const newUsers = users.map((user) => {
    const isOnBoard = members ? members.some((member) => member._id === user._id) : false
    return { ...user, isOnBoard }
  })

  useEffect(() => {
    loadUsers()
  }, [])

  function toggleMember(user) {
    const activityType = user.isOnBoard ? 'remove-member-board' : 'add-member-board'
    onHandleBoardMembers(user, activityType)
    onMemberDelete(board, user)
  }

  return (
    <div>
      <PopoverCmpHeader title="Share Board" onClose={onClose} />
      <div className="popover-members">
        <ul className="members-list clean-list">
          {newUsers.map((user) => {
            const userInfo = `${user.fullname} (${user.email ? user.email : ''})`
            return (
              <li key={user._id}>
                <button className="user-button flex align-center" onClick={() => toggleMember(user)}>
                  <UserImg user={user} size="medium" />
                  <p className="user-info">{userInfo}</p>
                  {user.isOnBoard && (
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
