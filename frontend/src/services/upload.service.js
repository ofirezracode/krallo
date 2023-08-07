export const uploadService = {
  uploadImg,
  uploadImgFromUrl,
  generateLetterImage
}
async function uploadImgFromUrl(ev) {
  const CLOUD_NAME = "dp0y6hy2o"
  const UPLOAD_PRESET = "lpje9iag"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}
async function uploadImg(ev) {
  const CLOUD_NAME = "dp0y6hy2o"
  const UPLOAD_PRESET = "lpje9iag"
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    })
    const imgUrl = await res.json()
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

function generateLetterImage(color, letter) {
  const canvas = document.createElement('canvas')
  canvas.width = 170 // Adjust the dimensions as needed
  canvas.height = 170

  const ctx = canvas.getContext('2d')

  // Set background color
  ctx.fillStyle = color
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Draw the letter in the middle
  ctx.font = 'bold 100px Arial'
  ctx.fillStyle = 'rgba(0,0,0,.5)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(letter, canvas.width / 2, canvas.height / 2)

  // Convert canvas to data URL
  const imageUrl = canvas.toDataURL('image/png')

  return imageUrl
}