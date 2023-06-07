import React, { useEffect, useState } from 'react'
import { BsCheck2 } from 'react-icons/bs'

export function Checkbox({ isChecked, onToggle, onClickProps }) {
  const [checked, setChecked] = useState(isChecked)

  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])
  function onClick(e) {
    setChecked((prev) => !prev)
    onToggle(e, onClickProps)
  }

  console.log('isChecked', isChecked)
  return (
    <label className="checkbox flex center">
      <input onChange={onClick} type="checkbox" checked={checked ? 'checked' : ''} />
      <span className="checkmark flex center"></span>
      {checked && <BsCheck2 className="check-icon" />}
    </label>
  )
}
