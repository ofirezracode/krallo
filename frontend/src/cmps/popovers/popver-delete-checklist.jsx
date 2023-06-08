import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopverDeleteChecklist({ checklist, onDeleteChecklist, onClose }) {
    return (
        <section className='delete-checklist'>
            <PopoverCmpHeader title="Delete Checklist?" onClose={onClose} />
            <p className='delete-checklist-pra' >Deleting a checklist is permanent and there is no way to get it back.</p>
            <button className='btn delete-btn' onClick={() => onDeleteChecklist(checklist._id)}>Delete checklist</button>
        </section>
    )
}
