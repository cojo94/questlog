import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client/react"

import { GET_GAME } from "../graphql/queries"

function GameDetails() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: { id }
    })

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>{error.message}</h2>

    const game = data.game

    return (
        <div className="container">
            <h1>{game.title}</h1>

            <p>
                Platforms: {game.platform.join(", ")}
            </p>

            <h3>Reviews</h3>

            {game.reviews.length === 0 && (
                <p>No reviews yet</p>
            )}

            {game.reviews.map(review => (
                <div key={review.id} className="card">
                    <p>Rating: {review.rating}/10</p>
                    <p>{review.content}</p>
                </div>
            ))}
        </div>
    )
}

export default GameDetails