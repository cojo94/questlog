import { useQuery } from "@apollo/client/react"
import { GET_GAMES } from '../graphql/queries'
import StatsCard from '../components/StatsCard'
import { useGameStats } from '../hooks/useGameStats'

export default function StatsPage() {
    const { loading, error, data } = useQuery(GET_GAMES)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const games = data.games;
    const stats = useGameStats(games)

    return (
        <main className="stats-page">
            <div className="container">
                <section className="stats-header">
                    <h1>Player Stats</h1>
                    <p>Track your gaming progress and achievements</p>
                </section>

                <section className="stats-grid">
                    <StatsCard label="Level" value={stats.level} />
                    <StatsCard label="Total XP" value={stats.totalXP} />
                    <StatsCard label="Completion Rate" value={`${stats.completionRate}%`} />
                    <StatsCard label="Total Games" value={stats.totalGames} />
                    <StatsCard label="Completed" value={stats.completedGames} />
                    <StatsCard label="Playing" value={stats.playingGames} />
                    <StatsCard label="Not Started" value={stats.notStartedGames} />
                </section>
            </div>

        </main>
    )
}