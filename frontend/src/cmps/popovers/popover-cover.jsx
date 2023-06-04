import React, { useState } from 'react'

export function PopoverCover({ colors, coverStyle, onStyleChange }) {
  const [activeColor, setActiveColor] = useState(coverStyle ? coverStyle.bgColor : '')
  const [activeType, setActiveType] = useState(coverStyle ? coverStyle.type : '')
  function onColorClick(clr) {
    setActiveColor(clr)
  }

  return (
    <div className="popover-cover">
      <h4 className="popover-title">Size</h4>
      <ul className="sizes-list clean-list">
        <li className={`size-half ${activeType === 'half' ? 'active' : ''}`}></li>
        <li className={`size-full ${activeType === 'full' ? 'active' : ''}`}></li>
      </ul>
      <h4 className="popover-title">Colors</h4>
      <ul className="colors-list clean-list">
        {colors.map((color, index) => {
          return (
            <li className={`${activeColor === color ? 'active' : ''}`} key={index}>
              <button onClick={() => onColorClick(color)} style={{ backgroundColor: color }}></button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
