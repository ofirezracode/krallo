import { BsFillCreditCardFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { boardService } from '../../services/board.service.local'

export function TaskDetailsHeader({ board, task }) {
  const group = boardService.getGroupByTaskId(board, task._id)
  return (
    <header className="task-header flex">
      <div className="title-img">
        <BsFillCreditCardFill className="card-title-img" />
      </div>
      <div className="task-title">
        <h1>{task.title}</h1>
        {group && <p>
          in list <Link>{group.title}</Link>
        </p>}
      </div>
    </header>
  )
}
