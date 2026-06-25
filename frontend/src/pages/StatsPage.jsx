import { useQuery } from "@apollo/client/react"
import { GET_GAMES } from '../graphql/queries'
import StatsCard from '../components/StatsCard'
import { useGameStats } from '../hooks/useGameStats'
import { xpPerLevel } from '../utils/xp'

export default function StatsPage() {
    const { loading, error, data } = useQuery(GET_GAMES)

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error.message}</h2>

    const games = data.games;
    const stats = useGameStats(games)
    const levelProgress = Math.round(((stats.totalXP % xpPerLevel) / xpPerLevel) * 100)

    return (
        <main className="stats-page">
            <div className="container character-sheet">
                <section className="sheet-left">
                    <div className="profile-card">
                        <div className="avatar">{/* placeholder avatar */}
                            <span className="avatar-initial">P</span>
                        </div>
                        <h2 className="player-name">Player</h2>
                        <p className="player-tag">Gamer</p>

                        <div className="level-block">
                            <div className="level-label">Level</div>
                            <div className="level-value">{stats.level}</div>
                        </div>

                        <div className="xp-block">
                            <div className="xp-info">{stats.totalXP} XP</div>
                            <div className="xp-bar">
                                <div className="xp-fill" style={{ width: `${levelProgress}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="stats-overview">
                        <div className="stats-overview-card">
                            <p>Completed<br /><strong>{stats.completedGames}</strong></p>
                        </div>
                        <div className="stats-overview-card">
                            <p>Playing<br /><strong>{stats.playingGames}</strong></p>
                        </div>
                        <div className="stats-overview-card">
                            <p>Not Started<br /><strong>{stats.notStartedGames}</strong></p>
                        </div>
                        <div className="stats-overview-card">
                            <p>Total<br /><strong>{stats.totalGames}</strong></p>
                        </div>
                    </div>
                </section>

                <section className="sheet-right">
                    <header className="sheet-header">
                        <h1>Character Sheet</h1>
                        <p className="muted">A concise view of your in-game progress</p>
                    </header>

                    <div className="sheet-section">
                        <h3>Attributes</h3>
                        <div className="attributes">
                            <StatsCard label="Favorite Genre" value={stats.favoriteGenre} />
                            <StatsCard label="Completion Rate" value={`${stats.completionRate}%`} />
                            <StatsCard label="Total XP" value={stats.totalXP} />
                        </div>
                    </div>

                    <div className="sheet-section">
                        <h3>Recent Games</h3>
                        <div className="games-list">
                            {games.slice(0, 6).map(g => (
                                <div key={g.id} className="game-row">
                                    <div className="game-title">{g.title}</div>
                                    <div className="game-status muted">{g.status}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}