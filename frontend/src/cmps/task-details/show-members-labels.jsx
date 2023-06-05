import Ofir from '../../assets/img/members/ofir-pic.jpg'
import Etai from '../../assets/img/members/etai-pic.jpg'
import Tamar from '../../assets/img/members/tamar-pic.jpg'
import { BsPlusLg } from 'react-icons/bs'

export function ShowMembersLabels({ task, board }) {
  if (!task || !board) return <div></div>
  const { members } = task

  const taskLabelIds = task.labelIds ? task.labelIds : []
  const taskLabels = taskLabelIds.map((labelId, i) => {
    const label = board.labels.find((boardLabel) => boardLabel._id === labelId)
    return { bgColor: label.color, title: label.title ? label.title : '' }
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
            {taskLabels.map((label) => (
              <li key={label.bgColor}>
                <button style={{ backgroundColor: label.bgColor }} className="label-btn">
                  {label.title}
                </button>
              </li>
            ))}
            <li>
              <button className="add-label">
                <BsPlusLg />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
