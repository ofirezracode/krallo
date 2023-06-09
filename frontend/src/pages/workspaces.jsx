import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addBoard, loadBoards, updateBoard } from '../store/board.actions'
import { BoardList } from '../cmps/board-list'
import { boardService } from '../services/board.service'
import { useNavigate } from 'react-router-dom'

export function Workspaces() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const loggedInUser = useSelector((storeState) => storeState.userModule.users)
  const navigate = useNavigate()

  useEffect(() => {
    loadBoards()
  }, [])

  async function onToggleIsStarred(ev, board) {
    try {
      ev.stopPropagation()
      ev.preventDefault()
      console.log('before change')
      const boardToToggle = await { ...board, isStarred: !board.isStarred }
      updateBoard(boardToToggle)
      console.log('after')
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onAddBoard(ev) {
    ev.preventDefault()
    try {
      const boardToSave = boardService.getEmptyBoard()
      // if (!loggedInUser.fullname) loggedInUser.fullname = 'Guest'
      boardToSave.createdBy = loggedInUser
      const savedBoard = await addBoard(boardToSave)
      navigate(`/board/${savedBoard._id}`)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <section className="workspaces">
      <section className="all-boards">
        <BoardList boards={boards} onToggleIsStarred={onToggleIsStarred} isOnlyStarred={true} />
        <BoardList boards={boards} onToggleIsStarred={onToggleIsStarred} isOnlyStarred={false} onAddBoard={onAddBoard} />
      </section>
    </section>
  )
}
