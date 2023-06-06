import React, { useState } from 'react'

const DEFAULT_COLORS = [
  { code: '#baf3db', varName: '$green-subtler', colorTitle: 'Subtle Green' },
  { code: '#f8e6a0', varName: '$yellow-subtler', colorTitle: 'Subtle Yellow' },
  { code: '#ffe2bd', varName: '$orange-subtler', colorTitle: 'Subtle Orange' },
  { code: '#ffd2cc', varName: '$red-subtler', colorTitle: 'Subtle Red' },
  { code: '#dfd8fd', varName: '$purple-subtler', colorTitle: 'Subtle Purple' },
  { code: '#4bce97', varName: '$green-subtle', colorTitle: 'Green' },
  { code: '#e2b203', varName: '$yellow-subtle', colorTitle: 'Yellow' },
  { code: '#faa53d', varName: '$orange-subtle', colorTitle: 'Orange' },
  { code: '#f87462', varName: '$red-subtle', colorTitle: 'Red' },
  { code: '#9f8fef', varName: '$purple-subtle', colorTitle: 'Purple' },
  { code: '#1f845a', varName: '$green-bolder', colorTitle: 'Bold Green' },
  { code: '#946f00', varName: '$yellow-bolder', colorTitle: 'Bold Yellow' },
  { code: '#b65c02', varName: '$orange-bolder', colorTitle: 'Bold Orange' },
  { code: '#ca3521', varName: '$red-bolder', colorTitle: 'Bold Red' },
  { code: '#6e5dc6', varName: '$purple-bolder', colorTitle: 'Bold Purple' },
  { code: '#cce0ff', varName: '$blue-subtler', colorTitle: 'Subtle Blue' },
  { code: '#c1f0f5', varName: '$teal-subtler', colorTitle: 'Subtle Teal' },
  { code: '#d3f1a7', varName: '$lime-subtler', colorTitle: 'Subtle Lime' },
  { code: '#fdd0ec', varName: '$magenta-subtler', colorTitle: 'Subtle Magenta' },
  { code: '#dcdfe4', varName: '$gray-subtler', colorTitle: 'Subtle Gray' },
  { code: '#579dff', varName: '$blue-subtle', colorTitle: 'Blue' },
  { code: '#60c6d2', varName: '$teal-subtle', colorTitle: 'Teal' },
  { code: '#94c748', varName: '$lime-subtle', colorTitle: 'Lime' },
  { code: '#e774bb', varName: '$magenta-subtle', colorTitle: 'Magenta' },
  { code: '#8590a2', varName: '$gray-subtle', colorTitle: 'Gray' },
  { code: '#0c66e4', varName: '$blue-bolder', colorTitle: 'Bold Blue' },
  { code: '#1d7f8c', varName: '$teal-bolder', colorTitle: 'Bold Teal' },
  { code: '#5b7f24', varName: '$lime-bolder', colorTitle: 'Bold Lime' },
  { code: '#ae4787', varName: '$magenta-bolder', colorTitle: 'Bold Magenta' },
  { code: '#626f86', varName: '$gray-bolder', colorTitle: 'Bold Gray' },
]

export function ColorPalette({ clrs, activeClr, onColorChange }) {
  const [activeColor, setActiveColor] = useState(activeClr)

  function onColorClick(clr) {
    setActiveColor(clr)
    onColorChange({ color: clr })
  }

  const colors = clrs ? clrs : DEFAULT_COLORS
  return (
    <div className="color-palette">
      <ul className="color-list clean-list">
        {colors.map((clr, i) => (
          <li key={i} className="flex center">
            <button
              className={`${activeColor.code === clr.code ? 'active' : ''}`}
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
