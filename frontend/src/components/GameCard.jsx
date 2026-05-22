function GameCard({ game, onDelete }) {
    return (
        <div className="card">
            <h2>{game.title}</h2>
            <p className="platform">Platform: {game.platform.join(", ")}</p>
            <button className="delete" onClick={() => onDelete(game.id)}>
                Delete
            </button>
        </div>
    )
}

export default GameCard