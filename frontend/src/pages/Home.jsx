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

    const handleAddGame = ({ title, platform }) => {
        addGame({
            variables: {
                game: {
                    title,
                    platform: platform.split(",").map(p => p.trim())
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

    const platforms = [...new Set(data.games.flatMap(game => game.platform))]

    const search = searchTerm.toLowerCase()

    const filteredGames = data.games.filter(game => {
        const matchesSearch =
            game.title.toLowerCase().includes(search)

        const matchesPlatform =
            platformFilter === "all" ||
            game.platform.includes(platformFilter)

        return matchesSearch && matchesPlatform
    })

    const clearFilters = () => {
        setSearchTerm("")
        setPlatformFilter("all")
    }

    return (
        <div className="container">
            <h1>🎮 Games Library</h1>
            <p>{data.games.length} games in the library</p>

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

                <button onClick={clearFilters} disabled={searchTerm === "" && platformFilter === "all"}>
                    Clear
                </button>
            </div>

            <GameList games={filteredGames} onDelete={handleDelete} />
        </div>
    )
}

export default Home