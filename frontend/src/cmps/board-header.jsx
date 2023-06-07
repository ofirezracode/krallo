import React, { useEffect, useState } from 'react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { updateBoard } from '../store/board.actions'
import { Popover } from './popover'
import { usePopover } from '../customHooks/usePopover'
import { Loader } from './loader'
import FilterIcon from '../assets/img/svg/filter-icon.svg'
import { useSelector } from 'react-redux'

export function BoardHeader({ onChangeTitle }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const [title, setTitle] = useState(board ? board.title : '')
  const handleFocus = (ev) => ev.target.select()

  const [popoverProps, onTogglePopover] = usePopover()
  const members = board ? board.members : []

  useEffect(() => {
    setTitle(board.title)
  }, [board])

  async function onToggleIsStarred(ev, board) {
    try {
      ev.preventDefault()
      const boardToToggle = await { ...board, isStarred: !board.isStarred }
      updateBoard(boardToToggle)
    } catch (err) {
      console.log('err', err)
    }
  }

  function handleChange(ev) {
    setTitle(ev.target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onChangeTitle(title)
  }

  console.log(title)
  let inputWidth = 0
  for (let i = 0; i < title.length; i++) {
    const charCode = title.charCodeAt(i)
    if (charCode >= 65 && charCode <= 90) { // uppercase character
      inputWidth += 13
    } else if (charCode >= 97 && charCode <= 122) { // lowercase character
      inputWidth += 10
    } else { // punctuation, space, and other symbols
      inputWidth += 5
    }
  }

  if (!board) return <Loader />
  return (
    <section className='board-header-container'>
      <div className='blur-header'></div>
      <ul className="board-header clean-list flex align-center between">
        <li className="flex align-center">
          <div className='board-name'>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={title}
                onChange={handleChange}
                style={{ width: `${inputWidth}px` }} // Set the width dynamically
                // style={{ width: `${title.length * 9}px` }} // Set the width dynamically
                onFocus={handleFocus} />
            </form>
          </div>

          <button
            className="btn-star"
            title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
            onClick={(ev) => onToggleIsStarred(ev, board)}>
            {board.isStarred ?
              (<BsStarFill className="star-fill" />) : (<BsStar className="star-empty" />)}
          </button>
        </li>
        <li className="flex align-center">
          <button title="Filter cards" className='flex align-center'>
            {/* <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.61799 6C3.87461 6 3.39111 6.78231 3.72356 7.44721L3.99996 8H20L20.2763 7.44721C20.6088 6.78231 20.1253 6 19.3819 6H4.61799ZM10.8618 17.7236C10.9465 17.893 11.1196 18 11.309 18H12.6909C12.8803 18 13.0535 17.893 13.1382 17.7236L14 16H9.99996L10.8618 17.7236ZM17 13H6.99996L5.99996 11H18L17 13Z"
                fill="currentColor"
              ></path>
            </svg> */}
            <img src={FilterIcon} className='filter-icon' alt="filter-icon" />
            <p>Filter</p>
          </button>
          <span>|</span>
          <div className="members">
            {members?.length && members.map((member) => <img className="member-img" src={member.imgUrl} key={member._id} alt="" />)}
          </div>
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
    </section >
  )
}
