import BoardPreview from './board-preview'
import BoardListTitle from './board-list-title'

export default function BoardList({ boards, toggleIsStarred, isOnlyStarred, onAddBoard }) {
  let filteredBoards = isOnlyStarred ? boards.filter((board) => board.isStarred) : boards

  return (
    <section className="board-list-container">
      {isOnlyStarred ? <BoardListTitle title={'Starred boards'} /> : <BoardListTitle title={'Your boards'} />}
      <ul className="board-list clean-list flex wrap">
        {filteredBoards.map((board) => {
          let boardStyle = {}
          if (board.style) {
            if (board.style.type === 'bgColor') {
              boardStyle = { backgroundColor: board.style.bgColor }
            } else if (board.style.type === 'img') {
              boardStyle = { backgroundImage: `url(${board.style.imgUrl})` }
            }
          }
          return (
            <li key={board._id} style={boardStyle} className="board-preview">
              <BoardPreview board={board} toggleIsStarred={toggleIsStarred} />
            </li>
          )
        })}
        {!isOnlyStarred && (
          <li className="new-board" onClick={onAddBoard}>
            <article className="flex align-center justify-center">
              <p>Create new board</p>
            </article>
          </li>
        )}
      </ul>
    </section>
  )
}
