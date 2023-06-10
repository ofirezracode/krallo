import Ofir from '../../assets/img/members/ofir-pic.jpg'
import Etai from '../../assets/img/members/etai-pic.jpg'
import Tamar from '../../assets/img/members/tamar-pic.jpg'
import { BsPlusLg } from 'react-icons/bs'
import { useSelector } from 'react-redux'

export function ShowMembersLabels({ task, onOpenPopover, onLabelChange, onLabelEdit, onLabelDelete }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  if (!task || !board) return <div></div>
  const { members } = task

  const taskLabelIds = task.labelIds ? task.labelIds : []
  const taskLabels = taskLabelIds.map((labelId) => {
    const label = board.labels.find((boardLabel) => boardLabel._id === labelId)
    let labelStyle = { backgroundColor: '#091e420f' }
    if (label.color) labelStyle = { backgroundColor: label.color.code }
    return { ...labelStyle, title: label.title ? label.title : '' }
  })

  return (
    <section className="members-labels">
      <div className="members-wrapper">
        <h5>Members</h5>
        <div className="members">
          {members &&
            members.map((member) => (
              <img key={member._id} src={`${member.imgUrl}`} className="member-img" alt={`Member ${member._id} photo`} />
            ))}

          <button className="add-member">
            <BsPlusLg />
          </button>
        </div>
      </div>
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
    </section>
  )
}
