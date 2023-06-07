import React from 'react'
import { ChecklistPreview } from './checklist-preview';

export  function ChecklistList({checklists}) {
  return (
    <ul className='checklist-list'>
    {checklists && checklists.map((checklist) => (
        <ChecklistPreview checklist={checklist}/>
    ))}
</ul>
  )
}
