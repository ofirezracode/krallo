import React, { useState } from "react";
import KralloIcon from '../assets/img/svg/krallo-icon.svg'
import { MenuTitle } from "./board-menu/board-menu-title";
import { utilService } from "../services/util.service";

export function BoardMenu({ board, setIsMenuHidden, showMenuClass }) {
  const [isOn, setIsOn] = useState(false)
  const [title, setTitle] = useState('Menu')
  const goBackClass = isOn ? 'go-back' : ''

  function onChangeSettings(currTitle) {
    setIsOn(prevIsOn => !prevIsOn)
    setTitle(currTitle)
  }

  let boardStyle = {}
  if (board.style) {
    if (board.style.type === 'bgColor') {
      boardStyle = { backgroundColor: board.style.bgColor }
    } else if (board.style.type === 'img') {
      boardStyle = { background: `url(${board.style.imgUrl}) center center / cover` }
    }
  }
  return (
    <section className={`board-menu ${showMenuClass}`}>
      <MenuTitle title={title} setIsMenuHidden={setIsMenuHidden} setIsOn={setIsOn} goBackClass={goBackClass} setTitle={setTitle} />
      {isOn && <ul className="menu-content clean-list flex column">
        <li className='board-about' onClick={() => onChangeSettings('About this board')}>
          <button className=" align-center">
            <img src={KralloIcon} alt="krallo-icon" />
            <p>About this board</p>
          </button>
        </li>
        <li className="change-background" onClick={() => onChangeSettings('Change background')}>
          <button >
            <div className="board-bg-img" style={boardStyle}></div>
            <p>Change background</p>
          </button>
        </li>
        {board.activities.map(activity =>

          <li className="flex">
            <img src={activity.byMember.imgUrl} alt={activity} />
            <div>

              <h4>{activity.byMember.fullname}</h4>
              <p>{activity.txt}</p>
              <p>{utilService.formatDate(activity.createdAt)}</p>
            </div>
          </li>)}
      </ul>
      }

    </section >
  )
}