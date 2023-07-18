import Ofir from '../../assets/img/members/ofir-pic.jpg'
import Etai from '../../assets/img/members/etai-pic.jpg'
import Tamar from '../../assets/img/members/tamar-pic.jpg'
import { BsPlusLg, BsChevronDown } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { dateTimeService } from '../../services/dateTimeService'
import { Checkbox } from '../checkbox'
import { useEffect, useState } from 'react'

export function ShowTaskDetails({ task, onOpenPopover, onLabelChange, onLabelEdit, onLabelDelete, onHandleTaskMembers, onDueDateSave }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const [dueDate, setDueDate] = useState(task && task.dueDate ? task.dueDate : {})

  useEffect(() => {
    if (task && task.dueDate) {
      setDueDate(task.dueDate)
    }
  }, [task])

  if (!task || !board) return <div></div>
  const { members } = task

  const taskLabelIds = task.labelIds ? task.labelIds : []
  const taskLabels = taskLabelIds.map((labelId) => {
    const label = board.labels.find((boardLabel) => boardLabel._id === labelId)
    let labelStyle = { backgroundColor: '#091e420f' }
    if (label.color) labelStyle = { backgroundColor: label.color.code }
    return { ...labelStyle, title: label.title ? label.title : '' }
  })

  function onDateClicked() {
    const updatedDueDate = { ...dueDate }
    updatedDueDate.isCompleted = !updatedDueDate.isCompleted
    setDueDate(updatedDueDate)
    onDueDateSave(updatedDueDate)
  }

  let formattedDate = dueDate ? dateTimeService.formatTimestampToTaskDetailsDate(dueDate.dueDate) : ''

  return (
    <section className="show-task-details">
      {members && members.length > 0 && (
        <div className="members-wrapper">
          <h5>Members</h5>
          <div className="members">
            {members &&
              members.map((member) => (
                <img key={member._id} src={`${member.imgUrl}`} className="member-img" alt={`Member ${member._id} photo`} onClick={(e) => onOpenPopover(e, { member }, 'member-info')} />
              ))}

            <button
              className="add-member"
              onClick={(e) => onOpenPopover(e, { members: board.members, taskMembers: task.members, onHandleTaskMembers }, 'members')}
            >
              <BsPlusLg />
            </button>
          </div>
        </div>
      )}
      {taskLabels && taskLabels.length > 0 && (
        <div className="labels-wrapper">
          <h5>Labels</h5>
          <div className="labels-container flex">
            <ul className="labels-list flex clean-list">
              {taskLabels.map((label, i) => (
                <li key={i}>
                  <button
                    style={{ backgroundColor: label.backgroundColor }}
                    className="label-btn"
                    onClick={(e) => onOpenPopover(e, { task, labels: board.labels, onLabelChange, onLabelEdit, onLabelDelete }, 'labels')}
                  >
                    {label.title}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className="add-label"
                  onClick={(e) =>
                    onOpenPopover(e, { task, labels: board.labels, onLabelChange, onLabelEdit, onLabelDelete, height: 'l' }, 'labels')
                  }
                >
                  <BsPlusLg />
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      {dueDate && dueDate.dueDate && (
        <div className="date-wrapper">
          <h5>Due date</h5>
          <div className="date-container flex">
            <Checkbox onToggle={onDateClicked} isChecked={dueDate.isCompleted} />
            <button className="flex center">
              <label>{formattedDate}</label>
              {dueDate.isCompleted && <span className="complete">complete</span>}
              <BsChevronDown />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
