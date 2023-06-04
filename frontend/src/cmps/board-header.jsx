import React, { useState } from 'react'
import { BsPeople, BsStar, BsStarFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { UserImg } from './user-img'
import Ofir from '../assets/img/members/ofir-pic.jpg'
import Etai from '../assets/img/members/etai-pic.jpg'
import Tamar from '../assets/img/members/tamar-pic.jpg'
import { updateBoard } from '../store/board.actions'
import { Popover } from './popover'
import { usePopover } from '../customHooks/usePopover'

export function BoardHeader({ board }) {
  const [popoverProps, onTogglePopover] = usePopover()

  function toggleIsStarred(ev, board) {
    ev.preventDefault()
    board.isStarred = !board.isStarred
    updateBoard(board)
  }

  if (!board) return <div></div>

  return (
    <section>
      <ul className="board-header clean-list flex align-center between">
        <li className="flex align-center">
          <h1 title={board.title}>{board.title}</h1>
          {board.isStarred ? (
            <button
              className="btn-star"
              title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
              onClick={(ev) => toggleIsStarred(ev, board)}
            >
              <BsStarFill className="star-fill" />
            </button>
          ) : (
            <button
              className="btn-star"
              title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
              onClick={(ev) => toggleIsStarred(ev, board)}
            >
              <BsStar className="star-empty" />
            </button>
          )}
          <button onClick={(e) => onTogglePopover(e, 'dummy', 'Change visibility')} title="Change visibility flex align-center between">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5048 5.67168C11.9099 5.32669 11.2374 5.10082 10.5198 5.0267C11.2076 3.81639 12.5085 3 14 3C16.2092 3 18 4.79086 18 7C18 7.99184 17.639 8.89936 17.0413 9.59835C19.9512 10.7953 22 13.6584 22 17C22 17.5523 21.5523 18 21 18H18.777C18.6179 17.2987 18.3768 16.6285 18.0645 16H19.917C19.4892 13.4497 17.4525 11.445 14.8863 11.065C14.9608 10.7218 15 10.3655 15 10C15 9.58908 14.9504 9.18974 14.857 8.80763C15.5328 8.48668 16 7.79791 16 7C16 5.89543 15.1046 5 14 5C13.4053 5 12.8711 5.25961 12.5048 5.67168ZM10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM14 10C14 10.9918 13.639 11.8994 13.0412 12.5984C15.9512 13.7953 18 16.6584 18 20C18 20.5523 17.5523 21 17 21H3C2.44772 21 2 20.5523 2 20C2 16.6584 4.04879 13.7953 6.95875 12.5984C6.36099 11.8994 6 10.9918 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM9.99999 14C12.973 14 15.441 16.1623 15.917 19H4.08295C4.55902 16.1623 7.02699 14 9.99999 14Z"
                fill="currentColor"
              ></path>
            </svg>
            <p>Workspace visible</p>
          </button>
          <button className="btn-fill" title="Board">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                fill="currentColor"
              ></path>
            </svg>
            <p>Board</p>
          </button>
        </li>
        <li className="flex align-center">
          <button title="Filter cards flex align-center">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z"
                fill="currentColor"
              ></path>
            </svg>
            <p>Filter</p>
          </button>
          <span>|</span>
          {/* {board.members.map(member =>
            < img src={member.imgUrl} alt="" />
          )} */}
          <div className="members">
            <img src={Ofir} className="member-img" alt="" />
            <img src={Etai} className="member-img" alt="" />
            <img src={Tamar} className="member-img" alt="" />
          </div>
          {/* <UserImg className="board-members" /> */}
          <button className="btn-fill" title="Share board">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 9.44777 7.61532 10.7518 8.59871 11.6649C5.31433 13.0065 3 16.233 3 20C3 20.5523 3.44772 21 4 21H12C12.5523 21 13 20.5523 13 20C13 19.4477 12.5523 19 12 19H5.07089C5.55612 15.6077 8.47353 13 12 13ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                fill="currentColor"
              ></path>
              <path
                d="M17 14C17 13.4477 17.4477 13 18 13C18.5523 13 19 13.4477 19 14V16H21C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H19V20C19 20.5523 18.5523 21 18 21C17.4477 21 17 20.5523 17 20V18H15C14.4477 18 14 17.5523 14 17C14 16.4477 14.4477 16 15 16H17V14Z"
                fill="currentColor"
              ></path>
            </svg>
            <p>Share</p>
          </button>
          <button className="btn-more" title="Open the board menu">
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </li>
      </ul>
      <Popover {...popoverProps} onClose={onTogglePopover} />
    </section>
  )
}
