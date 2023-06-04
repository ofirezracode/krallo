import React from 'react'

import { useState } from 'react'
import PopoverDummy from './popovers/popover-dummy'
import { HiXMark } from 'react-icons/hi2'
import PopoverLabels from './popovers/popover-labels'
import PopoverMembers from './popovers/popover-members'

function Popover({ isShown, title, type, parentRect, onClose, addedProps }) {
  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>
  let popoverStyles = { position: 'fixed' }

  //todo: check viewport overflow on x

  //todo: check viewport overflow on y

  popoverStyles.top = parentRect.bottom + 5 - (addedProps.yDiff ? addedProps.yDiff : 0)
  popoverStyles.left = parentRect.left - (addedProps.xDiff ? addedProps.xDiff : 0)

  return (
    <div className="popover" style={popoverStyles}>
      <header>
        <h3>{title}</h3>
        <HiXMark onClick={onClose} />
      </header>
      <section>
        <DynamicCmp type={type} addedProps={addedProps}></DynamicCmp>
      </section>
    </div>
  )
}

export default Popover

function DynamicCmp({ type, addedProps }) {
  switch (type) {
    case 'dummy':
      return <PopoverDummy />
    case 'labels':
      return <PopoverLabels {...addedProps} />
    case 'members':
      return <PopoverMembers {...addedProps} />
    default:
      return <PopoverDummy />
  }
}
