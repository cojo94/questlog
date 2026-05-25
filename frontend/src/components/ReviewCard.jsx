function ReviewCard({ review }) {
    return (
        <div className="card review-card">
            <h4>{review.author.name}</h4>
            <p>Rating: {review.rating}/10</p>
            <p>{review.content}</p>
        </div>
    )
}

export default ReviewCard