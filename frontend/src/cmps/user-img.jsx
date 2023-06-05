import React from 'react'


export function UserImg({ size, hover, userImg }) {
  let imgClasses = ''

  if (!size) {
    imgClasses = 'medium'
  } else {
    imgClasses = size
  }

  if (hover) {
    imgClasses += ' hover'
  }

  return <img className={`user-img ${imgClasses}`} src={userImg} alt="" title="Ofir Ezra (ofirezra)" />
}
