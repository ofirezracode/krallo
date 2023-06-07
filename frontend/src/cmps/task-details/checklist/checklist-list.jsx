import React from 'react'
import { ChecklistPreview } from './checklist-preview';

export  function ChecklistList({checklists, onDeleteChecklist, onOpenPopover, onClose}) {
  return (
    <ul className='checklist-list'>
    {checklists && checklists.map((checklist) => (
        <div  key={checklist._id}><ChecklistPreview checklist={checklist} onDeleteChecklist={onDeleteChecklist} onOpenPopover={onOpenPopover} onClose={onClose}/></div>
    ))}
</ul>
  )
}
