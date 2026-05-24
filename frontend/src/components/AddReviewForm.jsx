import { useState } from 'react';

function AddReviewForm({ onAddReview }) {
    const [rating, setRating] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !content.trim()) return

        onAddReview({ rating: Number(rating), content });
        setRating("");
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                min="1"
                max="10"
                placeholder="Rating (1-10)"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />

            <input
                placeholder="Review content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">
                Add Review
            </button>
        </form>
    );
}

export default AddReviewForm;