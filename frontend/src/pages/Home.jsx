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
    const [gameToDelete, setGameToDelete] = useState(null)

    const handleAddGame = ({ title, platform, status, genre, personalRating }) => {
        addGame({
            variables: {
                game: {
                    title,
                    platform: platform.split(",").map(p => p.trim()),
                    status,
                    genre,
                    personalRating
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

            {gameToDelete && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Delete Game</h2>

                        <p>Are you sure you want to remove {gameToDelete.title} from your backlog?</p>

                        <div className="modal-actions">
                            <button className="modal-cancel" onClick={() => setGameToDelete(null)}>
                                No
                            </button>
                            <button className="modal-danger" onClick={() => {
                                handleDelete(gameToDelete.id)
                                setGameToDelete(null)
                            }}>
                                Yes
                            </button>
                        </div>
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

            <GameList games={filteredGames} onDelete={setGameToDelete} />
        </div>
    )
}

export default Home