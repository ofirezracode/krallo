import React from 'react'

export function UserImg({ size, hover, userImg, padding }) {
  let imgClasses = ''

  if (!size) {
    imgClasses = 'medium'
  } else {
    imgClasses = size
  }

  if (hover) {
    imgClasses += ` ${hover}`
  }

  if (padding) {
    imgClasses += ' padding'
  } else {
    imgClasses += ' no-padding'
  }

  return (
    <div className="img-container">
      {userImg && <img className={`user-img ${imgClasses}`} src={userImg} alt="" title="Ofir Ezra (ofirezra)" />}
      {!userImg && <div className={`user-img ${imgClasses}`} style={{ backgroundColor: '#94c748' }} />}
    </div>
  )
}
