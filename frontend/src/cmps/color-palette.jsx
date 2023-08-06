import React, { useEffect, useState } from 'react'
import { colorService } from '../services/color.service'

export function ColorPalette({ clrs, activeClr, onColorChange }) {
  const [activeColor, setActiveColor] = useState(activeClr)

  useEffect(() => setActiveColor(activeClr), [activeClr])

  function onColorClick(clr) {
    setActiveColor(clr)
    onColorChange({ color: clr })
  }

  const colors = clrs ? clrs : colorService.getDefaultColors()
  return (
    <div className="color-palette">
      <ul className="color-list clean-list">
        {colors.map((clr, i) => (
          <li key={i} className="flex center">
            <button
              className={`${activeColor && activeColor.code === clr.code ? 'active' : ''}`}
              onClick={() => onColorClick(clr)}
              style={{ backgroundColor: clr.code }}
              title={`${clr.colorTitle}`}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  )
}
