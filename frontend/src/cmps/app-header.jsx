import React from 'react'
import { Link } from "react-router-dom";
import logoImg from '../assets/img/krallo-logo-gray.svg'
import { BsBell, BsCircleHalf, BsSearch } from "react-icons/bs";
import UserImg from "./user-img"

export default function AppHeader() {

  return (
    <ul className="app-header flex between clean-list">
      <li>
        <div className="gray-logo flex"><img src={logoImg} alt="logo" />Krallo</div>
      </li>
      <li>
        <div className="app-header-links flex">
          <input className="search-input" type="search" id="site-search" placeholder='Search'/>
          <button className='btn-search'><BsSearch/></button>
          <button className='btn btn-icon' ><BsBell /></button>
          <button className='btn btn-icon' ><BsCircleHalf /></button>
          <Link><UserImg /></Link>
        </div>
      </li>
    </ul>
  )
}
