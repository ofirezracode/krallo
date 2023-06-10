import React from 'react'
import { colorService } from '../../services/color.service'
import { BsCheckLg } from 'react-icons/bs'

export function ColorsList({ onSetBoardBg, setSelectedImg, selectedImg }) {
  const colors = colorService.getBgColors()

  function handleChange(url, ev) {
    onSetBoardBg(url, ev)
    setSelectedImg(url)
  }

  return (
    <ul className="colors-list clean-list">
      {colors.map((color, idx) => (
        <li
          key={idx}
          className={`flex justify-center column ${selectedImg === color.imgUrl ? 'selected' : ''}`}
          onClick={(ev) => handleChange(color.imgUrl, ev)}
        >
          <div className="bg-img" style={{ background: `url(${color.imgUrl}) center center / cover` }}>
            <span className="emoji">{color.emoji}</span>
            {selectedImg === color.imgUrl && (
              <span className="selected-img">
                <BsCheckLg />
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
