import React, { useEffect, useRef } from 'react'

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
import { PopoverShare } from './popovers/popover-share'
import { PopoverFilter } from './popovers/popover-filter'

export function Popover({ isShown, type, parentRect, onClose, addedProps }) {
  const [isListening, setIsListening] = useCloseOnOutsideClick(onClosePopover, 'popover', 'add-to-card-btn', '.popover-backdrop')

  useEffect(() => {
    if (type) {
      setIsListening(true)
    }
  }, [type])

  const popoverRef = useRef()

  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>

  function onClosePopover() {
    setIsListening(false)
    onClose()
  }

  let popoverStyles = { position: 'absolute' }

  // let isSmallScreen = false
  let isJustifyRight = false
  let isPositionRight = false
  let isAlignCenter = false
  let isAlignTop = false
  let positionX = parentRect.left
  let positionY = parentRect.bottom

  // Check viewport overflow on the X axis
  if (window.innerWidth - 400 < parentRect.left) {
    isJustifyRight = true
    if (window.innerWidth < parentRect.right) {
      isJustifyRight = false
      isPositionRight = true
    }
  }

  // Check viewport overflow on the Y axis
  if (popoverRef.current) {
    if (window.innerHeight - parentRect.bottom < popoverRef.current.getBoundingClientRect().height) {
      if (window.innerHeight - parentRect.bottom < popoverRef.current.getBoundingClientRect().height / 2) {
        isAlignTop = true
      } else {
        isAlignCenter = true
      }
    }
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

  const scrollTop =
    window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body).scrollTop
  if (isAlignCenter) {
    popoverStyles.top = positionY - yDiff
    popoverStyles.transform = 'translate(0, -50%)'
  }

  if (isAlignTop) {
    let popoverHeight = 0
    if (popoverRef.current) popoverHeight = popoverRef.current.getBoundingClientRect().height
    popoverStyles.top = window.innerHeight - popoverHeight + scrollTop - 20
  }

  if (isJustifyRight) {
    let popoverWidth = 0
    if (popoverRef.current) popoverWidth = popoverRef.current.getBoundingClientRect().width
    popoverStyles.left = window.innerWidth - popoverWidth - xDiff - (window.innerWidth - parentRect.right)
  }

  if (isPositionRight) {
    let popoverWidth = 0
    if (popoverRef.current) popoverWidth = popoverRef.current.getBoundingClientRect().width
    popoverStyles.left = window.innerWidth - popoverWidth - xDiff - 20
  }

  if (addedProps.widthOverride) {
    popoverStyles.width = addedProps.widthOverride
  }

  if (!popoverRef.current) {
    popoverStyles.opacity = 0
  } else {
    popoverStyles.opacity = 1
  }

  return (
    <>
      <div className="popover-backdrop" />
      <div ref={popoverRef} className="popover" style={popoverStyles}>
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
    case 'share':
      return <PopoverShare {...addedProps} onClose={onClose} />
    case 'filter':
      return <PopoverFilter {...addedProps} onClose={onClose} />
    default:
      return <PopoverDummy />
  }
}
