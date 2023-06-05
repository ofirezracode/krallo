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
import UploadAndDisplayImage from './task-details/test'

export function TaskDetails() {
  // const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const { taskId, boardId } = useParams()
  const [task, setTask] = useState(boardService.getEmptyTask())
  // const [board, setBoard] = useState(boardService.getEmptyBoard())

  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, onTogglePopover] = usePopover()
  const taskDetails = useRef()

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
  async function onAttachmentAdded(attachment) {
    try {
      let updatedAttachment = [attachment]
      if (task.attachments) {
        updatedAttachment = [...task.attachments, ...updatedAttachment]
      }
      const updatedTask = { ...task, attachments: updatedAttachment }
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
        <TaskCover task={task} taskDetails={taskDetails} onStyleChange={onStyleChange} />
        <TaskDetailsHeader task={task} board={board} />
        <section className="task-details-container">
          <section className="card-details-container">
            <ShowMembersLabels task={task} />
            {/* <UploadAndDisplayImage /> */}
            <TaskAttachments task={task} />
          </section>
          <ActionsList task={task} onHandleTaskMembers={onHandleTaskMembers} onOpenPopover={onOpenPopover} board={board} onAttachmentAdded={onAttachmentAdded} />
        </section>
        <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
      </article>
    </section>
  )
}
