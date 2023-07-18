import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { useNavigate } from 'react-router-dom'

export function PopoverDeleteBoard({ board, onRemoveBoard, onClose }) {
    const navigate = useNavigate()


    function onClickDelete() {
        onRemoveBoard(board._id)
        onClose()
        navigate('/workspaces')
    }

    return (
        <section className='delete-board'>
            <PopoverCmpHeader title="Close board?" onClose={onClose} />
            <p className='delete-board-pra' >Closing a board is permanent and there is no way to get it back.</p>
            <button className='btn delete-btn' onClick={() => onClickDelete()}>Close</button>
        </section>
    )
}