function StatsOverview({ totalGames, playingGames, completedGames, notStartedGames }) {
    return (
        <section className="stats-overview">
            <article className="stats-overview-card">
                <p>Total: {totalGames}</p>
            </article>
            <article className="stats-overview-card">
                <p>Playing: {playingGames}</p>
            </article>
            <article className="stats-overview-card">
                <p>Completed: {completedGames}</p>
            </article>
            <article className="stats-overview-card">
                <p>Not Started: {notStartedGames}</p>
            </article>
        </section>
    )
}

export default StatsOverview