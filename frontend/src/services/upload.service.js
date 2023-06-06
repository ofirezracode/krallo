export const uploadService = {
  uploadImg,
  uploadImgFromUrl,
  // loadImageFromInput
}
async function uploadImgFromUrl(ev) {
  console.log('hi')
  console.log(ev)
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
    console.log(imgUrl)
    return imgUrl
  } catch (err) {
    console.error('Failed to upload', err)
    throw err
  }
}

// function onImgInput(ev, func) {
//   loadImageFromInput(ev, func)
//   // loadImageFromInput(ev, renderImg)
// }

// CallBack func will run on success load of the img
// function loadImageFromInput(ev, onImageReady) {
//   const reader = new FileReader()
//   // After we read the file
//   reader.onload = function (event) {
//     let img = new Image() // Create a new html img element
//     img.src = event.target.result // Set the img src to the img file we read
//     // Run the callBack func, To render the img on the canvas
//     img.onload = onImageReady.bind(null, event.target.result)
//     // Can also do it this way:
//     // img.onload = () => onImageReady(img)
//   }
//   console.log(ev.target)
//   if (ev.target) {
//     reader.readAsDataURL(ev.target.files[0]) // Read the file we picked

//   }
// }