import { utilService } from './util.service'

const DEFAULT_COLORS = [
  { code: '#baf3db', varName: '$green-subtler', colorTitle: 'Subtle Green' },
  { code: '#f8e6a0', varName: '$yellow-subtler', colorTitle: 'Subtle Yellow' },
  { code: '#ffe2bd', varName: '$orange-subtler', colorTitle: 'Subtle Orange' },
  { code: '#ffd2cc', varName: '$red-subtler', colorTitle: 'Subtle Red' },
  { code: '#dfd8fd', varName: '$purple-subtler', colorTitle: 'Subtle Purple' },
  { code: '#4bce97', varName: '$green-subtle', colorTitle: 'Green' },
  { code: '#e2b203', varName: '$yellow-subtle', colorTitle: 'Yellow' },
  { code: '#faa53d', varName: '$orange-subtle', colorTitle: 'Orange' },
  { code: '#f87462', varName: '$red-subtle', colorTitle: 'Red' },
  { code: '#9f8fef', varName: '$purple-subtle', colorTitle: 'Purple' },
  { code: '#1f845a', varName: '$green-bolder', colorTitle: 'Bold Green', isBold: true },
  { code: '#946f00', varName: '$yellow-bolder', colorTitle: 'Bold Yellow', isBold: true },
  { code: '#b65c02', varName: '$orange-bolder', colorTitle: 'Bold Orange', isBold: true },
  { code: '#ca3521', varName: '$red-bolder', colorTitle: 'Bold Red', isBold: true },
  { code: '#6e5dc6', varName: '$purple-bolder', colorTitle: 'Bold Purple', isBold: true },
  { code: '#cce0ff', varName: '$blue-subtler', colorTitle: 'Subtle Blue' },
  { code: '#c1f0f5', varName: '$teal-subtler', colorTitle: 'Subtle Teal' },
  { code: '#d3f1a7', varName: '$lime-subtler', colorTitle: 'Subtle Lime' },
  { code: '#fdd0ec', varName: '$magenta-subtler', colorTitle: 'Subtle Magenta' },
  { code: '#dcdfe4', varName: '$gray-subtler', colorTitle: 'Subtle Gray' },
  { code: '#579dff', varName: '$blue-subtle', colorTitle: 'Blue' },
  { code: '#60c6d2', varName: '$teal-subtle', colorTitle: 'Teal' },
  { code: '#94c748', varName: '$lime-subtle', colorTitle: 'Lime' },
  { code: '#e774bb', varName: '$magenta-subtle', colorTitle: 'Magenta' },
  { code: '#8590a2', varName: '$gray-subtle', colorTitle: 'Gray' },
  { code: '#0c66e4', varName: '$blue-bolder', colorTitle: 'Bold Blue', isBold: true },
  { code: '#1d7f8c', varName: '$teal-bolder', colorTitle: 'Bold Teal', isBold: true },
  { code: '#5b7f24', varName: '$lime-bolder', colorTitle: 'Bold Lime', isBold: true },
  { code: '#ae4787', varName: '$magenta-bolder', colorTitle: 'Bold Magenta', isBold: true },
  { code: '#626f86', varName: '$gray-bolder', colorTitle: 'Bold Gray', isBold: true },
]

const possibleCoverColors = ['#4bce97', '#e2b203', '#faa53d', '#f87462', '#9f8fef', '#579dff', '#60c6d2', '#94c748', '#e774bb', '#8590a2']

