import React from 'react'
import { HiXMark } from 'react-icons/hi2'
import { BsChevronLeft } from 'react-icons/bs'

export function PopoverCmpHeader({ title, onClose, onReturn }) {
  return (
    <header className="popover-cmp-header">
      {onReturn && <BsChevronLeft className="return-icon" onClick={onReturn} />}
      <h3>{title}</h3>
      <HiXMark onClick={onClose} />
    </header>
  )
}
