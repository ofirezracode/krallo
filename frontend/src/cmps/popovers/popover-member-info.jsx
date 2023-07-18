import { HiXMark } from 'react-icons/hi2'
import { UserImg } from '../user-img'

export function PopoverMemberInfo({ member, onClose }) {
    return (
        <section className='popover-member-info flex'>
            <div className='member-img'>
                <UserImg userImg={member.imgUrl} size="xxlarge" />
            </div>
            <div className="member-info">
                <h1>{member.fullname}</h1>
                <p>@{member.fullname.replace(' ', '').toLowerCase()}</p>
            </div>
            <button onClick={onClose}><HiXMark /></button>
        </section>
    )
}