import React, { useRef, useState } from "react"
import KralloIcon from '../assets/img/svg/krallo-icon.svg'
import ActivityIcon from '../assets/img/svg/activity-icon.svg'
import { MenuTitle } from "./board-menu/board-menu-title"
import { utilService } from "../services/util.service"
import { useSelector } from "react-redux"
import { MenuAbout } from "./board-menu/menu-about"
import { MenuBackground } from "./board-menu/menu-background"
import { MenuActivitiesList } from "./board-menu/menu-activities-list"
import { colorService } from "../services/color.service"
import { Popover } from "./popover"
import { usePopover } from "../customHooks/usePopover"
import { BsFillDoorOpenFill, BsTrash3Fill } from "react-icons/bs"


export function BoardMenu({ board, setIsMenuHidden, showMenuClass, onUpdateBoardBg, onRemoveBoard, onLeaveBoard, onMemberDelete }) {
  const [isOn, setIsOn] = useState(true)
  const [title, setTitle] = useState('Menu')
  const [setting, setSetting] = useState('')
  const goBackClass = isOn ? 'go-back' : ''
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()
  const boardMenu = useRef()
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const activities = useSelector((storeState) => storeState.activityModule.activities)
  function onChangeSettings(currTitle, settingName) {
    setIsOn((prevIsOn) => !prevIsOn)
    setTitle(currTitle)
    setSetting(settingName)
  }

  function onOpenPopover(e, props, type) {
    closePopover()
    props.refElement = boardMenu.current
    setAddedProps(props)
    openPopover(e, type)
  }

  let boardStyle = {}
  if (board.style) {
    if (board.style.type === 'bgColor') {
      boardStyle = { backgroundColor: board.style.bgColor }
    } else if (board.style.type === 'img') {
      let url = ''
      if (board.style.imgUrlSmall) {
        url = board.style.imgUrlSmall
      } else {
        url = board.style.imgUrl
      }
      boardStyle = { background: `url(${url}) center center / cover` }
    }
  }

  let reversedActivities = [...activities]
  reversedActivities = reversedActivities.reverse()
  return (
    <section className={`board-menu ${showMenuClass}`}>
      <MenuTitle
        title={title}
        setIsMenuHidden={setIsMenuHidden}
        setIsOn={setIsOn}
        goBackClass={goBackClass}
        setTitle={setTitle}
        setSetting={setSetting}
      />
      {isOn && (
        <div className="menu-main-content">
          <ul className="menu-content clean-list flex column">
            <li className="board-about" onClick={() => onChangeSettings('About this board', 'about')}>
              <button className="align-center">
                <img src={KralloIcon} alt="krallo-icon" />
                <p>About this board</p>
              </button>
            </li>
            <li className="change-background" onClick={() => onChangeSettings('Change background', 'background')}>
              <button>
                <div className="board-bg-img" style={boardStyle}></div>
                <p>Change background</p>
              </button>
            </li>
            <li className="leave-board" ref={boardMenu} onClick={(e) => onOpenPopover(e, { board, onLeaveBoard, onMemberDelete }, 'leave-board')}>
              <button>
                <BsFillDoorOpenFill className="trash" />
                <p>Leave board</p>
              </button>
            </li>
            {loggedInUser?._id === board?.createdBy?._id && <li className="delete-board" ref={boardMenu} onClick={(e) => onOpenPopover(e, { board, onRemoveBoard }, 'delete-board')}>
              <button>
                <BsTrash3Fill className="trash" />
                <p>Close board...</p>
              </button>
            </li>}
            <hr />
            <li className="board-activity" onClick={() => onChangeSettings('Activity', 'activities')}>
              <button className="flex center">
                <img src={ActivityIcon} alt="activity-icon" />
                <p>Activity</p>
              </button>
            </li>
          </ul>

          <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />

          <div className="activity-list">
            <MenuActivitiesList board={board} activities={reversedActivities} />
          </div></div>)
      }

      {setting === 'about' && <MenuAbout board={board} />}
      {setting === 'background' && <MenuBackground board={board} setTitle={setTitle} onUpdateBoardBg={onUpdateBoardBg} />}
      {
        setting === 'activities' && (
          <div className="activity-list">
            <MenuActivitiesList board={board} activities={reversedActivities} />
          </div>
        )
      }
    </section >
  )
}
