import React from 'react'
import GroupPreview from './group-preview'

function GroupList({ groups }) {
  return (
    <ul className="group-list clean-list flex">
      {groups.map((group) => (
        <li key={group._id}>
          <GroupPreview group={group}></GroupPreview>
        </li>
      ))}
    </ul>
  )
}

export default GroupList
