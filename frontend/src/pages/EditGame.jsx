import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_GAME } from '../graphql/queries'
import { UPDATE_GAME } from '../graphql/mutations'

function EditGame() {
    const { id } = useParams()
    const [title, setTitle] = useState("")
    const [platform, setPlatform] = useState("")
    const [updateGame] = useMutation(UPDATE_GAME)
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: { id }
    })

    useEffect(() => {
        if (data?.game) {
            setTitle(data.game.title)
            setPlatform(data.game.platform.join(", "))
        }
    }, [data])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await updateGame({
            variables: {
                id,
                edits: {
                    title,
                    platform: platform.split(",").map(p => p.trim())
                }
            }
        })

        navigate(`/game/${id}`, { replace: true })
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const game = data.game

    return (
        <div className="container edit-page">
            <h1>Edit {game.title}</h1>
            <form onSubmit={handleSubmit} className="edit-form">
                <input
                    placeholder="Game title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}

export default EditGame