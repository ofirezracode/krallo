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

  function onRemoveCover() {
    onStyleChange({})
  }

  const colorStyle = { backgroundColor: activeColor }

  return (
    <div className="popover-cover">
      <h4 className="popover-title">Size</h4>
      <ul className="sizes-list clean-list">
        <li>
          <button onClick={() => onTypeClick('half')} className={`size-half flex column ${activeType === 'half' ? 'active' : ''}`}>
            <div className="part-cover" style={colorStyle}></div>
            <div className="parts-container">
              <div className="part-line-longer"></div>
              <div className="part-line-long"></div>
              <div className="block-parts-container">
                <div className="part-block"></div>
                <div className="part-block"></div>
              </div>
              <div className="part-circle"></div>
            </div>
          </button>
        </li>
        <li>
          <button onClick={() => onTypeClick('full')} className={`size-full ${activeType === 'full' ? 'active' : ''}`} style={colorStyle}>
            <div className="parts-container">
              <div className={`part-line-longer d${activeColor.substring(1)}`}></div>
              <div className={`part-line-long d${activeColor.substring(1)}`}></div>
            </div>
          </button>
        </li>
      </ul>
      <button onClick={onRemoveCover} className="remove-cover-btn">
        Remove Cover
      </button>
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
