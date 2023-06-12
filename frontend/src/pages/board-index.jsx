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
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
  const [filteredBoard, setFilteredBoard] = useState(board)
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
      setFilteredBoard(newBoard)
      loadActivities({ boardId: newBoard._id })
    }
  }, [boards])

  useEffect(() => {
    if (board && filterBy) {
      const newBoard = boardService.filterBoard(board, filterBy)
      setFilteredBoard(newBoard)
    }
  }, [filterBy])

  function onUpdatedBoardEmitted(updatedBoard) {
    setCurrBoard(updatedBoard)
    const newBoard = boardService.filterBoard(updatedBoard, filterBy)
    setFilteredBoard(newBoard)
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
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMoveTask(sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx) {
    const newBoard = boardService.move('task', board, sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
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
        board={filteredBoard}
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
