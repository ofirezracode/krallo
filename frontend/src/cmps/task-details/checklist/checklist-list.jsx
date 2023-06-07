import React from 'react'
import { ChecklistPreview } from './checklist-preview';

export  function ChecklistList({checklists}) {
  return (
    <ul className='checklist-list'>
    {checklists && checklists.map((checklist) => (
        <div  key={checklist._id}><ChecklistPreview checklist={checklist}/></div>
    ))}
</ul>
  )
}
