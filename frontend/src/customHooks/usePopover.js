import { useState } from 'react'

export function usePopover() {
  const [isShown, setIsShown] = useState(false)
  const [type, setType] = useState('')
  const [parentRect, setParentRect] = useState({})

  function closePopover() {
    setType('')
    setParentRect({})
    setIsShown(false)
  }

  function openPopover(e, type) {
    setType(type)
    const closestBtn = e.target.closest('button')
    setParentRect(closestBtn ? closestBtn.getBoundingClientRect() : e.target.getBoundingClientRect())
    setIsShown(true)
  }

  // function onTogglePopover(e, type) {
  //   if (isShown) {
  //     setType('')
  //     setParentRect({})
  //     setIsShown(false)
  //   } else {
  //     setType(type)
  //     const closestBtn = e.target.closest('button')
  //     setParentRect(closestBtn ? closestBtn.getBoundingClientRect() : e.target.getBoundingClientRect())
  //     setIsShown(true)
  //   }
  // }

  const popoverProps = { isShown, type, parentRect }
  return [popoverProps, closePopover, openPopover]
}
