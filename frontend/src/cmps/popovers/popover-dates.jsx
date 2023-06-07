import React, { useEffect, useState } from 'react'
import { DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { PopoverCmpHeader } from './popover-cmp-header'

export function PopoverDates({ dueDate, onClose }) {
  const [timestamp, setTimestamp] = useState(dueDate.timestamp)
  const [isCompleted, setIsCompleted] = useState(dueDate.isCompleted)
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ])

  useEffect(() => {
    setTimestamp(dueDate.timestamp)
    setIsCompleted(dueDate.isCompleted)
  }, [dueDate])

  return (
    <section className="popover-dates">
      <PopoverCmpHeader title="Dates" onClose={onClose} />
      <div>
        <DateRange
          className="date-picker"
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={Date}
        />
      </div>
      <h4 className="labels-title">Title</h4>
      <div></div>
      <button className="btn-save flex center">Save</button>
      <button className="btn-remove flex center">Remove</button>
    </section>
  )
}
