import { BsPerson } from 'react-icons/bs'

export function BoardListTitle({ title }) {
  return (
    <header className="board-title-preview flex center">
      <BsPerson className="title-icon" strokeWidth={'.5px'} />
      <h2>{title}</h2>
    </header>
  )
}