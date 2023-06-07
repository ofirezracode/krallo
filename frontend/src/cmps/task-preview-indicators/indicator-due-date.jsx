import React, { useState } from 'react'
import { BsClock, BsSquare, BsStop } from 'react-icons/bs'
import { utilService } from '../../services/util.service'

export function IndicatorDueDate({ dueDate }) {
  const [isHovered, setIsHovered] = useState(false)
  let indicatorClass
  if (dueDate.isCompleted) {
    indicatorClass = 'complete'
  } else if (utilService.hasTimestampPassed(dueDate.timestamp)) {
    indicatorClass = 'overdue'
  }
  return (
    <li className={`indicator-due-date ${indicatorClass}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <span className="flex">
        {isHovered && <BsStop className="indicator-icon square" />}
        {!isHovered && <BsClock className="indicator-icon clock" />}

        <label>{utilService.formatDate(dueDate.timestamp)}</label>
      </span>
    </li>
  )
}
