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


export function TaskDetails() {
  // const [task, setTask] = useState(boardService.getEmptyTask())
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const board = useSelector((storeState) => storeState.boardModule.board)
  const { taskId, boardId } = useParams()
  const [task, setTask] = useState(boardService.getTaskById(board ? board : [], taskId))
  // const [board, setBoard] = useState(boardService.getEmptyBoard())

  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, onTogglePopover] = usePopover()
  const taskDetails = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    if (boards.length !== 0) {
      // setBoard(...boards.filter((board) => board._id === boardId))
      setTask(boardService.getTaskById(board ? board : [], taskId))
    }
  }, [boards])

  function onOpenPopover(e, props, type, title) {
    // const containerRect = e.target.closest('.task-details').getBoundingClientRect()
    const containerRect = taskDetails.current.getBoundingClientRect()
    props.xDiff = containerRect.x
    props.yDiff = containerRect.y
    setAddedProps(props)
    onTogglePopover(e, type, title)
  }

  async function onHandleTaskMembers(activityType, member){
    try{
      let activity = activityService.createActivity(activityType, member, task)
      const updatedTask = boardService.toggleMemberOnTask(task, member, activityType)
      await saveTask(board, updatedTask, activity)

    }catch(err){
      console.log('err',err)
    }
  }

  return (
    <section className="task-details-screen">
      <div className="backdrop"></div>
      <article ref={taskDetails} className="task-details">
        <button onClick={() => navigate(`/board/${boardId}`)} className="close-button">
          <HiXMark className="close-icon" />
        </button>
        <TaskCover task={task} />
        <TaskDetailsHeader task={task} />
        <section className="task-details-container">
          <section className="card-details-container">
            <ShowMembersLabels task={task} />
          </section>
          <ActionsList task={task} onHandleTaskMembers = {onHandleTaskMembers} onOpenPopover={onOpenPopover} board={board} />
        </section>
        <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
      </article>
    </section>
  )
}
