import React, { useState } from "react"
import KralloIcon from '../assets/img/svg/krallo-icon.svg'
import ActivityIcon from '../assets/img/svg/activity-icon.svg'
import { MenuTitle } from "./board-menu/board-menu-title"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { MenuAbout } from "./board-menu/menu-about"
import { MenuBackground } from "./board-menu/menu-background"
import { MenuActivitiesList } from "./board-menu/menu-activities-list"
import { colorService } from "../services/color.service"

export function BoardMenu({ board, setIsMenuHidden, showMenuClass, onUpdateBoardBg }) {
  const [isOn, setIsOn] = useState(true)
  const [title, setTitle] = useState('Menu')
  const goBackClass = isOn ? 'go-back' : ''
  const activities = useSelector((storeState) => storeState.activityModule.activities)
  const [setting, setSetting] = useState('')
  function onChangeSettings(currTitle, settingName) {
    setIsOn(prevIsOn => !prevIsOn)
    setTitle(currTitle)
    setSetting(settingName)
  }
  console.log(activities)

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
      <MenuTitle title={title} setIsMenuHidden={setIsMenuHidden} setIsOn={setIsOn} goBackClass={goBackClass} setTitle={setTitle} setSetting={setSetting} />
      {isOn && (
        <ul className="menu-content clean-list flex column">
          <li className='board-about' onClick={() => onChangeSettings('About this board', 'about')}>
            <button className=" align-center">
              <img src={KralloIcon} alt="krallo-icon" />
              <p>About this board</p>
            </button>
          </li>
          <li className="change-background" onClick={() => onChangeSettings('Change background', 'background')}>
            <button >
              <div className="board-bg-img" style={boardStyle}></div>
              <p>Change background</p>
            </button>
          </li>
          <hr />
          <li className='board-activity' onClick={() => onChangeSettings('Activity', 'activities')}>
            <button className="flex center">
              <img src={ActivityIcon} alt="activity-icon" />
              <p>Activity</p>
            </button>
          </li>
        </ul>
      )}

      <div className="activity-list">
        <MenuActivitiesList board={board} activities={activities} />
      </div>


      {setting === 'about' && <MenuAbout board={board} />}
      {setting === 'background' && <MenuBackground board={board} setTitle={setTitle} onUpdateBoardBg={onUpdateBoardBg} />}
      {setting === 'activities' && <MenuActivitiesList board={board} activities={activities} />}
    </section>
  )
}
