import { useState } from 'react'

export const usePopover = () => {
  const [isShown, setIsShown] = useState(false)
  const [title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [parentRect, setParentRect] = useState({})

  function onTogglePopover(e, type, title) {
    console.log('here')
    if (isShown) {
      console.log('shown')
      setTitle('')
      setType('')
      setParentRect({})
      setIsShown(false)
    } else {
      console.log('not')
      setTitle(title)
      setType(type)
      const closestBtn = e.target.closest('button')
      setParentRect(closestBtn ? closestBtn.getBoundingClientRect() : e.target.getBoundingClientRect())
      setIsShown(true)
    }
  }

  const popoverProps = { isShown, title, type, parentRect }
  return [popoverProps, onTogglePopover]
}
