import React from 'react'
import { BoardListTitle } from '../board-list-title'
import MemberIcon from '../../../src/assets/img/svg/member-icon.svg'
import { UserImg } from '../user-img'

export function MenuAbout({ board }) {

    const { createdBy } = board
    return (
        <div className='menu-about'>
            <ul className='clean-list flex column'>
                <li className='board-admin-title'>
                    <BoardListTitle title={'Board Admins'} icon={MemberIcon} fontWeight={'600'} />
                </li>
                <li className='flex row admin-details'>
                    <div className='admin-img'>
                        <UserImg size={'xlarge'} userImg={createdBy.imgUrl} />
                    </div>
                    <div className='admin-name flex column'>
                        <h1>{createdBy.fullname}</h1>
                        <p>@{createdBy.fullname.trim(' ').toLowerCase()}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}
