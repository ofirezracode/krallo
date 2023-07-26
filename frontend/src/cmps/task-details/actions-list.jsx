import { BsCheck2Square, BsClock, BsPaperclip, BsSquareHalf, BsTag, BsTrash3, BsTrash3Fill } from 'react-icons/bs'
import ClipIcon from '../../assets/img/svg/clip-icon.svg'
import CoverIcon from '../../assets/img/svg/cover-icon.svg'
import MemberIcon from '../../assets/img/svg/member-icon.svg'
import { useEffect, useState } from 'react'

export function ActionsList({
  task,
  onOpenPopover,
  board,
  onHandleTaskMembers,
  onAttachmentAdded,
  onLabelChange,
  onLabelEdit,
  onLabelDelete,
  onAddChecklist,
  onDeleteChecklist,
  onStyleChange,
  onDueDateSave,
  onTaskDelete,
}) {
  const [isCover, setIsCover] = useState(false)

  useEffect(() => {
    setIsCover(task && task.style && task.style.type ? true : false)
  }, [task])

  return (
    <section className="add-to-card-container">
      <h5>Add to card</h5>
      <section className="add-to-card-btns">
        <button
          onClick={(e) => onOpenPopover(e, { members: board.members, taskMembers: task.members, onHandleTaskMembers }, 'members')}
          title="Members"
        >
          <img src={MemberIcon} className="member-icon" alt="member-icon" />
          <p>Members</p>
        </button>
        <button
          onClick={(e) => onOpenPopover(e, { task, labels: board.labels, onLabelChange, onLabelEdit, onLabelDelete }, 'labels')}
          title="Labels"
        >
          <BsTag className="label-icon" />
          <p>Labels</p>
        </button>
        <button title="Checklist" onClick={(e) => onOpenPopover(e, { task, onAddChecklist, onDeleteChecklist }, 'checklist')}>
          <BsCheck2Square />
          <p>Checklist</p>
        </button>
        <button
          onClick={(e) => onOpenPopover(e, { activeDueDate: task.dueDate, widthOverride: '332px', onDueDateSave }, 'dates')}
          title="Dates"
        >
          <BsClock />
          <p>Dates</p>
        </button>
        <button onClick={(e) => onOpenPopover(e, { task, onAttachmentAdded }, 'attachment')} title="Attachment">
          <img src={ClipIcon} alt="clip-icon" />
          <p>Attachment</p>
        </button>
        {!isCover && (
          <button onClick={(e) => onOpenPopover(e, { coverStyle: task?.style, onStyleChange }, 'cover')} className="flex center" title="Cover">
            <img src={CoverIcon} className="box-icon" alt="cover-icon" />
            <p>Cover</p>
          </button>
        )}
      </section>
      <h5>Actions</h5>
      <section className="action-btns">
        <button onClick={(e) => onOpenPopover(e, { boardId: board._id, taskId: task._id, onTaskDelete }, 'delete-task')} title="Delete">
          <BsTrash3 />
          <p>Remove</p>
        </button>
      </section>
    </section>
  )
}
