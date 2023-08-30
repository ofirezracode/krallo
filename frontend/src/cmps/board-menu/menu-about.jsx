import React from 'react'
import { BoardListTitle } from '../board-list-title'
import MemberIcon from '../../../src/assets/img/svg/member-icon.svg'
import { UserImg } from '../user-img'

export function MenuAbout({ board }) {

    const { createdBy } = board
    const { fullname } = createdBy
    return (
        <div className='menu-about'>
            <ul className='clean-list flex column'>
                <li className='board-admin-title'>
                    <BoardListTitle title={'Board Admins'} icon={MemberIcon} fontWeight={'600'} />
                </li>
                <li className='flex row admin-details'>
                    <div className='admin-img'>
                        <UserImg size={'xlarge'} user={createdBy} />
                    </div>
                    <div className='admin-name flex column'>
                        <h1>{fullname}</h1>
                        <p>@{fullname.replace(/\s/g, '').toLowerCase()}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
