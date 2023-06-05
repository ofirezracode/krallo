export function BoardListTitle({ title, icon }) {
  return (
    <header className="board-title-preview flex align-center">
      <img src={icon} alt="member-icon" className="title-icon" />
      <h2>{title}</h2>
    </header>
  )
}