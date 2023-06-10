import React from 'react'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverCreateBoard({ onClose}) {
  return (
    <div>
      <PopoverCmpHeader title="Members" onClose={onClose} />
    </div>
  )
}
