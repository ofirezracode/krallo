import React from 'react'

import { HiXMark } from 'react-icons/hi2'
import { PopoverDummy } from './popovers/popover-dummy'
import { PopoverLabels } from './popovers/popover-labels'
import { PopoverMembers } from './popovers/popover-members'
import { PopoverCover } from './popovers/popover-cover'
import { PopoverAttachment } from './popovers/popover-attachment'
import { PopoverChecklist } from './popovers/popover-checklist'

export function Popover({ isShown, type, parentRect, onClose, addedProps }) {
  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>
  let popoverStyles = { position: 'fixed' }

  //todo: check viewport overflow on x

  //todo: check viewport overflow on y

  let yDiff = 0
  let xDiff = 0

  if (addedProps.refElement) {
    const containerRect = addedProps.refElement.getBoundingClientRect()
    xDiff = containerRect.x
    yDiff = containerRect.y
  }

  popoverStyles.top = parentRect.bottom + 5 - yDiff
  popoverStyles.left = parentRect.left - xDiff

  return (
    <div className="popover" style={popoverStyles}>
      <DynamicCmp type={type} addedProps={addedProps} onClose={onClose} />
    </div>
  )
}

function DynamicCmp({ type, addedProps, onClose }) {
  switch (type) {
    case 'dummy':
      return <PopoverDummy />
    case 'labels':
      return <PopoverLabels {...addedProps} onClose={onClose} />
    case 'members':
      return <PopoverMembers {...addedProps} onClose={onClose} />
    case 'attachment':
      return <PopoverAttachment {...addedProps} onClose={onClose} />
    case 'cover':
      return <PopoverCover {...addedProps} onClose={onClose} />
    case 'checklist':
      return <PopoverChecklist {...addedProps} onClose={onClose}/>  
    default:
      return <PopoverDummy />
  }
}
