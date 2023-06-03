import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addBoard, loadBoards, updateBoard } from '../store/board.actions'
import BoardList from '../cmps/board-list'
import { boardService } from '../services/board.service.local'
import { useNavigate } from 'react-router-dom'

function Workspaces() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const navigate = useNavigate()

  useEffect(() => {
    loadBoards()
  }, [])

  function toggleIsStarred(ev, board) {
    ev.preventDefault()
    board.isStarred = !board.isStarred
    updateBoard(board)
  }

  async function onAddBoard(ev) {
    ev.preventDefault()
    try {
      const boardToSave = boardService.getEmptyBoard()
      const savedBoard = await addBoard(boardToSave)
      navigate(`/board/${savedBoard._id}`)
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <section className="workspaces">
      <section className="all-boards">
        <BoardList boards={boards} toggleIsStarred={toggleIsStarred} isOnlyStarred={true} />
        <BoardList boards={boards} toggleIsStarred={toggleIsStarred} isOnlyStarred={false} onAddBoard={onAddBoard} />
      </section>
    </section>
  )
}

export default Workspaces
