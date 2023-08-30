import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addBoard, loadBoards, updateBoard } from '../store/board.actions'
import { BoardList } from '../cmps/board-list'
import { boardService } from '../services/board.service'
import { useNavigate } from 'react-router-dom'

export function Workspaces() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const navigate = useNavigate()
  const myBoards = boards // When the page crush problem fix, delete this line and turn on the lines underneath
  // const myBoards = boards.filter(board => {
  //   return loggedInUser && board.members && board.members?.some(member => member._id === loggedInUser._id)
  // })
  const starredBoards = myBoards.filter(board => board && board.isStarred)

  useEffect(() => {
    loadBoards()
  }, [])

  async function onToggleIsStarred(ev, board) {
    try {
      ev.stopPropagation()
      ev.preventDefault()
      const boardToToggle = await { ...board, isStarred: !board.isStarred }
      updateBoard(boardToToggle)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onAddBoard(title, imgUrl) {
    try {
      const boardToSave = boardService.getEmptyBoard(title, imgUrl)
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
        {starredBoards?.length > 0 && <BoardList boards={myBoards} onToggleIsStarred={onToggleIsStarred} isOnlyStarred={true} />}
        <BoardList boards={myBoards} onToggleIsStarred={onToggleIsStarred} isOnlyStarred={false} onAddBoard={onAddBoard} />
      </section>
    </section>
  )
}
