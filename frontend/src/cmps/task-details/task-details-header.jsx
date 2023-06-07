
import CardIcon from '../../assets/img/svg/card-icon.svg'
import { Link } from 'react-router-dom'
import { boardService } from '../../services/board.service.local'
import { useEffect, useState } from 'react'

export function TaskDetailsHeader({ board, task }) {
  const [group, setGroup] = useState()

  useEffect(() => {
    if (board && task) {
      setGroup(boardService.getGroupByTaskId(board, task._id))
    }
  }, [task])

  if (!task) return <div></div>
  return (
    <header className="task-header flex">
      <div className="title-img">
        <img src={CardIcon} className="card-title-img" alt="card-icon" />
      </div>
      <div className="task-title">
        <h1>{task.title}</h1>
        {group && (
          <p>
            in list <Link>{group.title}</Link>
          </p>
        )}
      </div>
    </header>
  )
}
