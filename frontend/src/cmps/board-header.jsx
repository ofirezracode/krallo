import React from 'react'
import { BsPeople, BsStar, BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import UserImg from "./user-img"

function BoardHeader({ board }) {


  return (
    <section>
      <ul className="board-header clean-list flex">
        <li>
        <h1>{board.title}</h1>
        </li>
        <li className='board-links flex align-center'>
        {board.isStarred ? <BsStarFill className="star-fill" /> : <BsStar className="star-empty" strokeWidth={'1px'} />}
      <Link><BsPeople/></Link>
      <button>Boards</button>
        </li>
        <li>
        <Link>bell</Link>
      <button>Filter</button>
        </li>
        <li><button><UserImg/></button>
      <button>Share</button>
      <Link>...</Link></li>
      </ul>
    </section>
  )
}

export default BoardHeader
