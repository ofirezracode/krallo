import React from 'react'
import userImg from "../assets/img/ofir.png"

export default function UserImg() {
  return (
    <button className='user-img'><img src={userImg} alt="" /></button>
  )
}
