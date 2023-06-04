import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import GroupList from '../cmps/group-list'
import { loadBoards, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service.local'
import BoardHeader from '../cmps/board-header'

export default function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { boardId } = useParams()
  const [board, setBoard] = useState(boardService.getEmptyBoard())

  useEffect(() => {
    loadBoards()
  }, [])

  useEffect(() => {
    if (boards.length !== 0) setBoard(...boards.filter((board) => board._id === boardId))
  }, [boards])

  async function onUpdateGroupTitle(groupId, newTitle) {
    const groupIdx = board.groups.findIndex((group) => group._id === groupId)

    const newGroups = [...board.groups]
    newGroups[groupIdx].title = newTitle

    const newBoard = { ...board, groups: newGroups }
    setBoard(newBoard)

    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMoveTask(sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx) {
    const newBoard = boardService.dndTask(board, sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx)
    setBoard(newBoard)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMoveGroup(sourceGroupId, destGroupId) {
    const newBoard = boardService.dndGroup(board, sourceGroupId, destGroupId)
    setBoard(newBoard)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onAddGroup(group) {
    const newBoard = { ...board }
    newBoard.groups.push(group)
    setBoard(newBoard)

    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  let boardStyle = {}
  if (board.style) {
    if (board.style.type === 'bgColor') {
      boardStyle = { backgroundColor: board.style.bgColor }
    } else if (board.style.type === 'img') {
      boardStyle = {
        backgroundImage: `url(${board.style.imgUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    }
  }

  return (
    <section style={boardStyle} className="board-index flex column">
      <Outlet />
      <BoardHeader board={board}></BoardHeader>
      <GroupList board={board} onDndTask={onMoveTask} onDndGroup={onMoveGroup} onUpdateGroupTitle={onUpdateGroupTitle} onAddGroup={onAddGroup}></GroupList>
    </section>
  )
}
