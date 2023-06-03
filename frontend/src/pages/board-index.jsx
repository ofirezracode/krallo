import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import GroupList from '../cmps/group-list'
import { loadBoards, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service.local'
import BoardHeader from '../cmps/board-header'
import { func } from 'prop-types'

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
    const groupIndex = board.groups.findIndex((group) => group._id === groupId)

    const newGroups = [...board.groups]
    newGroups[groupIndex].title = newTitle

    const newBoard = { ...board, groups: newGroups }
    setBoard(newBoard)

    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onDndTask(sourceGroupId, destGroupId, taskSourceIndex, taskDestIndex) {
    const newBoard = boardService.dndTask(board, sourceGroupId, destGroupId, taskSourceIndex, taskDestIndex)
    setBoard(newBoard)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onDndGroup(sourceGroupId, destGroupId) {
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
      <BoardHeader board={board}></BoardHeader>
      <GroupList board={board} onDndTask={onDndTask} onDndGroup={onDndGroup} onUpdateGroupTitle={onUpdateGroupTitle} onAddGroup={onAddGroup}></GroupList>
    </section>
  )
}
