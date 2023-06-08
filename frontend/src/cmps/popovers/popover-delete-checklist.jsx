import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverDeleteChecklist({ checklist, onDeleteChecklist, onClose }) {

    function onClickDelete() {
        onDeleteChecklist(checklist._id)
        onClose()
    }

    return (
        <section className='delete-checklist'>
            <PopoverCmpHeader title="Delete Checklist?" onClose={onClose} />
            <p className='delete-checklist-pra' >Deleting a checklist is permanent and there is no way to get it back.</p>
            <button className='btn delete-btn' onClick={() => onClickDelete()}>Delete checklist</button>
        </section>
    )
}
