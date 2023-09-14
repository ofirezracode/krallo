import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsCircleHalf, BsTrello, BsPlusLg } from 'react-icons/bs'
import { UserImg } from './user-img'
import { logout } from '../store/user.actions.js'
import { useNavigate } from 'react-router-dom'
import { addBoard, setCurrBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'
import { useSelector } from 'react-redux'
import { setCurrFilterBy } from '../store/board.actions'

export function AppHeader({ toggleDarkMode, darkClass }) {
  const navigate = useNavigate()
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()
  const [isBoardCreated, setIsBoardCreated] = useState(false)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const [filterKeyword, setFilterKeyword] = useState('')
  useEffect(() => {
    if (isBoardCreated) {
      window.location.reload()
    }
  }, [isBoardCreated])

  function onOpenPopover(e, props, type) {
    closePopover()
    setAddedProps(props)
    openPopover(e, type)
  }

  async function onAddBoard(title, imgUrl) {
    try {
      const boardToSave = boardService.getEmptyBoard(title, imgUrl)
      boardToSave.createdBy = loggedInUser
      const savedBoard = await addBoard(boardToSave)
      setCurrBoard(savedBoard)
      navigate(`/board/${savedBoard._id}`)
      setIsBoardCreated(true)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  async function onLogout() {
    try {
      await logout()
      navigate(`/`)
    } catch (err) { }
  }

  function onKeywordChange(newKeyword) {
    setFilterKeyword(newKeyword)
    onFilterChange('keywords', newKeyword)
  }

  function onFilterChange(key, value) {
    const filterBy = {}
    if (filterKeyword) {
      filterBy.keywords = filterKeyword
    }

    filterBy[key] = value

    setCurrFilterBy(filterBy)
  }
  function handleFocus(ev) {
    ev.preventDefault()
    ev.target.select()
  }

  return (
    <>
      <ul className={`app-header flex between clean-list ${darkClass}`}>
        <li className="gray-logo flex">
          <Link className={`logo-link flex align-center ${darkClass}`} to="/workspaces">
            <BsTrello />
            <label>Krallo</label>
          </Link>
          <button
            className={`create-btn ${darkClass}`}
            title="Create new board"
            onClick={(e) => onOpenPopover(e, { onAddBoard }, 'create-board')}
          >
            <p className="create-wide">Create</p>
            <p className="create-mobile">
              <BsPlusLg />
            </p>
          </button>
        </li>
        <li>
          <ul className="app-header-links flex">
            <li>
              <input
                className={`search-input ${darkClass}`}
                type="search"
                value={filterKeyword}
                id="site-search"
                onChange={(e) => onKeywordChange(e.target.value)}
                maxLength={'500px'}
                placeholder="Search"
                onFocus={handleFocus} />
            </li>
            <li>
              <button className="btn-search" title="Search">
                <svg width="20" height="20" viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <button className={`header-btn btn-icon ${darkClass}`} title="Notifications">
                <svg className="bell" viewBox="0 0 24 24" role="presentation">
                  <path
                    d="M6.586 17.829a2 2 0 002.829 0L6.585 15a2 2 0 000 2.829zm4.798-12.351A5.036 5.036 0 0114.954 4c.972 0 1.945.28 2.788.839.02-.026.043-.05.066-.074a1.01 1.01 0 111.354 1.494 5.048 5.048 0 01-.64 6.356l-.725.725c-.782.783-1.813 2.21-2.312 3.207l-1.509 3.016c-.249.5-.773.584-1.171.187l-8.556-8.555c-.397-.397-.308-.924.187-1.172l3.017-1.508c.989-.494 2.42-1.526 3.206-2.312l.725-.725zm2.739 9.63c.517-.975 1.568-2.396 2.354-3.182l.725-.726a3.048 3.048 0 00.387-3.835c-.19-.286-.718-.766-.859-.86A3.043 3.043 0 0015.047 6a3.04 3.04 0 00-2.156.892l-.95.951c-.784.785-2.219 1.82-3.201 2.311l-1.74.87 6.07 6.069 1.053-1.985z"
                    fill="currentColor"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            <li>
              <button className={`header-btn btn-icon ${darkClass}`} title="Dark mode" onClick={toggleDarkMode}>
                <BsCircleHalf />
              </button>
            </li>
            <li>
              <button className="user-img-header flex" onClick={(e) => onOpenPopover(e, { onLogout }, 'logout')} title="logout">
                <UserImg size="small" hover="circle" user={loggedInUser} padding={true} />
              </button>
            </li>
          </ul>
        </li>
      </ul>
      <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />
    </>
  )
}
