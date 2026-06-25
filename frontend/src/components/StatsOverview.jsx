function StatsOverview({ totalGames, playingGames, completedGames, notStartedGames }) {
    return (
        <section className="game-meta stats-overview">
            <article className="stats-overview-card">
                <p className="game-meta-label">Total</p>
                <p className="game-meta-value">{totalGames}</p>
            </article>
            <article className="stats-overview-card">
                <p className="game-meta-label">Playing</p>
                <p className="game-meta-value">{playingGames}</p>
            </article>
            <article className="stats-overview-card">
                <p className="game-meta-label">Completed</p>
                <p className="game-meta-value">{completedGames}</p>
            </article>
            <article className="stats-overview-card">
                <p className="game-meta-label">Not Started</p>
                <p className="game-meta-value">{notStartedGames}</p>
            </article>
        </section>
    )
}

export default StatsOverview