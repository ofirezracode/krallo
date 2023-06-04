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
    // const containerRect = e.target.closest('.task-details').getBoundingClientRect()
    const containerRect = taskDetails.current.getBoundingClientRect()
    props.xDiff = containerRect.x
    props.yDiff = containerRect.y
    setAddedProps(props)
    onTogglePopover(e, type, title)
  }

  return (
    <section className="screen">
      <div className="backdrop"></div>
      <article ref={taskDetails} className="task-details">
        <button onClick={() => navigate(`/board/${boardId}`)} className="close-button">
          <HiXMark className="close-icon" />
        </button>
        <TaskCover task={task} />
        <header className="flex">
          <div className="title-img">
            <BsFillCreditCardFill className="card-title-img" />
          </div>
          <div className="task-title">
            <h1>Drag and Drop</h1>
            <p>
              in list <Link>Code Review</Link>
            </p>
          </div>
        </header>
        <section className="task-details-container">
          <section className="card-details-container">
            <ShowMembersLabels task={task} />
          </section>
          <section className="add-to-card-container">
            <h5>Add to card</h5>
            <section className="add-to-card-btns">
              <button onClick={(e) => onOpenPopover(e, { members: board.members }, 'members', 'Members')} title="Members">
                <BsPerson />
                <p>Members</p>
              </button>
              <button title="Labels">
                <BsTag />
                <p>Labels</p>
              </button>
              <button title="Checklist">
                <BsCheck2Square />
                <p>Checklist</p>
              </button>
              <button title="Dates">
                <BsClock />
                <p>Dates</p>
              </button>
              <button onClick={(e) => onOpenPopover(e, { attachment: board.attachment }, 'attachment', 'Attachment')} title="Attachment">
                <BsPaperclip />
                <p>Attachment</p>
              </button>
            </section>
          </section>
        </section>
        <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
      </article>
    </section>
  )
}
