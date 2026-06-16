function StatsOverview({ totalGames, playingGames, completedGames, notStartedGames }) {
    return (
        <section className="game-meta stats-overview">
            <article className="game-meta-item">
                <span className="game-meta-label">Total</span>
                <span className="game-meta-value"> {totalGames}</span>
            </article>
            <article className="game-meta-item">
                <span className="game-meta-label">Playing</span>
                <span className="game-meta-value"> {playingGames}</span>
            </article>
            <article className="game-meta-item">
                <span className="game-meta-label">Completed</span>
                <span className="game-meta-value"> {completedGames}</span>
            </article>
            <article className="game-meta-item">
                <span className="game-meta-label">Not Started</span>
                <span className="game-meta-value"> {notStartedGames}</span>
            </article>
        </section>
    )
}

export default StatsOverview