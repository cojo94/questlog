import { useQuery, useMutation } from "@apollo/client/react"
import { GET_GAMES } from '../graphql/queries'
import { ADD_GAME, DELETE_GAME } from '../graphql/mutations'
import AddGameForm from '../components/AddGameForm'
import GameList from '../components/GameList'

function Home() {
    const { loading, error, data } = useQuery(GET_GAMES)
    const [addGame] = useMutation(ADD_GAME)
    const [deleteGame] = useMutation(DELETE_GAME)

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
    if (error) return <h2>{error.message}</h2>

    return (
        <div className="container">
            <h1>🎮 Games Library</h1>
            <p>{data.games.length} games in the library</p>

            <AddGameForm onAdd={handleAddGame} />

            <GameList games={data.games} onDelete={handleDelete} />
        </div>
    )
}

export default Home