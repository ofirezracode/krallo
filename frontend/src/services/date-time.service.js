export const dateTimeService = {
  formatToDMYAndTime,
  getTimestampFromDateObject,
  getTimestampFromDMY,
  getTimestampFromDateAndTime,
  getDatePickerDateFromDMY,
  getTimeFromTimestamp,
  getDMYFromDatePickerDate,
  getTodaysDateDMY,
  getCurrentTime,
  getNextDate,
  getPrevDate,
  isStartDateBeforeEndDate,
  isValidTime,
  hasTimestampPassed,
  isTimestampNextDay,
  formatTimestampToTaskDetailsDate,
}

function formatToDMYAndTime(timestamp) {
  const date = new Date(timestamp)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  hours %= 12
  hours = hours === 0 ? 12 : hours
  const formattedDate = `${day}/${month}/${year}`
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`
  return { date: formattedDate, time: formattedTime }
}

function getDatePickerDateFromDMY(DMY) {
  const splitDMY = DMY.split('/')
  const date = new Date(splitDMY[2], splitDMY[1] - 1, splitDMY[0])
  return date
}

function getTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  hours %= 12
  hours = hours === 0 ? 12 : hours
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`
  return formattedTime
}

function getDMYFromDatePickerDate(DatePickerDate) {
  const date = new Date(DatePickerDate)
  return formatToDMYAndTime(getTimestampFromDateObject(date)).date
}

function getTimestampFromDateAndTime(dateString, timeString) {
  dateString = dateString.toString()
  const endYearIndex = dateString.indexOf(' 00:00:00')
  const truncatedDateString = dateString.slice(0, endYearIndex)

  const dateTimeString = `${truncatedDateString} ${timeString}`
  const dateTime = new Date(dateTimeString)

  const timestamp = dateTime.getTime()
  return timestamp
}

function getTimestampFromDateObject(dateString) {
  if (typeof dateString.getMonth !== 'function' && (!dateString.includes(':') || !dateString.includes('/'))) return NaN
  return Date.parse(dateString)
}

function getTimestampFromDMY(dateString) {
  if (!dateString.includes('/')) return NaN
  return Date.parse(getDatePickerDateFromDMY(dateString.split('/')))
}

function getTodaysDateDMY() {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()
  return `${day}/${month}/${year}`
}

function getCurrentTime() {
  const date = new Date()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes
  const time = hours + ':' + minutes + ' ' + ampm
  return time
}

function getNextDate(currDateStr) {
  const currDate = new Date(currDateStr)
  const nextDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 1, 0, 0, 0, 0)
  return nextDate
}

function getPrevDate(currDateStr) {
  const currDate = new Date(currDateStr)
  const prevDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 1, 0, 0, 0, 0)
  return prevDate
}

function isStartDateBeforeEndDate(startDate, endDate) {
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  if (startDateObj.getTime() > endDateObj.getTime()) {
    return false
  } else {
    return true
  }
}

function isValidTime(timeString) {
  const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)\s?(AM|PM)$/i
  if (timeString.at(1) === ':') timeString = '0' + timeString

  if (timeFormat.test(timeString)) {
    const [time, period] = timeString.split(' ')
    const [hours, minutes] = time.split(':')

    const timeObj = new Date()
    timeObj.setHours((+hours % 12) + (period === 'PM' ? 12 : 0))
    timeObj.setMinutes(+minutes)

    return +timeObj.getHours() === +hours + (period === 'PM' ? 12 : 0) && timeObj.getMinutes().toString().padStart(2, '0') === minutes
  }

  return false
}

function hasTimestampPassed(timestamp) {
  return Date.now() >= timestamp
}

function isTimestampNextDay(timestamp) {
  const currentDate = new Date()
  const startOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
  const startOfTomorrow = new Date(startOfToday)
  const startOfTwoDays = new Date(startOfToday)
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1)
  startOfTwoDays.setDate(startOfTomorrow.getDate() + 2)

  const inputDate = new Date(timestamp)

  return inputDate >= startOfTomorrow && inputDate < startOfTwoDays
}

function formatTimestampToTaskDetailsDate(timestamp) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const date = new Date(timestamp).toLocaleString('en-US', options)
  const [month, day] = date.split(' ').slice(0, 2)
  // const time = date.split(' ')[3] + ' ' + date.split(' ')[4]
  const time = date.split(' ').slice(3).join(' ')

  return `${day.replace(',', '')} ${month} at ${time}`
}
