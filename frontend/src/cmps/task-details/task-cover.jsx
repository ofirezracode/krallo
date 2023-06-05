import React, { useRef, useState } from 'react'
import { BsSquareHalf } from 'react-icons/bs'
import { usePopover } from '../../customHooks/usePopover'
import { Popover } from '../popover'

export function TaskCover({ task, taskDetails, onStyleChange }) {
  const coverColor = task && task.style && task.style.bgColor ? { backgroundColor: task.style.bgColor } : null
  const possibleCoverColors = ['#4bce97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', '#579dff', '#60c6d2', '#94c748', '#e774bb', '#8590a2']

  const coverChangeBtnRef = useRef()
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, onTogglePopover] = usePopover()

  function onOpenPopover(e, props, type, title) {
    console.log('here')
    props.refElement = taskDetails.current
    setAddedProps(props)
    onTogglePopover(e, type, title)
  }

  return (
    <>
      {coverColor && (
        <section className="task-cover" style={coverColor}>
          <div className="cover-btn-container">
            <button
              ref={coverChangeBtnRef}
              onClick={(e) => onOpenPopover(e, { colors: possibleCoverColors, coverStyle: task?.style, onStyleChange }, 'cover', 'Cover')}
              className="flex center"
            >
              <BsSquareHalf className="box-icon" />
              <p>Cover</p>
            </button>
          </div>
        </section>
      )}
      <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
    </>
  )
}
