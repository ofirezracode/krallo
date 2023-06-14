import React, { useEffect, useRef, useState } from 'react'
import CoverIcon from '../../assets/img/svg/cover-icon.svg'
import { usePopover } from '../../customHooks/usePopover'
import { Popover } from '../popover'
import { colorService } from '../../services/color.service'

export function TaskCover({ task, taskDetails, onStyleChange, cover, setCover }) {
  // const [cover, setCover] = useState(null)

  useEffect(
    function () {
      async function getAvgColor() {
        if (task && task.style) {
          if (task.style.bgColor) {
            setCover({ backgroundColor: task.style.bgColor })
          } else if (task.style.imgUrl) {
            const avgClr = await colorService.getAvgColor(task.style.imgUrl)
            setCover({
              backgroundImage: `url(${task.style.imgUrl})`,
              backgroundPosition: 'center center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundColor: avgClr,
            })
          } else {
            setCover(null)
          }
        }
      }
      getAvgColor()
    },
    [task]
  )

  // ;(async function () {

  // })()

  const coverChangeBtnRef = useRef()
  const [addedProps, setAddedProps] = useState({})
  const [popoverProps, closePopover, openPopover] = usePopover()

  function onOpenPopover(e, props, type, title) {
    closePopover()
    props.refElement = taskDetails.current
    setAddedProps(props)
    openPopover(e, type, title)
  }

  return (
    <>
      {cover && (
        <section className="task-cover" style={cover}>
          <div className="cover-btn-container">
            <button
              ref={coverChangeBtnRef}
              onClick={(e) => onOpenPopover(e, { coverStyle: task?.style, onStyleChange }, 'cover')}
              className="flex center"
            >
              <img src={CoverIcon} className="box-icon" alt="cover-icon" />
              <p>Cover</p>
            </button>
          </div>
        </section>
      )}
      <Popover {...popoverProps} addedProps={addedProps} onClose={closePopover} />
    </>
  )
}
