import { BoardPreview } from './board-preview'
import { BoardListTitle } from './board-list-title'
import MemberIcon from '../../src/assets/img/svg/member-icon.svg'
import StarEmpty from '../../src/assets/img/svg/star-empty.svg'
import { useState } from 'react'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'

export function BoardList({ boards, onToggleIsStarred, isOnlyStarred, onAddBoard }) {
  let filteredBoards = isOnlyStarred ? boards.filter((board) => board.isStarred) : boards
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()

  function onOpenPopover(e, props, type) {
    closePopover()
    setAddedProps(props)
    openPopover(e, type)
  }

  return (
    <section className="board-list-container">
      {isOnlyStarred ? (
        <BoardListTitle title={'Starred boards'} icon={StarEmpty} />
      ) : (
        <BoardListTitle title={'Your boards'} icon={MemberIcon} />
      )}
      <ul className="board-list clean-list flex wrap">
        {filteredBoards.map((board) => {
          let boardStyle = {}
          if (board.style) {
            if (board.style.type === 'bgColor') {
              boardStyle = { backgroundColor: board.style.bgColor }
            } else if (board.style.type === 'img') {
              let url = ''
              if (board.style.imgUrlSmall) {
                url = board.style.imgUrlSmall
              } else if (board.style.imgUrlFull) {
                url = board.style.imgUrlFull
              } else {
                url = board.style.imgUrl
              }
              boardStyle = { background: `url(${url}) center center / cover` }
            }
          }
          return (
            <li key={board._id} style={boardStyle} className="board-preview">
              <BoardPreview board={board} onToggleIsStarred={onToggleIsStarred} />
            </li>
          )
        })}
        {!isOnlyStarred && (
          <li className="new-board" onClick={(e) => onOpenPopover(e, { onAddBoard }, 'create-board')} title="Create board">
            <article className="flex align-center justify-center">
              <p>Create new board</p>
            </article>
          </li>
        )}
      </ul>
      <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />
    </section>
  )
}
