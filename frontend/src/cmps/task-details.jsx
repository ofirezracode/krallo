import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { boardService } from '../services/board.service.local'
import { Link } from 'react-router-dom'
import { BsCheck2Square, BsClock, BsFillCreditCardFill, BsPaperclip, BsPerson, BsPlusLg, BsTag } from 'react-icons/bs'
import Ofir from '../assets/img/members/ofir-pic.jpg'
import Etai from '../assets/img/members/etai-pic.jpg'
import Tamar from '../assets/img/members/tamar-pic.jpg'
import { usePopover } from '../customHooks/usePopover'
import { Popover } from './popover'

export function TaskDetails() {
  // const [task, setTask] = useState(boardService.getEmptyTask())
  const boards = useSelector((storeState) => storeState.boardModule.boards)
  const { taskId, boardId } = useParams()
  const [task, setTask] = useState(boardService.getTaskById(boards ? boards : [], boardId, taskId))
  const [board, setBoard] = useState(boardService.getEmptyBoard())

  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, onTogglePopover] = usePopover()
  const taskDetails = useRef()

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
        <div className="cover-color">
          <div className="cover-btn-container">
            <button>
              {/* <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" class="icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(0.75turn) translateY(-20%) translateX(22%);"><path d="M8 15V1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H8zm6 1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12z"></path></svg> */}
              <p>Cover</p>
            </button>
          </div>
        </div>
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
            <section className="members-labels">
              <div className="members-wrapper">
                <h5>Members</h5>
                <div className="members">
                  <img src={Ofir} className="member-img" alt="" />
                  <img src={Etai} className="member-img" alt="" />
                  <img src={Tamar} className="member-img" alt="" />
                  <button className="add-member">
                    <BsPlusLg />
                  </button>
                </div>
              </div>
              <div className="labels-wrapper">
                <h5>Labels</h5>
                <div className="labels">
                  <button className="label-btn">Logic</button>
                  <button className="add-label">
                    <BsPlusLg />
                  </button>
                </div>
              </div>
            </section>
          </section>
          <section className="add-to-card-container">
            <h5>Add to card</h5>
            <section className="add-to-card-btns">
              <button
                onClick={(e) => onOpenPopover(e, { members: board.members }, 'members', 'Members')}
                className="add-btn flex justify-center"
              >
                <BsPerson className="add-to-card-img" />
                <p>Members</p>
              </button>
              <button className="add-btn flex justify-center">
                <BsTag className="add-to-card-img" />
                <p>Labels</p>
              </button>
              <button className="add-btn flex justify-center">
                <BsCheck2Square className="add-to-card-img" />
                <p>Checklist</p>
              </button>
              <button className="add-btn flex justify-center">
                <BsClock />
                <p>Dates</p>
              </button>
              <button className="add-btn flex justify-center">
                <BsPaperclip className="add-to-card-img" />
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
