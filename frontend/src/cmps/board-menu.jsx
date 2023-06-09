import React from "react";
import { HiXMark } from 'react-icons/hi2'
import KralloIcon from '../assets/img/svg/krallo-icon.svg'

export function BoardMenu({ board, setIsMenuHidden, showMenuClass }) {

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
      <section className="menu-header flex center">
        <h3>Menu</h3>
        <button
          title="Close the board menu" onClick={() => setIsMenuHidden(prevIsMenuHidden => !prevIsMenuHidden)}>
          <HiXMark />
        </button>
      </section>
      <section className="menu-content">
        <button>
          <h4>About this board</h4>
          <img src={KralloIcon} alt="krallo-icon" />
        </button>
        <button className="change-background flex">
          <div className="board-bg-img" style={boardStyle}></div>
          <h4>Change background</h4>
        </button>

      </section>

    </section>
  )
}