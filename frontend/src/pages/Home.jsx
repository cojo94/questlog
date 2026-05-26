import { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client/react"
import { GET_GAMES } from '../graphql/queries'
import { ADD_GAME, DELETE_GAME } from '../graphql/mutations'
import AddGameForm from '../components/AddGameForm'
import GameList from '../components/GameList'

function Home() {
    const { loading, error, data } = useQuery(GET_GAMES)
    const [addGame] = useMutation(ADD_GAME)
    const [deleteGame] = useMutation(DELETE_GAME)
    const [searchTerm, setSearchTerm] = useState("")
    const [platformFilter, setPlatformFilter] = useState("all") // "all" means no filter, or show all platforms
    const [statusFilter, setStatusFilter] = useState("all")

    const handleAddGame = ({ title, platform, status }) => {
        addGame({
            variables: {
                game: {
                    title,
                    platform: platform.split(",").map(p => p.trim()),
                    status
                }
            },
            refetchQueries: [{ query: GET_GAMES }]
        })
    }

    const handleDelete = (id) => {
        deleteGame({
            variables: { id },
            refetchQueries: [{ query: GET_GAMES }]
        })
    }

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error.message}</h2>

    const totalGames = data.games.length

    const playingGames = data.games.filter(game => game.status === "Playing").length
    const completedGames = data.games.filter(game => game.status === "Completed").length
    const notStartedGames = data.games.filter(game => game.status === "Not Started").length

    const xpFromCompleted = completedGames * 100
    const xpFromPlaying = playingGames * 25 // Assuming 25 XP per game in progress
    const totalXP = xpFromCompleted + xpFromPlaying
    const level = Math.floor(totalXP / 500) + 1 // Level up every 500 XP
    const currentLevelXP = totalXP % 500
    const xpToNextLevel = 500 - currentLevelXP
    const xpProgress = (currentLevelXP / 500) * 100

    const platforms = [...new Set(data.games.flatMap(game => game.platform))]

    const search = searchTerm.toLowerCase()

    const filteredGames = data.games.filter(game => {
        const matchesSearch =
            game.title.toLowerCase().includes(search)

        const matchesPlatform =
            platformFilter === "all" ||
            game.platform.includes(platformFilter)

        const matchesStatus =
            statusFilter === "all" ||
            game.status === statusFilter

        return matchesSearch && matchesPlatform && matchesStatus
    })

    const clearFilters = () => {
        setSearchTerm("")
        setPlatformFilter("all")
        setStatusFilter("all")
    }

    return (
        <div className="container">
            <h1 className="page-title">QuestLog</h1>
            <p className="subtitle">
                Track your backlog. Complete games. Gain XP.
            </p>
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
            <div className="xp-card">
                <h2 className="xp-level">Level: {level}</h2>
                <p className="xp-next-level">{xpToNextLevel} XP to next level</p>

                <div className="xp-progress-outer">
                    <div className="xp-progress-inner" style={{ width: `${xpProgress}%` }}>
                        {xpProgress.toFixed(0)}%
                    </div>
                </div>

                <p className="xp-total">Total XP: {totalXP}</p>
            </div>
            <AddGameForm onAdd={handleAddGame} />

            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by game title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                >
                    <option value="all">All Platforms</option>

                    {platforms.map(platform => (
                        <option key={platform} value={platform}>
                            {platform}
                        </option>
                    ))}
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="all">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Playing">Playing</option>
                    <option value="Completed">Completed</option>

                </select>

                <button onClick={clearFilters} disabled={searchTerm === "" && platformFilter === "all" && statusFilter === "all"}>
                    Clear
                </button>
            </div>

            <GameList games={filteredGames} onDelete={handleDelete} />
        </div>
    )
}

export default Home