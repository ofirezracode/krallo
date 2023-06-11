import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { socketService } from '../services/socket.service'

import { GroupList } from '../cmps/group-list'
import { BoardHeader } from '../cmps/board-header'
import { loadBoards, setCurrBoard, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { Loader } from '../cmps/loader'
import { BoardMenu } from '../cmps/board-menu'
import { loadActivities } from '../store/activity.actions'

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const activities = useSelector((storeState) => storeState.activityModule.activities)
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const { boardId } = useParams()
  // const [board, setBoard] = useState(boardService.getEmptyBoard())
  const [isMenuHidden, setIsMenuHidden] = useState(false)
  const showMenuClass = isMenuHidden ? 'is-show-menu' : ''

  useEffect(() => {
    loadBoards()
    socketService.on('board-update', onUpdatedBoardEmitted)
    socketService.emit('set-board-id', boardId)
  }, [])

  useEffect(() => {
    if (boards.length !== 0) {
      const newBoard = boards.filter((board) => board._id === boardId)[0]

      setCurrBoard(newBoard)
      loadActivities({ boardId: newBoard._id })
    }
  }, [boards])

  function onUpdatedBoardEmitted(updatedBoard) {
    setCurrBoard(updatedBoard)
    console.log('caught emitted event', updatedBoard)
  }

  async function onUpdateGroupTitle(groupId, newTitle) {
    const groupIdx = board.groups.findIndex((group) => group._id === groupId)

    const newGroups = [...board.groups]
    newGroups[groupIdx].title = newTitle

    const newBoard = { ...board, groups: newGroups }
    // setBoard(newBoard)

    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onUpdateBoardBg(url) {
    const newBoard = { ...board, style: board.style }
    newBoard.style.type = 'img'
    newBoard.style.imgUrl = url
    try {
      console.log(newBoard)
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMoveTask(sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx) {
    const newBoard = boardService.move('task', board, sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx)
    // setBoard(newBoard)
  }

  async function onMoveGroup(sourceGroupId, destGroupId) {
    const newBoard = boardService.move('group', board, sourceGroupId, destGroupId)
    // setBoard(newBoard)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onAddGroup(group) {
    const newBoard = { ...board }
    newBoard.groups.push(group)
    // setBoard(newBoard)

    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onChangeTitle(title) {
    const newBoard = { ...board, title }
    console.log(newBoard)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  let boardStyle = {}
  if (board && board.style) {
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
  if (!board) return <Loader />

  return (
    <section style={boardStyle} className="board-index flex column">
      <Outlet />
      <BoardHeader board={board} onChangeTitle={onChangeTitle} showMenuClass={showMenuClass} setIsMenuHidden={setIsMenuHidden} />
      <GroupList
        board={board}
        onMoveTask={onMoveTask}
        onMoveGroup={onMoveGroup}
        onUpdateGroupTitle={onUpdateGroupTitle}
        onAddGroup={onAddGroup}
        showMenuClass={showMenuClass}
      />
      <BoardMenu board={board} setIsMenuHidden={setIsMenuHidden} showMenuClass={showMenuClass} onUpdateBoardBg={onUpdateBoardBg} />
    </section>
  )
}
