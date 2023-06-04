import React from 'react'
import { BsSquareHalf } from 'react-icons/bs'
import { HiXMark } from 'react-icons/hi2'
import { usePopover } from '../../customHooks/usePopover'

export function TaskCover({ task }) {
  const coverColor = task.style && task.style.bgColor ? { backgroundColor: task.style.bgColor } : null

  const [popoverProps, onTogglePopover] = usePopover()
  if (!coverColor) return <div />
  return (
    <section className="task-cover" style={coverColor}>
      <div className="cover-btn-container">
        <button className="flex center">
          <BsSquareHalf onClick={(e) => onOpenPopover(e, { attachment: board.attachment }, 'cover', 'Cover')} className="box-icon" />
          <p>Cover</p>
        </button>
      </div>
    </section>
  )
}
