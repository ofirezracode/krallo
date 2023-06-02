import React from 'react'
import userImg from "../assets/img/ofir.png"

export default function UserImg({size ,hover}) {
  let imgClasses =''

  if(!size){
    imgClasses = 'medium'
  } else{
    imgClasses = size
  }

  if(hover){
    imgClasses += ' hover'
  }

  return (
    <img className={imgClasses} src={userImg} alt="" />
  )
}
