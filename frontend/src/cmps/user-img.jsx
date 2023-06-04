import React from 'react'
import userImg2 from '../assets/img/members/ofir-pic.jpg'

export default function UserImg({ size, hover, userImg }) {
  let imgClasses = ''

  if (!size) {
    imgClasses = 'medium'
  } else {
    imgClasses = size
  }

  if (hover) {
    imgClasses += ' hover'
  }

  return <img className={`user-img ${imgClasses}`} src={userImg2} alt="" title="Ofir Ezra (ofirezra)" />
}
