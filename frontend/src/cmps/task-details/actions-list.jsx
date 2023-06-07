import { BsCheck2Square, BsClock, BsPaperclip, BsSquareHalf, BsTag } from 'react-icons/bs'
import ClipIcon from '../../assets/img/svg/clip-icon.svg'
import MemberIcon from '../../assets/img/svg/member-icon.svg'

export function ActionsList({
  task,
  onOpenPopover,
  board,
  onHandleTaskMembers,
  onAttachmentAdded,
  onLabelChange,
  onLabelEdit,
  onLabelDelete,
}) {
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
        <button title="Checklist" onClick={(e) => onOpenPopover(e, { task }, 'checklist')}>
          <BsCheck2Square />
          <p>Checklist</p>
        </button>
        <button onClick={(e) => onOpenPopover(e, { dueDate: task.dueDate, widthOverride: '332px' }, 'dates')} title="Dates">
          <BsClock />
          <p>Dates</p>
        </button>
        <button onClick={(e) => onOpenPopover(e, { task, onAttachmentAdded }, 'attachment')} title="Attachment">
          <img src={ClipIcon} alt="clip-icon" />
          <p>Attachment</p>
        </button>
        <button
          // ref={coverChangeBtnRef}
          // onClick={(e) => onOpenPopover(e, { colors: possibleCoverColors, coverStyle: task?.style, onStyleChange }, 'cover', 'Cover')}
          className="flex center"
        >
          <BsSquareHalf className="box-icon" />
          <p>Cover</p>
        </button>
      </section>
    </section>
  )
}
