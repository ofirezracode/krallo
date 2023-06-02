import React from 'react'
import userImg from "../assets/img/members/ofir-pic.jpg"

export default function UserImg({ size, hover }) {
  let imgClasses = ''

  if (!size) {
    imgClasses = 'medium'
  } else {
    imgClasses = size
  }

  if (hover) {
    imgClasses += ' hover'
  }

  return (
    <img className={`user-img ${imgClasses}`} src={userImg} alt="" title='Ofir Ezra (ofirezra)' />
  )
}
