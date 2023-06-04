import React from 'react'
import { HiXMark } from 'react-icons/hi2'

export function AddCloseButtons({ btnText, onClose, isVisible }) {
  const visibleClass = isVisible ? 'visible' : 'hidden'
  return (
    <div className={`add-close-buttons flex align-center ${visibleClass}`}>
      <button className="add-button">{btnText}</button>
      <button onClick={onClose} className="close-button flex align-center">
        <HiXMark />
      </button>
    </div>
  )
}