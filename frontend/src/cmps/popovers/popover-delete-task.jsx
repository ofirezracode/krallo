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
    <section className='popover-delete-task'>
      <PopoverCmpHeader title="Remove task?" onClose={onClose} />
      <button className='btn-delete-task' onClick={() => onClickDelete()}>Remove this task</button>
    </section>
  )
}
