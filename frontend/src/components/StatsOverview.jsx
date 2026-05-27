function StatsOverview({ totalGames, playingGames, completedGames, notStartedGames }) {
    return (
        <div className="stats">
            <div className="stat-card">
                <p>Total: {totalGames}</p>
            </div>
            <div className="stat-card">
                <p>Playing: {playingGames}</p>
            </div>
            <div className="stat-card">
                <p>Completed: {completedGames}</p>
            </div>
            <div className="stat-card">
                <p>Not Started: {notStartedGames}</p>
            </div>
        </div>
    )
}

export default StatsOverview