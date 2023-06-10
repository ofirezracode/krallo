export function BoardListTitle({ title, icon, fontWeight }) {
  return (
    <header className="board-title-preview flex align-center">
      <img src={icon} alt="member-icon" className="title-icon" />
      <h2 style={{ fontWeight: fontWeight }}>{title}</h2>
    </header >
  )
}