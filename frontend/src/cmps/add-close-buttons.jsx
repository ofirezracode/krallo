import React from 'react'
import { HiXMark } from 'react-icons/hi2'

function AddCloseButtons({ btnText, onClose, isVisible }) {
  console.log('isVisible', isVisible)
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

export default AddCloseButtons
