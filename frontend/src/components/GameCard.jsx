import { Link } from 'react-router-dom'

function GameCard({ game, onDelete }) {
    return (
        <div className="card">
            <Link to={`/game/${game.id}`}>
                <h2>{game.title}</h2>
            </Link>

            <p className="platform">
                Platform: {game.platform.join(", ")}
            </p>
            <button className="delete" onClick={() => onDelete(game.id)}>
                Delete
            </button>
        </div>
    )
}

export default GameCard