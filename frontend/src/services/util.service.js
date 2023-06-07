export const utilService = {
  makeId,
  getRandomIntInclusive,
  getRandomColor,
  debounce,
  randomPastTime,
  saveToStorage,
  loadFromStorage,
  getAvgColor,
  formatTime,
  formatDate,
  hasTimestampPassed,
}

function makeId(length = 8) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function randomPastTime() {
  const HOUR = 1000 * 60 * 60
  const DAY = 1000 * 60 * 60 * 24
  const WEEK = 1000 * 60 * 60 * 24 * 7

  const pastTime = getRandomIntInclusive(HOUR, WEEK)
  return Date.now() - pastTime
}

function formatTime(time) {
  let now = Date.now()
  let diff = now - time

  const SECOND = 1000
  const MINUTE = SECOND * 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7
  const MONTH = DAY * 30
  const YEAR = DAY * 365

  if (diff < MINUTE) return 'just now'
  if (diff < SECOND * 5) return 'a few seconds ago'
  if (diff < MINUTE) return 'a minute ago'
  if (diff < MINUTE * 2) return '2 minutes ago'
  if (diff < MINUTE * 3) return '3 minutes ago'
  if (diff < MINUTE * 4) return '4 minutes ago'
  if (diff < MINUTE * 5) return 'a few minutes ago'
  if (diff < MINUTE * 10) return '10 minutes ago'
  if (diff < HOUR) return 'less than a hour ago'
  if (diff < HOUR * 3) return 'a couple of hours ago'
  if (diff < DAY) return 'today'
  if (diff < DAY * 2) return 'yesterday'
  if (diff < DAY * 3) return '2 days ago'
  if (diff < WEEK) return 'about a week ago'

  return _getFormattedTime(time)
}

function _getFormattedTime(t) {
  var d = new Date(t)
  // console.log('d', d)

  var str = 'At ' + d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' Time: ' + d.getHours() + ':' + d.getMinutes()
  return str
}

function debounce(func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

async function getAvgColor(imgUrl) {
  const PROXY_URL = 'https://api.allorigins.win/get?url=' // Proxy server URL

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'

    img.onload = function () {
      const blockSize = 5
      const defaultRGB = { r: 0, g: 0, b: 0 }
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      if (!context) {
        reject(new Error('Canvas context is not supported.'))
        return
      }

      const height = (canvas.height = img.naturalHeight || img.offsetHeight || img.height)
      const width = (canvas.width = img.naturalWidth || img.offsetWidth || img.width)

      context.drawImage(img, 0, 0)

      try {
        const data = context.getImageData(0, 0, width, height).data
        let rgb = { r: 0, g: 0, b: 0 }
        let count = 0

        for (let i = 0; i < data.length; i += blockSize * 4) {
          count++
          rgb.r += data[i]
          rgb.g += data[i + 1]
          rgb.b += data[i + 2]
        }

        rgb.r = Math.floor(rgb.r / count)
        rgb.g = Math.floor(rgb.g / count)
        rgb.b = Math.floor(rgb.b / count)

        resolve(rgb)
      } catch (error) {
        reject(new Error('Error retrieving image data.'))
      }
    }

    img.onerror = function () {
      reject(new Error('Failed to load image.'))
    }

    const proxyImgUrl = PROXY_URL + encodeURIComponent(imgUrl) // Use the proxy server URL to fetch the image
    img.src = proxyImgUrl
  })
}

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()

  let year = ''
  if (date.getFullYear() !== new Date().getFullYear()) {
    year = `, ${date.getFullYear()}`
  }

  return `${month} ${day}${year}`
}

function hasTimestampPassed(timestamp) {
  return Date.now() >= timestamp
}
