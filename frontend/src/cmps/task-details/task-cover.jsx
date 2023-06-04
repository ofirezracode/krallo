import React from 'react'
import { BsSquareHalf } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'

export function TaskCover({ task }) {
  console.log('task', task)
  const coverColor = task.style && task.style.bgColor ? { backgroundColor: task.style.bgColor } : null
  console.log('coverColor', coverColor)
  if (!coverColor) return <div />
  return (
    <section className="task-cover" style={coverColor}>
      <button className="close-button">
        <HiXMark className="close-icon" />
      </button>
      <div className="cover-btn-container">
        <button className="flex center">
          <BsSquareHalf className="box-icon" />
          <p>Cover</p>
        </button>
      </div>
    </section>
  )
}
