import React, { useEffect, useState } from 'react'
import { Calendar, DateRange } from 'react-date-range'
import { addDays } from 'date-fns'
import { PopoverCmpHeader } from './popover-cmp-header'
import { Checkbox } from '../checkbox'
import { dateTimeService } from '../../services/dateTimeService'

export function PopoverDates({ activeDueDate, onDueDateSave, onClose }) {
  const [isRange, setIsRange] = useState(false)
  const [isDueDate, setIsDueDate] = useState(false)

  const [datePicker, setDatePicker] = useState(new Date())
  const [rangePicker, setRangePicker] = useState([
    {
      startDate: datePicker ? datePicker : new Date(),
      endDate: datePicker ? datePicker : new Date(),
      key: 'selection',
    },
  ])

  const [dueDateInput, setDueDateInput] = useState(dateTimeService.getTodaysDateDMY())
  const [timeInput, setTimeInput] = useState(dateTimeService.getCurrentTime())
  const [rangeInput, setRangeInput] = useState(dateTimeService.getTodaysDateDMY())

  const [dueDate, setDueDate] = useState(dateTimeService.getTodaysDateDMY())
  const [time, setTime] = useState(dateTimeService.getCurrentTime())
  const [range, setRange] = useState([
    {
      startDate: datePicker ? datePicker : new Date(),
      endDate: datePicker ? datePicker : new Date(),
      key: 'selection',
    },
  ])

  useEffect(() => {
    if (activeDueDate && activeDueDate.dueDate) {
      const time = dateTimeService.getTimeFromTimestamp(new Date(activeDueDate.dueDate))
      setDueDate(new Date(activeDueDate.dueDate))
      setTime(time)
      setTimeInput(timeInput)
      setIsDueDate(true)
    }

    if (activeDueDate && activeDueDate.startDate) {
      setIsRange(true)
      setRange([
        {
          startDate: new Date(activeDueDate.startDate),
          endDate: activeDueDate.dueDate ? new Date(activeDueDate.dueDate) : new Date(activeDueDate.startDate),
          key: 'selection',
        },
      ])
      setRangePicker([
        {
          startDate: new Date(activeDueDate.startDate),
          endDate: activeDueDate.dueDate ? new Date(activeDueDate.dueDate) : new Date(activeDueDate.startDate),
          key: 'selection',
        },
      ])
    } else {
      if (activeDueDate && activeDueDate.dueDate) {
        setRange([
          {
            startDate: new Date(dateTimeService.getPrevDate(new Date(activeDueDate.dueDate))),
            endDate: new Date(activeDueDate.dueDate),
            key: 'selection',
          },
        ])
        setRangePicker([
          {
            startDate: new Date(dateTimeService.getPrevDate(new Date(activeDueDate.dueDate))),
            endDate: new Date(activeDueDate.dueDate),
            key: 'selection',
          },
        ])
      }
    }
  }, [])

  useEffect(() => {
    setDueDateInput(dueDate)
    setDatePicker(dateTimeService.getDatePickerDateFromDMY(dueDate))
  }, [dueDate])

  useEffect(() => {
    setRangeInput(dateTimeService.getDMYFromDatePickerDate(range[0].startDate))
    setDueDate(dateTimeService.getDMYFromDatePickerDate(range[0].endDate))
  }, [range])

  useEffect(() => {
    if (isRange) {
      if (!dateTimeService.isStartDateBeforeEndDate(rangePicker[0].startDate, datePicker)) {
        setDueDate(dateTimeService.getDMYFromDatePickerDate(dateTimeService.getNextDate(rangePicker[0].startDate)))
      } else {
        setDueDateInput(dateTimeService.getDMYFromDatePickerDate(rangePicker[0].endDate))
      }
    }
  }, [isDueDate])

  function toggleFunction(_, toggleStateFunction) {
    toggleStateFunction((prev) => !prev)
  }

  function testInput(consistant, revertToConsistant, input, setInput) {
    if (setInput === setRange) {
      if (!isNaN(dateTimeService.getTimestampFromDateObject(input[0].startDate))) {
        const newRangePicker = [input[0]]
        if (!dateTimeService.isStartDateBeforeEndDate(newRangePicker[0].startDate, newRangePicker[0].endDate)) {
          newRangePicker[0].endDate = newRangePicker[0].startDate
        }
        setRangePicker(newRangePicker)
        setRange(newRangePicker)
      } else revertToConsistant(consistant)
    } else {
      if (!isNaN(dateTimeService.getTimestampFromDMY(input))) setInput(input)
      else revertToConsistant(consistant)
    }
  }

  function testTimeInput() {
    if (dateTimeService.isValidTime(timeInput)) setTime(timeInput)
    else setTimeInput(time)
  }

  function onSetCalendar(item) {
    if (isRange) {
      const newRangePicker = [rangePicker[0]]
      newRangePicker[0].startDate = item
      if (!dateTimeService.isStartDateBeforeEndDate(newRangePicker[0].startDate, newRangePicker[0].endDate)) {
        newRangePicker[0].endDate = dateTimeService.getNextDate(newRangePicker[0].startDate)
      }
      setRangePicker(newRangePicker)
      setRange(newRangePicker)
    } else {
      const newRangePicker = [rangePicker[0]]
      newRangePicker[0].endDate = item
      if (!dateTimeService.isStartDateBeforeEndDate(newRangePicker[0].startDate, newRangePicker[0].endDate)) {
        newRangePicker[0].startDate = newRangePicker[0].endDate
        newRangePicker[0].endDate = dateTimeService.getNextDate(newRangePicker[0].startDate)
      }
      setRangePicker(newRangePicker)
      setRange(newRangePicker)

      setDatePicker(item)
      setDueDate(dateTimeService.getDMYFromDatePickerDate(item))
      setIsDueDate(true)
    }
  }

  function onSetRange(item) {
    setRangePicker([item.selection])
    setRange([item.selection])
    setDueDate(dateTimeService.getDMYFromDatePickerDate(item.selection.endDate))
  }

  // console.log('datePicker', datePicker)
  // console.log('rangePicker', rangePicker)
  // console.log('dueDateInput', dueDateInput)
  // console.log('timeInput', timeInput)
  // console.log('rangeInput', rangeInput)
  // console.log('dueDate', dueDate)
  // console.log('time', time)
  // console.log('range', range)
  // console.log('isRange', isRange)
  // console.log('isDueDate', isDueDate)

  function onSave(isRemove) {
    let newDueDate = {}
    if (!isRemove) {
      let saveDueDate
      let saveStartDate
      let saveIsCompleted = false

      if (isRange) {
        saveStartDate = dateTimeService.getTimestampFromDateObject(range[0].startDate)
      }
      if (isDueDate) {
        saveDueDate = dateTimeService.getTimestampFromDateAndTime(dateTimeService.getDatePickerDateFromDMY(dueDate), time)
      }
      if (activeDueDate) {
        saveIsCompleted = activeDueDate.isCompleted
      }

      newDueDate = {
        dueDate: saveDueDate,
        startDate: saveStartDate,
        isCompleted: saveIsCompleted,
      }
    }

    onDueDateSave(newDueDate)
    onClose()
  }

  return (
    <section className="popover-dates">
      <PopoverCmpHeader title="Dates" onClose={onClose} />
      <div className="flex">
        {isRange && isDueDate && (
          <DateRange
            className="date-picker"
            // editableDateInputs={true}
            onChange={(item) => onSetRange(item)}
            moveRangeOnFirstSelection={true}
            ranges={rangePicker}
            showDateDisplay={false}
            showPreview={false}
          />
        )}
        {isRange && !isDueDate && (
          <Calendar className="date-picker" onChange={(item) => onSetCalendar(item)} date={rangePicker[0].startDate} />
        )}
        {!isRange && <Calendar className="date-picker" onChange={(item) => onSetCalendar(item)} date={datePicker} />}
      </div>
      <h4 className="labels-title">Start date</h4>
      <section className="date-input-container flex">
        <Checkbox isChecked={isRange} onToggle={toggleFunction} onClickProps={setIsRange} />
        <input
          onBlur={(e) =>
            testInput(
              range[0].endDate,
              setRangeInput,
              [
                {
                  startDate: dateTimeService.getDatePickerDateFromDMY(rangeInput),
                  key: 'selection',
                  endDate: dateTimeService.getDatePickerDateFromDMY(dueDate),
                },
              ],
              setRange
            )
          }
          onChange={(e) => setRangeInput(e.target.value)}
          value={rangeInput}
          className="date-input"
          type="text"
          disabled={!isRange}
          placeholder="D/M/YYYY"
        />
      </section>
      <h4 className="labels-title">Due date</h4>
      <section className="date-input-container flex">
        <Checkbox isChecked={isDueDate} onToggle={toggleFunction} onClickProps={setIsDueDate} />
        <input
          onBlur={(e) => testInput(dueDate, setDueDateInput, dueDateInput, setDueDate)}
          onChange={(e) => setDueDateInput(e.target.value)}
          value={dueDateInput}
          className="date-input"
          type="text"
          disabled={!isDueDate}
        />
        <input
          onBlur={testTimeInput}
          onChange={(e) => setTimeInput(e.target.value)}
          value={timeInput}
          className="date-input"
          type="text"
          disabled={!isDueDate}
        />
      </section>
      <div></div>
      <button onClick={() => onSave()} className="btn-save flex center">
        Save
      </button>
      <button onClick={() => onSave(true)} className="btn-remove flex center">
        Remove
      </button>
    </section>
  )
}
