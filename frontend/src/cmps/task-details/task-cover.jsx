import React, { useRef, useState } from 'react'
import { BsSquareHalf } from 'react-icons/bs'
import { usePopover } from '../../customHooks/usePopover'
import { Popover } from '../popover'
import { ChangeCoverBtn } from '../change-cover-btn'

export function TaskCover({ task, taskDetails, onStyleChange, possibleCoverColors, coverChangeBtnRef }) {
  const coverColor = task.style && task.style.bgColor ? { backgroundColor: task.style.bgColor } : null

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
            <ChangeCoverBtn
              coverChangeBtnRef={coverChangeBtnRef}
              onOpenPopover={onOpenPopover}
              possibleCoverColors={possibleCoverColors}
              task={task}
              onStyleChange={onStyleChange} />
            {/* <button
              ref={coverChangeBtnRef}
              onClick={(e) => onOpenPopover(e, { colors: possibleCoverColors, coverStyle: task?.style, onStyleChange }, 'cover', 'Cover')}
              className="flex center"
            >
              <BsSquareHalf className="box-icon" />
              <p>Cover</p>
            </button> */}
          </div>
        </section>
      )}
      <Popover {...popoverProps} addedProps={addedProps} onClose={onTogglePopover} />
    </>
  )
}
