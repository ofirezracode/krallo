import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'

import { socketService } from '../services/socket.service'

import { GroupList } from '../cmps/group-list'
import { BoardHeader } from '../cmps/board-header'
import { loadBoards, removeBoard, setCurrBoard, updateBoard } from '../store/board.actions'
import { boardService } from '../services/board.service'
import { Loader } from '../cmps/loader'
import { BoardMenu } from '../cmps/board-menu'
import { loadActivities } from '../store/activity.actions'

export function BoardIndex() {
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const activities = useSelector((storeState) => storeState.activityModule.activities)
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
  const user = useSelector((storeState) => storeState.userModule.user)
  const [filteredBoard, setFilteredBoard] = useState(board)
  const { boardId } = useParams()
  // const [board, setBoard] = useState(boardService.getEmptyBoard())
  const [isMenuHidden, setIsMenuHidden] = useState(false)
  const showMenuClass = isMenuHidden ? 'is-show-menu' : ''

  useEffect(() => {
    loadBoards()
    socketService.on('board-update', onUpdatedBoardEmitted)
    socketService.emit('set-board-id', boardId)
    socketService.emit('set-user-socket', user._id)
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
    console.log('updated board recieved')
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

  async function onUpdateBoardBg(urls) {
    const newBoard = { ...board }
    const newStyle = {}
    newStyle.type = 'img'
    if (urls.full) {
      newStyle.imgUrlSmall = urls.small
      newStyle.imgUrlFull = urls.full
    } else {
      newStyle.imgUrl = urls
    }
    newBoard.style = newStyle
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMoveTask(sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx) {
    const newBoard = boardService.move('task', board, sourceGroupId, destGroupId, taskSourceIdx, taskDestIdx)
    setCurrBoard(newBoard)
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

  async function onRemoveBoard(boardId) {
    try {
      await removeBoard(boardId)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onLeaveBoard(loggedInUserId) {
    const newBoard = { ...board }
    const loggedInUserIdx = newBoard.members.findIndex(member => member._id === loggedInUserId)
    if (loggedInUserIdx < 0) return
    newBoard.members.splice(loggedInUserIdx, 1)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onHandleBoardMembers(member, activityType) {
    try {
      const updatedBoard = boardService.toggleMemberOnBoard(board, member, activityType)
      // let activity = activityService.createActivity(board._id, activityType, user, task)
      await updateBoard(updatedBoard)
      // await addActivity(activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onMemberDelete(board, member) {
    try {
      let updatedBoard = { ...board }
      updatedBoard = boardService.removeMemberFromTasks(board, member._id)
      await updateBoard(updatedBoard)
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

  async function onDeleteGroup(groupId) {
    const newBoard = { ...board }
    const groupIdx = await newBoard.groups.findIndex(group => groupId === group._id)
    newBoard.groups.splice(groupIdx, 1)
    try {
      await updateBoard(newBoard)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onChangeTitle(title) {
    const newBoard = { ...board, title }
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
      let url = ''
      if (board.style.imgUrlFull) {
        url = board.style.imgUrlFull
      } else {
        url = board.style.imgUrl
      }
      boardStyle = {
        backgroundImage: `url(${url})`,
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
      <BoardHeader
        onChangeTitle={onChangeTitle}
        onHandleBoardMembers={onHandleBoardMembers}
        onMemberDelete={onMemberDelete}
        showMenuClass={showMenuClass}
        setIsMenuHidden={setIsMenuHidden}
      />
      <GroupList
        board={filteredBoard}
        onMoveTask={onMoveTask}
        onMoveGroup={onMoveGroup}
        onUpdateGroupTitle={onUpdateGroupTitle}
        onAddGroup={onAddGroup}
        showMenuClass={showMenuClass}
        onDeleteGroup={onDeleteGroup}
      />
      <BoardMenu
        board={board}
        setIsMenuHidden={setIsMenuHidden}
        showMenuClass={showMenuClass}
        onUpdateBoardBg={onUpdateBoardBg}
        onRemoveBoard={onRemoveBoard}
        onLeaveBoard={onLeaveBoard}
        onMemberDelete={onMemberDelete} />
    </section>
  )
}
