import React from 'react'

function BoardHeader({ board }) {
  return (
    <header className="board-header flex">
      <h1>{board.title}</h1>
    </header>
  )
}

export default BoardHeader
