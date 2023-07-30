import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function PopoverLeaveBoard({ board, onLeaveBoard, onMemberDelete, onClose }) {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const navigate = useNavigate()

    function onClickLeave() {
        onMemberDelete(board, loggedInUser)
        onLeaveBoard(loggedInUser._id)
        onClose()
        navigate('/workspaces')
    }

    return (
        <section className='delete-board'>
            <PopoverCmpHeader title="Leave board?" onClose={onClose} />
            <p className='delete-board-pra' >You will be removed from all cards on this board.</p>
            <button className='btn delete-btn' onClick={() => onClickLeave()}>Leave board</button>
        </section>
    )
}