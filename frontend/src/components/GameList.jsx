import GameCard from "./GameCard";

function GameList({ games, onDelete }) {
    return (
        <div className="grid">
            {games.map(game => (
                <GameCard
                    key={game.id}
                    game={game}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default GameList