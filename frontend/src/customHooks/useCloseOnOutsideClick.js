import { useEffect, useState } from 'react'

export const useCloseOnOutsideClick = (action, currStateElementClass, prevStateElementClass = '') => {
  const [isEditing, setIsEditing] = useState(false)
  const [requiresAction, setRequiresAction] = useState(false)

  useEffect(() => {
    function handleDocumentClick(e) {
      if (!e.target.closest(currStateElementClass) && !e.target.classList.contains(prevStateElementClass)) {
        setRequiresAction(true)
      }
    }

    if (isEditing) {
      document.addEventListener('click', handleDocumentClick)
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isEditing])

  useEffect(() => {
    if (requiresAction) {
      if (action) {
        action()
      }
      setRequiresAction(false)
    }
  }, [requiresAction])

  return [isEditing, setIsEditing]
}
