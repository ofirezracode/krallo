import React from 'react'

import { useState } from 'react'
import PopoverDummy from './popovers/popover-dummy'
import { HiXMark } from 'react-icons/hi2'
import PopoverLabels from './popovers/popover-labels'

function Popover({ isShown, title, type, parentRect, onClose, props }) {
  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>
  let popoverStyles = { position: 'fixed' }

  //todo: check viewport overflow on x

  //todo: check viewport overflow on y

  popoverStyles.top = parentRect.bottom + 5
  popoverStyles.left = parentRect.left

  return (
    <div className="popover" style={popoverStyles}>
      <header>
        <h3>{title}</h3>
        <HiXMark onClick={onClose} />
      </header>
      <section>
        <DynamicCmp type={type} props={props}></DynamicCmp>
      </section>
    </div>
  )
}

export default Popover

function DynamicCmp({ type, props }) {
  switch (type) {
    case 'dummy':
      return <PopoverDummy />
    case 'labels':
      return <PopoverLabels {...props} />
    default:
      return <PopoverDummy />
  }
}
