import React from 'react'

import { useState } from 'react'
import PopoverDummy from './popovers/popover-dummy'
import { HiXMark } from 'react-icons/hi2'

function Popover({ isShown, title, type, parentRect, onClose }) {
  if (!isShown || !parentRect || Object.keys(parentRect).length > 0) return <div></div>
  let popoverStyles = { position: 'fixed' }

  //todo: check viewport overflow on x

  //todo: check viewport overflow on y

  popoverStyles.top = parentRect.bottom
  popoverStyles.left = parentRect.left

  console.log('popoverStyles', popoverStyles)

  return (
    <div className="popover" style={popoverStyles}>
      <header>
        <h3>{title}</h3>
        <HiXMark onClick={onClose} />
      </header>
      <section>
        <DynamicCmp type={type}></DynamicCmp>
      </section>
    </div>
  )
}

export default Popover

function DynamicCmp({ type }) {
  switch (type) {
    case 'dummy':
      return <PopoverDummy />
    default:
      return <PopoverDummy />
  }
}
