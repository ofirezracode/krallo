import React, { useEffect } from 'react'

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
import { PopoverCreateBoard } from './popovers/popover-create-board'
import { PopoverLogout } from './popovers/popover-logout'
import { useCloseOnOutsideClick } from '../customHooks/useCloseOnOutsideClick'

export function Popover({ isShown, type, parentRect, onClose, addedProps }) {
  const [isListening, setIsListening] = useCloseOnOutsideClick(onClosePopover, '.popover', 'add-to-card-btn')

  useEffect(() => {
    if (type) {
      setIsListening(true)
    }
  }, [type])

  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>

  function onClosePopover() {
    setIsListening(false)
    onClose()
  }

  let popoverStyles = { position: 'absolute' }

  let isSmallScreen = false
  let isJustifyRight = false
  let isAlignCenter = false
  let positionX = parentRect.left
  let positionY = parentRect.bottom

  // Check viewport overflow on the X axis
  if (window.innerWidth - 400 < parentRect.left && window.innerWidth < 1100) {
    if (window.innerWidth < parentRect.right - parentRect.width / 2) {
      isSmallScreen = true
    } else {
      isJustifyRight = true
    }
  }

  // Check viewport overflow on the Y axis
  if (addedProps.height === 'l' && parentRect.bottom > window.innerHeight / 2) {
    isAlignCenter = true
  } else if (addedProps.height === 'xl' && parentRect.bottom > window.innerHeight / 2.5) {
    isAlignCenter = true
  }

  let yDiff = 0
  let xDiff = 0

  if (addedProps.refElement) {
    const containerRect = addedProps.refElement.getBoundingClientRect()
    xDiff = containerRect.x
    yDiff = containerRect.y
  }

  popoverStyles.top = positionY + 5 - yDiff
  popoverStyles.left = positionX - xDiff

  if (isAlignCenter) {
    popoverStyles.top = positionY - yDiff
    popoverStyles.transform = 'translate(0, -50%)'
  }

  if (isJustifyRight) {
    popoverStyles.left = window.innerWidth - 340 - xDiff
  }

  if (isSmallScreen) {
    popoverStyles.left = '50%'
    popoverStyles.transform = 'translate(-50%, 0)'
  }

  // popoverStyles.top = parentRect.bottom + 5
  // popoverStyles.left = parentRect.left

  if (addedProps.widthOverride) {
    popoverStyles.width = addedProps.widthOverride
  }

  return (
    <>
      <div className="popover-backdrop" />
      <div className="popover" style={popoverStyles}>
        <DynamicCmp type={type} addedProps={addedProps} onClose={onClosePopover} />
      </div>
    </>
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
    case 'create-board':
      return <PopoverCreateBoard {...addedProps} onClose={onClose} />
    case 'logout':
      return <PopoverLogout {...addedProps} onClose={onClose} />
    default:
      return <PopoverDummy />
  }
}
