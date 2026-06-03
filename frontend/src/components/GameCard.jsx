import { Link } from 'react-router-dom'

function GameCard({ game, onDelete, onEdit }) {
    return (
        <div className="card">
            <Link to={`/game/${game.id}`}>
                <h2>{game.title}</h2>
            </Link>

            <p className="platform">
                Platform: {game.platform.join(", ")}
            </p>
            <p className="status">
                Status: {game.status}
            </p>
            <p>
                Personal Rating: {game.personalRating ? `${game.personalRating}/10` : "Not rated yet"}
            </p>
            <div className="actions">
                <button className="edit" onClick={() => {
                    onEdit(game)
                }}>
                    Edit
                </button>
                <button className="delete" onClick={() => onDelete(game)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default GameCard