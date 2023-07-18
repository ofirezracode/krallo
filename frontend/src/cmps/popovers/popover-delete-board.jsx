import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'
import { useNavigate } from 'react-router-dom'

export function PopoverDeleteBoard({ board, onDeleteBoard, onClose }) {
    const navigate = useNavigate()


    function onClickDelete() {
        onDeleteBoard(board._id)
        onClose()
        navigate('/workspaces')
    }

    return (
        <section className='delete-board'>
            <PopoverCmpHeader title="Delete board?" onClose={onClose} />
            <p className='delete-board-pra' >Deleting a board is permanent and there is no way to get it back.</p>
            <button className='btn delete-btn' onClick={() => onClickDelete()}>Delete board</button>
        </section>
    )
}