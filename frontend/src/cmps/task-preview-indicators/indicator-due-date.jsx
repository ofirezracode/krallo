import React, { useEffect, useState } from 'react'
import { BsClock, BsStop, BsCheck2Square } from 'react-icons/bs'
import { utilService } from '../../services/util.service'

export function IndicatorDueDate({ dueDate, onDateClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [timestamp, setTimestamp] = useState(dueDate.dueDate)
  const [isCompleted, setIsCompleted] = useState(dueDate.isCompleted)

  useEffect(() => {
    setTimestamp(dueDate.dueDate)
    setIsCompleted(dueDate.isCompleted)
  }, [dueDate])

  let indicatorClass
  if (isCompleted) {
    indicatorClass = 'complete'
  } else if (utilService.hasTimestampPassed(timestamp)) {
    indicatorClass = 'overdue'
  }

  function onClicked(e) {
    setIsCompleted((prev) => !prev)
    onDateClick(e)
  }

  return (
    <li className={`indicator-due-date ${indicatorClass}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <span onClick={onClicked} className="flex">
        {isHovered && !isCompleted && <BsStop className="indicator-icon square" />}
        {isHovered && isCompleted && <BsCheck2Square className="indicator-icon square-checked" />}
        {!isHovered && <BsClock className="indicator-icon clock" />}

        <label>{utilService.formatDate(timestamp)}</label>
      </span>
    </li>
  )
}