const baselineBoardLabels = [
  {
    _id: '5k4a2d8h',
    title: '',
    color: {
      code: '#4bce97',
      varName: '$green-subtle',
      colorTitle: 'Green',
    },
  },
  {
    _id: '9j7b6f3c',
    title: '',
    color: {
      code: '#e2b203',
      varName: '$yellow-subtle',
      colorTitle: 'Yellow',
    },
  },
  {
    _id: '1v9t8y2q',
    title: '',
    color: {
      code: '#faa53d',
      varName: '$orange-subtle',
      colorTitle: 'Orange',
    },
  },
  {
    _id: '3e5r2f7g',
    title: '',
    color: {
      code: '#f87462',
      varName: '$red-subtle',
      colorTitle: 'Red',
    },
  },
  {
    _id: '6y8u2i4o',
    title: '',
    color: {
      code: '#9f8fef',
      varName: '$purple-subtle',
      colorTitle: 'Purple',
    },
  },
  {
    _id: '7t6r4e5w',
    title: '',
    color: {
      code: '#579dff',
      varName: '$blue-subtle',
      colorTitle: 'Blue',
    },
  },
  {
    _id: '2q4w6e8r',
    title: '',
    color: {
      code: '#60c6d2',
      varName: '$teal-subtle',
      colorTitle: 'Teal',
    },
  },
  {
    _id: '3r4t5y6u',
    title: '',
    color: {
      code: '#94c748',
      varName: '$lime-subtle',
      colorTitle: 'Lime',
    },
  },
  {
    _id: '8i9o2p4a',
    title: '',
    color: {
      code: '#e774bb',
      varName: '$magenta-subtle',
      colorTitle: 'Magenta',
    },
  },
  {
    _id: '5y3t2r4e',
    title: '',
    color: {
      code: '#8590a2',
      varName: '$gray-subtle',
      colorTitle: 'Gray',
    },
  },
]

export const colorService = {
  getRandomColor,
  isColorDark,
  getAvgColor,
  baselineBoardLabels,
  possibleCoverColors,
  getBgColors,
  getNewBoardImgs,
  getNewBoardColors,
}

function getNewBoardImgs() {
  return [
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686390040/photo-1686019539035-d034ab44a075_vezhjv.jpg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686390076/photo-1685945899241-38453441f85b_qsohto.jpg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686390136/photo-1686080186823-f61c47ded839_up1jco.jpg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686390156/photo-1685472065771-f57d15b4c585_zof94q.jpg',
  ]
}

function getNewBoardColors() {
  return [
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384751/707f35bc691220846678_pjgxni.svg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384735/d106776cb297f000b1f4_aixvzg.svg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384777/8ab3b35f3a786bb6cdac_f6yj4u.svg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg',
    'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389855/92e67a71aaaa98dea5ad_ogsw1y.svg',
  ]
}

function getRandomColor() {
  const index = utilService.getRandomIntInclusive(0, DEFAULT_COLORS.length - 1)
  return DEFAULT_COLORS[index].code
}

function _hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return [r, g, b]
}

function _getLuminance(r, g, b) {
  const a = [r, g, b].map((v) => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function isColorDark(hex) {
  const rgb = _hexToRgb(hex)
  const threshold = 0.25
  const luminance = _getLuminance(...rgb)
  return luminance <= threshold
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })
}

async function getAvgColor(url) {
  const image = await loadImage(url)
  // create a canvas element with the same dimensions as the image
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height

  // draw the image onto the canvas
  const context = canvas.getContext('2d')
  context.drawImage(image, 0, 0)

  // get the image data
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data

  // calculate the average color
  const colors = { r: 0, g: 0, b: 0 }

  for (let i = 0; i < imageData.length; i += 4) {
    colors.r += imageData[i]
    colors.g += imageData[i + 1]
    colors.b += imageData[i + 2]
  }

  const pixelCount = imageData.length / 4
  colors.r /= pixelCount
  colors.g /= pixelCount
  colors.b /= pixelCount

  return `rgb(${Math.round(colors.r)}, ${Math.round(colors.g)}, ${Math.round(colors.b)})`
}

function getBgColors() {
  return [
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384751/707f35bc691220846678_pjgxni.svg',
      emoji: '❄️',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384735/d106776cb297f000b1f4_aixvzg.svg',
      emoji: '🌊',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384777/8ab3b35f3a786bb6cdac_f6yj4u.svg',
      emoji: '🔮',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384787/a7c521b94eb153008f2d_ex0umg.svg',
      emoji: '🌈',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686384798/aec98becb6d15a5fc95e_monues.svg',
      emoji: '🍑',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389848/b75536d1afb40980ca57_ftydw5.svg',
      emoji: '🌸',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389855/92e67a71aaaa98dea5ad_ogsw1y.svg',
      emoji: '🌎',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389863/941e9fef7b1b1129b904_nm94td.svg',
      emoji: '👽',
    },
    {
      imgUrl: 'https://res.cloudinary.com/dp0y6hy2o/image/upload/v1686389871/1cbae06b1a428ad6234a_rhmbqu.svg',
      emoji: '🌋',
    },
  ]
}
