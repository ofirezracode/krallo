import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsCalendar3, BsClock, BsTag, BsPerson } from 'react-icons/bs'
import { colorService } from '../../services/color.service'
import { utilService } from '../../services/util.service'
import { PopoverCmpHeader } from './popover-cmp-header'
import { LabelEditor } from './popover-labels/label-editor'
import { Checkbox } from '../checkbox'
import { UserImg } from '../user-img'
import { userService } from '../../services/user.service'
import { setCurrFilterBy } from '../../store/board.actions'

export function PopoverFilter({ onFilterBy, onClose }) {
  const board = useSelector((storeState) => storeState.boardModule.currBoard)
  const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

  const [filterKeyword, setFilterKeyword] = useState('')

  const [members, setMembers] = useState([])
  const [filterMembers, setFilterMembers] = useState([])
  const [noMembers, setNoMembers] = useState({ members: '' })

  const [dates, setDates] = useState([
    { key: 'no-date', category: 'time', value: 'No dates' },
    { key: 'overdue', category: 'time', value: 'Overdue' },
    { key: 'next-day', category: 'time', value: 'Due in the next day' },
    { key: 'completed', category: 'complete', value: 'Marked as complete' },
    { key: 'not-completed', category: 'complete', value: 'Not marked as complete' },
  ])
  const [filterDates, setFilterDates] = useState([])

  const [labels, setLabels] = useState([])
  const [filterLabels, setFilterLabels] = useState([])
  const [noLabels, setNoLabels] = useState({ labels: '' })

  const [loggedinUser, setLoggedinUser] = useState({})

  useEffect(() => {
    if (board) {
      setMembers(board.members)
      setLabels(board.labels)

      const user = userService.getLoggedInUser()
      setLoggedinUser(user)

      const userIdx = board && board.members ? board.members.findIndex((member) => member._id === user._id) : -1
      let newMembers
      if (userIdx >= 0) {
        newMembers = [...board.members]
        let member = newMembers.splice(userIdx, 1)
        newMembers.unshift(member)
      }

      // if a member / label was removed from the board but its also filtered by
      // if so - remove them as filter
      checkFilterValidity()
    }
  }, [board])

  useEffect(() => {
    if (filterBy.keywords) {
      setFilterKeyword(filterBy.keywords)
    }
    if (filterBy.dates && filterBy.dates.length > 0) {
      setFilterDates(filterBy.dates)
    }
    if (filterBy.labels && filterBy.labels.length > 0) {
      if (filterBy.labels === 'no-labels') {
        setNoLabels({ labels: 'no-labels' })
      } else {
        setFilterLabels(filterBy.labels)
      }
    }
    if (filterBy.members && filterBy.members.length > 0) {
      if (filterBy.members === 'no-members') {
        setNoMembers({ members: 'no-members' })
      } else {
        setFilterMembers(filterBy.members)
      }
    }
  }, [filterBy])

  function checkFilterValidity() {
    if (filterMembers.length > 0) {
      const newFilterMembers = filterMembers.filter((filterMember) => members.some((member) => member._id === filterMember._id))
      setFilterMembers(newFilterMembers)
    }

    if (filterLabels.length > 0) {
      const newFilterLabels = filterLabels.filter((filterLabel) => labels.some((label) => label._id === filterLabel._id))
      setFilterLabels(newFilterLabels)
    }
  }

  function onKeywordChange(newKeyword) {
    setFilterKeyword(newKeyword)
    onFilterChange('keywords', newKeyword)
  }

  function onClickMember(e, member) {
    e.stopPropagation()

    const memberIdx = filterMembers.findIndex((filterMemberId) => filterMemberId === member)
    const newFilterMembers = filterMembers.slice()
    if (memberIdx >= 0) {
      newFilterMembers.splice(memberIdx, 1)
    } else {
      newFilterMembers.push(member)
    }

    if (noMembers.members === 'no-members') {
      setNoMembers({ members: '' })
    }

    setFilterMembers(newFilterMembers)
    onFilterChange('members', newFilterMembers)
  }

  function onClickNoMember(e) {
    e.stopPropagation()

    setFilterMembers([])

    let newNoMembers
    if (noMembers.members === 'no-members') {
      newNoMembers = { members: '' }
    } else {
      newNoMembers = { members: 'no-members' }
    }

    setNoMembers(newNoMembers)

    onFilterChange('members', newNoMembers.members ? newNoMembers.members : undefined)
  }

  function onClickDate(e, date) {
    e.stopPropagation()

    const dateIdx = filterDates.findIndex((filterDate) => filterDate.key === date.key)
    const newFilterDates = filterDates.slice()
    if (dateIdx >= 0) {
      newFilterDates.splice(dateIdx, 1)
    } else {
      const sameCategoryDateIdx = filterDates.findIndex((filterDate) => filterDate.category === date.category)
      if (sameCategoryDateIdx >= 0) newFilterDates.splice(sameCategoryDateIdx, 1)
      newFilterDates.push(date)
    }

    setFilterDates(newFilterDates)
    onFilterChange('dates', newFilterDates)
  }

  function onClickLabel(e, label) {
    e.stopPropagation()

    const labelIdx = filterLabels.findIndex((filterLabel) => filterLabel._id === label._id)
    const newFilterLabels = filterLabels.slice()
    if (labelIdx >= 0) {
      newFilterLabels.splice(labelIdx, 1)
    } else {
      newFilterLabels.push(label)
    }

    if (noLabels.labels === 'no-labels') {
      setNoLabels({ labels: '' })
    }

    setFilterLabels(newFilterLabels)
    onFilterChange('labels', newFilterLabels)
  }

  function onClickNoLabel(e) {
    e.stopPropagation()

    setFilterLabels([])

    let newNoLabels
    if (noLabels.labels === 'no-labels') {
      newNoLabels = { labels: '' }
    } else {
      newNoLabels = { labels: 'no-labels' }
    }

    setNoLabels(newNoLabels)

    onFilterChange('labels', newNoLabels.labels ? newNoLabels.labels : undefined)
  }

  function onFilterChange(key, value) {
    const filterBy = {}
    if (filterKeyword) {
      filterBy.keywords = filterKeyword
    }
    if (filterMembers.length > 0) {
      filterBy.members = filterMembers
    } else if (noMembers.members) {
      filterBy.members = 'no-members'
    }
    if (filterDates.length > 0) {
      filterBy.dates = filterDates
    }
    if (filterLabels.length > 0) {
      filterBy.labels = filterLabels
    } else if (noLabels.labels) {
      filterBy.labels = 'no-labels'
    }

    filterBy[key] = value

    setCurrFilterBy(filterBy)
    // onFilterBy(filterBy)
  }

  return (
    <section className="popover-filter">
      <PopoverCmpHeader title="Filter" onClose={onClose} />
      <section className="popover-content">
        <div className="filter-container filter-keywords">
          <h4 className="labels-title">Keyword</h4>
          <input type="search" value={filterKeyword} onChange={(e) => onKeywordChange(e.target.value)} placeholder="Enter a keyword..." />
          <p className="keyword-help">Search cards, comments, checklists and more.</p>
        </div>
        <div className="filter-container filter-members">
          <h4 className="labels-title">Members</h4>
          <ul className="members-list clean-list">
            <li className="no-members flex" key="no-members">
              <Checkbox isChecked={noMembers.members} onToggle={onClickNoMember} />
              <button onClick={(e) => onClickNoMember(e)} className="member-btn flex align-center">
                <BsPerson className="member-img img-no-date" />
                <label>No members</label>
              </button>
            </li>
            {members &&
              members.map((member) => {
                const isLabelChecked = filterMembers ? filterMembers.some((filteredMember) => filteredMember._id === member._id) : false
                let memberFullname = member.fullname
                if (member._id === loggedinUser._id) memberFullname = 'Cards assigned to me'
                return (
                  <li className="flex" key={member._id}>
                    <Checkbox isChecked={isLabelChecked} onToggle={onClickMember} onClickProps={member} />
                    <button onClick={(e) => onClickMember(e, member)} className="member-btn flex align-center">
                      <UserImg user={member} size="xsmall" />
                      <label>{memberFullname}</label>
                    </button>
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="filter-container filter-date">
          <h4 className="labels-title">Due date</h4>
          <ul className="dates-list clean-list">
            {dates.map((date) => {
              const isLabelChecked = filterDates ? filterDates.some((filterDate) => filterDate.key === date.key) : false
              return (
                <li className="flex" key={date.key}>
                  <Checkbox isChecked={isLabelChecked} onToggle={onClickDate} onClickProps={date} />
                  <button onClick={(e) => onClickDate(e, date)} className="date-btn flex align-center">
                    {date.key === 'no-date' && <BsCalendar3 className="date-img img-no-date" />}
                    {date.key === 'overdue' && <BsClock className="date-img img-overdue" />}
                    {date.key === 'next-day' && <BsClock className="date-img img-next-day" />}
                    <label>{date.value}</label>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="filter-container filter-labels">
          <h4 className="labels-title">Labels</h4>
          <ul className="labels-list flex column clean-list">
            <li className="no-labels flex" key="no-labels">
              <Checkbox isChecked={noLabels.labels} onToggle={onClickNoLabel} />
              <button onClick={(e) => onClickNoLabel(e)} className="label-btn flex align-center">
                <BsTag className="label-img img-no-date" />
                <label>No labels</label>
              </button>
            </li>
            {labels.map((label) => {
              const isLabelChecked = filterLabels ? filterLabels.some((filterLabel) => filterLabel._id === label._id) : false

              let labelStyle = { backgroundColor: '#091e420f' }
              if (label.color) labelStyle = { backgroundColor: label.color.code }

              let colorClass = 'light-background'
              if (colorService.isColorDark(labelStyle.backgroundColor)) colorClass = 'dark-background'

              const labelTitle = label.title ? label.title : ''

              return (
                <li key={label._id}>
                  <Checkbox isChecked={isLabelChecked} onToggle={onClickLabel} onClickProps={label} />
                  <button onClick={(e) => onClickLabel(e, label)} className={`label-color ${colorClass}`} style={labelStyle}>
                    <label>{labelTitle}</label>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </section>
  )
}
