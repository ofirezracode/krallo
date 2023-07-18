import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverGroupActions({ group, onDeleteGroup, onClose }) {
    return (
        <section className='popover-group-actions'>
            <PopoverCmpHeader title="List actions" onClose={onClose} />
            <button className='btn-remove-list' onClick={() => onDeleteGroup(group._id)}>Remove this list</button>
        </section>
    )
}
