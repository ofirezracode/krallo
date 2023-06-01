import React from 'react'
import logoImg from '../assets/img/krallo-logo-gray.svg'
export default function AppHeader() {
  return (
    <div className='gray-logo flex'><img src={logoImg} alt="logo" />Krallo</div>
  )
}
