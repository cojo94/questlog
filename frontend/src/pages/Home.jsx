import { useState } from 'react'
import { useQuery, useMutation } from "@apollo/client/react"
import { GET_GAMES } from '../graphql/queries'
import { ADD_GAME, DELETE_GAME } from '../graphql/mutations'
import AddGameForm from '../components/AddGameForm'
import GameList from '../components/GameList'
import ProgressionHero from '../components/ProgressionHero'
import StatsOverview from '../components/StatsOverview'
import GameFilters from '../components/GameFilters'
import { useGameFilters } from '../hooks/useGameFilters'
import { useGameStats } from '../hooks/useGameStats'

function Home() {
    const { loading, error, data } = useQuery(GET_GAMES)
    const [addGame] = useMutation(ADD_GAME)
    const [deleteGame] = useMutation(DELETE_GAME)

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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

    const games = data?.games ?? []

    const {
        searchTerm,
        setSearchTerm,
        platformFilter,
        setPlatformFilter,
        statusFilter,
        setStatusFilter,
        platforms,
        filteredGames,
        clearFilters
    } = useGameFilters(games)

    const stats = useGameStats(games)

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error.message}</h2>

    return (
        <div className="container">
            <ProgressionHero completedGames={stats.completedGames} playingGames={stats.playingGames} />

            <StatsOverview
                totalGames={stats.totalGames}
                playingGames={stats.playingGames}
                completedGames={stats.completedGames}
                notStartedGames={stats.notStartedGames}
            />

            <button className="add-game-button" onClick={() => setIsAddModalOpen(true)}>
                Add Game
            </button>

            {isAddModalOpen && (
                <div className="modal-backdrop" >
                    <div className="modal">
                        <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>
                            x
                        </button>

                        <h2>Add Game</h2>

                        <AddGameForm onAdd={(game) => {
                            handleAddGame(game)
                            setIsAddModalOpen(false)
                        }}
                        />
                    </div>
                </div>
            )}

            <GameFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                platformFilter={platformFilter}
                setPlatformFilter={setPlatformFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                clearFilters={clearFilters}
                platforms={platforms}
            />

            <GameList games={filteredGames} onDelete={handleDelete} />
        </div>
    )
}

export default Home