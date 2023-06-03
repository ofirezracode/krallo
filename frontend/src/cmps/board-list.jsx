import BoardPreview from "./board-preview";
import BoardListTitle from "./board-list-title";

export default function BoardList({ boards, toggleIsStarred, isOnlyStarred, onAddBoard }) {

    const starredBoards = boards.filter(board => board.isStarred)

    return (
        <section className="board-list-container">
            {isOnlyStarred ? <BoardListTitle title={'Starred boards'} /> : <BoardListTitle title={'Your boards'} />}
            <ul className="board-list clean-list flex wrap">
                {isOnlyStarred ? <BoardPreview boards={starredBoards} toggleIsStarred={toggleIsStarred} isOnlyStarred={isOnlyStarred} /> :
                    <BoardPreview boards={boards} toggleIsStarred={toggleIsStarred} isOnlyStarred={isOnlyStarred} onAddBoard={onAddBoard} />}
            </ul>
        </section>
    )
}