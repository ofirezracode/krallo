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

  console.log('userImg', userImg)
  return (
    <div className="img-container">
      <img className={`user-img ${imgClasses}`} src={userImg} alt="" title="Ofir Ezra (ofirezra)" />
    </div>
  )
}
