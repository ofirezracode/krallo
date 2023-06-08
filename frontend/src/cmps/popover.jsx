import React from 'react'

import { HiXMark } from 'react-icons/hi2'
import { PopoverDummy } from './popovers/popover-dummy'
import { PopoverLabels } from './popovers/popover-labels'
import { PopoverMembers } from './popovers/popover-members'
import { PopoverCover } from './popovers/popover-cover'
import { PopoverAttachment } from './popovers/popover-attachment'
import { PopoverChecklist } from './popovers/popover-checklist'
import { PopoverDates } from './popovers/popover-dates'
import { PopoverDeleteAttachment } from './popovers/popover-delete-attachment'
import { PopoverEditAttachment } from './popovers/popover-edit-attachment'
import { PopoverDeleteChecklist } from './popovers/popover-delete-checklist'

export function Popover({ isShown, type, parentRect, onClose, addedProps }) {
  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>
  let popoverStyles = { position: 'absolute' }

  //todo: check viewport overflow on x

  //todo: check viewport overflow on y

  let yDiff = 0
  let xDiff = 0

  console.log(addedProps.refElement)

  if (addedProps.refElement) {
    const containerRect = addedProps.refElement.getBoundingClientRect()
    xDiff = containerRect.x
    yDiff = containerRect.y
  }

  popoverStyles.top = parentRect.bottom + 5 - yDiff
  popoverStyles.left = parentRect.left - xDiff
  // popoverStyles.top = parentRect.bottom + 5
  // popoverStyles.left = parentRect.left

  if (addedProps.widthOverride) {
    popoverStyles.width = addedProps.widthOverride
  }

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
    case 'delete-attachment':
      return <PopoverDeleteAttachment {...addedProps} onClose={onClose} />
    case 'edit-attachment':
      return <PopoverEditAttachment {...addedProps} onClose={onClose} />
    case 'cover':
      return <PopoverCover {...addedProps} onClose={onClose} />
    case 'checklist':
      return <PopoverChecklist {...addedProps} onClose={onClose} />
    case 'dates':
      return <PopoverDates {...addedProps} onClose={onClose} />
    case 'delete-checklist':
      return <PopoverDeleteChecklist {...addedProps} onClose={onClose} />
    default:
      return <PopoverDummy />
  }
}
