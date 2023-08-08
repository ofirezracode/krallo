import React from 'react'

export function UserImg({ size, hover, user, padding }) {
  let imgClasses = ''

  if (!size) {
    imgClasses = 'medium'
  } else {
    imgClasses = size
  }

  if (hover) {
    imgClasses += ` ${hover}`
  }

  if (padding) {
    imgClasses += ' padding'
  } else {
    imgClasses += ' no-padding'
  }

  return (
    <div className="img-container">
      {user.imgUrl ? (<img className={`user-img ${imgClasses}`} src={user.imgUrl} alt={user.fullname}
        title={`${user.fullname} (${user.fullname.replace(' ', '').toLowerCase()})`} />
      ) : (
        <div className={`user-img ${imgClasses}`} style={{ backgroundColor: '#94c748' }} />)}
    </div>
  )
}
