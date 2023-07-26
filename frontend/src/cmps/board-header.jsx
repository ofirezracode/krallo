import React, { useEffect, useRef, useState } from 'react'
import { BsStar, BsStarFill, BsPlusLg } from 'react-icons/bs'
import { updateBoard } from '../store/board.actions'
import { BoardMenu } from './board-menu'
import { Popover } from './popover'
import { usePopover } from '../customHooks/usePopover'
import { Loader } from './loader'
import FilterIcon from '../assets/img/svg/filter-icon.svg'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { addActivity } from '../store/activity.actions'
import { activityService } from '../services/activity.service'

export function BoardHeader({ onChangeTitle, showMenuClass, setIsMenuHidden }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const user = useSelector((storeState) => storeState.userModule.user)
  const [title, setTitle] = useState(board ? board.title : '')
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()
  const boardHeader = useRef()

  const members = board ? board.members : []

  useEffect(() => {
    setTitle(board.title)
  }, [board])

  function onOpenPopover(e, props, type) {
    closePopover()
    props.refElement = boardHeader.current
    setAddedProps(props)
    openPopover(e, type)
  }

  async function onHandleBoardMembers(member, activityType) {
    try {
      const updatedBoard = boardService.toggleMemberOnBoard(board, member, activityType)
      // let activity = activityService.createActivity(board._id, activityType, user, task)
      await updateBoard(updatedBoard)
      // await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMemberDelete(board, member) {
    try {
      let updatedBoard = { ...board }
      updatedBoard = boardService.removeMemberFromTasks(board, member._id)
      await updateBoard(updatedBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

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

  function handleFocus(ev) {
    ev.preventDefault()
    ev.target.select()
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onChangeTitle(title)
  }

  let inputWidth = 1
  if (!title) return
  for (let i = 0; i < title.length; i++) {
    const charCode = title.charCodeAt(i)
    if (charCode >= 65 && charCode <= 90) {
      // uppercase character
      inputWidth += 13
    } else if (charCode >= 97 && charCode <= 122) {
      // lowercase character
      inputWidth += 13
    } else {
      // punctuation, space, and other symbols
      inputWidth += 5
    }
  }

  let shownMembers = []
  if (members?.length) {
    if (window.innerWidth < 500) {
      shownMembers.push(<img key={members[0]._id} className="member-img" src={members[0].imgUrl} alt={members[0].fullname} onClick={(e) => onOpenPopover(e, { member: members[0] }, 'member-info')} />)
      shownMembers.push(
        <div className="mobile-more-members flex center">
          <label>+{members.length - 1}</label>
        </div>
      )
    } else {
      shownMembers = members.map((member, idx) => <img key={member._id} className="member-img" style={{ zIndex: idx + 1 }} src={member.imgUrl} alt={member.fullname}
        onClick={(e) => onOpenPopover(e, { member }, 'member-info')} />)
    }
  }

  if (!board) return <Loader />
  return (
    <section className="board-header-container" ref={boardHeader}>
      <div className="blur-header"></div>
      <ul className={`board-header ${showMenuClass} clean-list flex align-center between`}>
        <li className="flex align-center">
          <div className="board-name">
            <form onSubmit={onSubmit}>
              <input
                type="text"
                value={title}
                onChange={handleChange}
                style={{ width: `${title.length * 10.8}px` }}
                onFocus={handleFocus}
              />
            </form>
          </div>

          <button
            className="btn-star"
            title="Click to star or unstar this board. Starred boards show up at the top of your boards list."
            onClick={(ev) => onToggleIsStarred(ev, board)}
          >
            {board.isStarred ? <BsStarFill className="star-fill" /> : <BsStar className="star-empty" />}
          </button>
        </li>
        <li className="board-header-actions flex align-center">
          <button
            title="Filter cards"
            className="flex align-center"
            onClick={(e) => onOpenPopover(e, { onFilterBy: () => { }, widthOverride: '384px' }, 'filter')}
          >
            <img src={FilterIcon} className="filter-icon" alt="filter-icon" />
            <p>Filter</p>
          </button>
          <span>|</span>
          <div className="members">
            {shownMembers}
          </div>
          <button
            className="btn-fill"
            title="Share board"
            onClick={(e) => onOpenPopover(e, { board, onHandleBoardMembers, onMemberDelete }, 'share')}
          >
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
          <button
            className={`btn-more ${showMenuClass}`}
            title="Open the board menu"
            onClick={() => setIsMenuHidden((prevIsMenuHidden) => !prevIsMenuHidden)}
          >
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
      <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />
    </section>
  )
}
