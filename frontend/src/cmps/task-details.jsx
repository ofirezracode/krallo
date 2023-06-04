import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import { boardService } from '../services/board.service.local'
import { Link } from 'react-router-dom'
import { BsCheck2Square, BsClock, BsFillCreditCardFill, BsPaperclip, BsPerson, BsTag } from 'react-icons/bs'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'
import { ShowMembersLabels } from './task-details/show-members-labels'
import { HiXMark } from 'react-icons/hi2'
import { TaskCover } from './task-details/task-cover'
import { TaskDetailsHeader } from './task-details/task-details-header'
import { ActionsList } from './task-details/actions-list'
import { TaskAttachments } from './task-details/task-attachments'

export function TaskDetails() {
  // const [task, setTask] = useState(boardService.getEmptyTask())
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { taskId, boardId } = useParams()
  const [task, setTask] = useState(boardService.getTaskById(boards ? boards : [], boardId, taskId))
  const [board, setBoard] = useState(boardService.getEmptyBoard())

  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, onTogglePopover] = usePopover()
  const taskDetails = useRef()

  const navigate = useNavigate()

  useEffect(() => {
    if (boards.length !== 0) {
      setBoard(...boards.filter((board) => board._id === boardId))
      setTask(boardService.getTaskById(boards ? boards : [], boardId, taskId))
    }
  }, [boards])

  function onOpenPopover(e, props, type, title) {
    props.refElement = taskDetails.current
    setAddedProps(props)
    onTogglePopover(e, type, title)
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
            <TaskAttachments task={task} />
          </section>
          <ActionsList task={task} onOpenPopover={onOpenPopover} board={board} />
        </section>
        <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
      </article>
    </section>
  )
}
