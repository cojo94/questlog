import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client/react"
import { GET_GAME } from "../graphql/queries"
import ReviewCard from "../components/ReviewCard"

function GameDetails() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: { id }
    })

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error.message}</h2>

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
                <ReviewCard key={review.id} review={review} />
            ))}
        </div>
    )
}

export default GameDetails