import React, { useState } from 'react'
import { PhotosList } from '../board-menu/photos-list'
import { colorService } from '../../services/color.service'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverCover({ coverStyle, onStyleChange, onClose }) {
  const [activeColor, setActiveColor] = useState(coverStyle ? coverStyle.bgColor : '')
  const [activeImg, setActiveImg] = useState(coverStyle ? coverStyle.imgUrl : '')
  const [activeType, setActiveType] = useState(coverStyle ? coverStyle.type : '')

  function onColorClick(bgColor) {
    setActiveColor(bgColor)
    setActiveImg('')
    if (!activeType) setActiveType('half')
    onStyleChange({ bgColor, type: activeType ? activeType : 'half' })
  }

  function onImgClick(imgUrls) {
    setActiveColor('')
    setActiveImg(imgUrls.small)
    if (!activeType) setActiveType('half')
    onStyleChange({ imgUrl: imgUrls.small, type: activeType ? activeType : 'half' })
  }

  function onTypeClick(type) {
    setActiveType(type)
    let activeBackground = activeColor ? { bgColor: activeColor } : { imgUrl: activeImg }
    onStyleChange({ ...activeBackground, type })
  }

  function onRemoveCover() {
    setActiveColor('')
    setActiveImg('')
    setActiveType('')
    onStyleChange({})
  }

  let backgroundStyle = {}
  if (activeColor) {
    backgroundStyle = { backgroundColor: activeColor }
  } else if (activeImg) {
    backgroundStyle = { background: `url(${activeImg}) center center / cover` }
  }

  let colorClass = 'light-background'
  if (backgroundStyle.backgroundColor) {
    if (colorService.isColorDark(backgroundStyle.backgroundColor)) colorClass = 'dark-background'
  }

  return (
    <div className="popover-cover">
      <PopoverCmpHeader title="Cover" onClose={onClose} />
      <h4 className="popover-title">Size</h4>
      <ul className="sizes-list clean-list">
        <li>
          <button onClick={() => onTypeClick('half')} className={`size-half flex column ${activeType === 'half' ? 'active' : ''}`}>
            <div className="part-cover" style={backgroundStyle}></div>
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
          <button
            onClick={() => onTypeClick('full')}
            className={`size-full ${activeType === 'full' ? 'active' : ''}`}
            style={backgroundStyle}
          >
            <div className={`parts-container ${colorClass}`}>
              <div className={`part-line-longer`}></div>
              <div className={`part-line-long`}></div>
            </div>
          </button>
        </li>
      </ul>
      <button onClick={onRemoveCover} className="remove-cover-btn">
        Remove Cover
      </button>
      <h4 className="popover-title">Colors</h4>
      <ul className="cover-colors-list clean-list">
        {colorService.possibleCoverColors.map((color, index) => {
          return (
            <li className={`${activeColor === color ? 'active' : ''}`} key={index}>
              <button onClick={() => onColorClick(color)} style={{ backgroundColor: color }}></button>
            </li>
          )
        })}
      </ul>
      <h4 className="popover-title unsplash">Photos from Unsplash</h4>
      <div className="cover-photos-list">
        <PhotosList onUpdateBoardBg={onImgClick} resultsAmount={6} />
      </div>
    </div>
  )
}
