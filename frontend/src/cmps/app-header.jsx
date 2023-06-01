import React from 'react'
import { Link } from "react-router-dom";
import logoImg from '../assets/img/krallo-logo-gray.svg'
import { BsBell, BsCircleHalf } from "react-icons/bs";
import UserImg from "./user-img"

export default function AppHeader() {

  return (
    <section className="app-header flex between">
    <div className="gray-logo flex"><img src={logoImg} alt="logo"/>Krallo</div>
    <div className="app-header-links flex">
    <input className="search-input" type="search" id="site-search" placeholder='Search'></input>
    <button className='btn btn-icon' ><BsBell/></button>
    <button className='btn btn-icon' ><BsCircleHalf/></button>
    <Link><UserImg/></Link>
    </div>
    </section>

  )
}
