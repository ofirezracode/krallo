import React, { useState } from 'react'

export function PopoverCover({ colors, coverStyle, onStyleChange }) {
  const [activeColor, setActiveColor] = useState(coverStyle ? coverStyle.bgColor : '')
  const [activeType, setActiveType] = useState(coverStyle ? coverStyle.type : '')

  function onColorClick(bgColor) {
    setActiveColor(bgColor)
    onStyleChange({ bgColor, type: activeType })
  }

  function onTypeClick(type) {
    setActiveType(type)
    onStyleChange({ bgColor: activeColor, type })
  }

  return (
    <div className="popover-cover">
      <h4 className="popover-title">Size</h4>
      <ul className="sizes-list clean-list">
        <li>
          <button onClick={() => onTypeClick('half')} className={`size-half ${activeType === 'half' ? 'active' : ''}`} />
        </li>
        <li>
          <button onClick={() => onTypeClick('full')} className={`size-full ${activeType === 'full' ? 'active' : ''}`} />
        </li>
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
