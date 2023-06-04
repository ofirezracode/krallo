import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service.local'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'
import { ShowMembersLabels } from './task-details/show-members-labels'
import { HiXMark } from 'react-icons/hi2'
import { TaskCover } from './task-details/task-cover'
import { TaskDetailsHeader } from './task-details/task-details-header'
import { ActionsList } from './task-details/actions-list'
import { saveTask } from '../store/board.actions'
import { activityService, createActivity } from '../services/activity.service'

import { TaskAttachments } from './task-details/task-attachments'

export function TaskDetails() {
  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { taskId, boardId } = useParams()
  const [task, setTask] = useState(boardService.getEmptyTask())
  // const [board, setBoard] = useState(boardService.getEmptyBoard())

  const possibleCoverColors = ['#4bce97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', '#579dff', '#60c6d2', '#94c748', '#e774bb', '#8590a2']

  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, onTogglePopover] = usePopover()
  const taskDetails = useRef()
  const coverChangeBtnRef = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    if (board) {
      setTask(boardService.getTaskById(board ? board : [], taskId))
    }
  }, [board])

  // useEffect(() => {
  //   console.log('reload')
  //   if (boards.length !== 0) {
  //     // setBoard(...boards.filter((board) => board._id === boardId))
  //     console.log('boardService.getTaskById(board ? board : [], taskId)', boardService.getTaskById(board ? board : [], taskId))
  //     setTask(boardService.getTaskById(board ? board : [], taskId))
  //   }
  // }, [boards])

  function onOpenPopover(e, props, type, title) {
    props.refElement = taskDetails.current
    setAddedProps(props)
    onTogglePopover(e, type, title)
  }

  async function onHandleTaskMembers(activityType, member) {
    try {
      let activity = activityService.createActivity(activityType, member, task)
      const updatedTask = boardService.toggleMemberOnTask(task, member, activityType)
      await saveTask(board, updatedTask, activity)
    } catch (err) {
      console.log('err', err)
    }
  }

  async function onStyleChange(newStyle) {
    try {
      const updatedTask = { ...task, style: newStyle }
      await saveTask(board, updatedTask)
    } catch (err) {
      console.log('err', err)
    }
  }
  console.log('task', task)
  console.log('board', board)
  return (
    <section className="task-details-screen">
      <div className="backdrop"></div>
      <article ref={taskDetails} className="task-details">
        <button onClick={() => navigate(`/board/${boardId}`)} className="close-btn">
          <HiXMark className="close-icon" />
        </button>
        <TaskCover
          task={task}
          taskDetails={taskDetails}
          onStyleChange={onStyleChange}
          coverChangeBtnRef={coverChangeBtnRef} />
        <TaskDetailsHeader task={task} />
        <section className="task-details-container">
          <section className="card-details-container">
            <ShowMembersLabels task={task} />
            <TaskAttachments task={task} />
          </section>
          <ActionsList
            task={task}
            onHandleTaskMembers={onHandleTaskMembers}
            onOpenPopover={onOpenPopover}
            board={board}
            possibleCoverColors={possibleCoverColors}
            coverChangeBtnRef={coverChangeBtnRef}
            onStyleChange={onStyleChange} />
        </section>
        <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
      </article>
    </section>
  )
}
