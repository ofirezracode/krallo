import CardIcon from '../../assets/img/svg/card-icon.svg'
import { Link, useParams } from 'react-router-dom'
import { boardService } from '../../services/board.service'
import { useEffect, useState } from 'react'

export function TaskDetailsHeader({ board, onChangeTitle }) {
  const [group, setGroup] = useState()
  const { taskId } = useParams()
  const [task, setTask] = useState(null)
  const [title, setTitle] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (board) {
      setTask(boardService.getTaskById(board, taskId))
    }
  }, [board, taskId])

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setGroup(boardService.getGroupByTaskId(board, task._id))
    }
  }, [task, board])

  function handleEditClick() {
    setIsEditing(true)
  }

  function handleInputBlur() {
    if (title) {
      onChangeTitle(title)
    }
    setIsEditing(false)
  }

  function handleChange(ev) {
    const { value } = ev.target
    setTitle(value)
  }

  async function onSubmit() {
    handleInputBlur()
  }

  if (!task) return <div></div>
  return (
    <header className="task-header flex">
      <div className="title-img">
        <img src={CardIcon} className="card-title-img" alt="card-icon" />
      </div>
      <div className="task-title">
        {!isEditing && (
          <h1 onClick={handleEditClick}>
            {task.title}
          </h1>
        )}
        {isEditing && (
          <form className="edit-title-form" onSubmit={onSubmit}>
            <input
              className='input'
              type='text'
              value={title}
              onChange={handleChange}
              onBlur={handleInputBlur}
              autoFocus
            />
          </form>
        )}
        {group && (
          <p>
            in list <Link>{group.title}</Link>
          </p>
        )}
      </div>
    </header>
  )
}