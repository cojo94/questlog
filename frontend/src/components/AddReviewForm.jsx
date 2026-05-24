import { useState } from 'react';

function AddReviewForm({ onAddReview, authors }) {
    const [rating, setRating] = useState("");
    const [content, setContent] = useState("");
    const [authorId, setAuthorId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!rating || !content.trim() || !authorId) return

        onAddReview({
            rating: Number(rating),
            content,
            author_id: authorId
        });
        setRating("");
        setContent("");
        setAuthorId("");
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
            <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
            >
                <option value="">Select Author</option>

                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>
            <button type="submit">
                Add Review
            </button>
        </form>
    );
}

export default AddReviewForm;