import { PopoverCmpHeader } from './popover-cmp-header'
import { useNavigate } from 'react-router-dom'

export function PopoverDeleteTask({ boardId, taskId, onTaskDelete, onClose }) {
  const navigate = useNavigate()

  function onClickDelete() {
    onTaskDelete(taskId)
    onClose()
    navigate(`/board/${boardId}`)
  }

  return (
    <div className="popover-delete-task">
      <PopoverCmpHeader title="Delete task" onClose={onClose} />
      <p>
        Are you sure you want to delete this task? <br />
        Deleting a task is permanent and cannot be recovered
      </p>
      <button className="btn delete-btn" onClick={() => onClickDelete()}>
        Close
      </button>
    </div>
  )
}
