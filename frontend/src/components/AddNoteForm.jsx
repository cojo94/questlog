import { useState } from 'react';

function AddNoteForm({ onAddNote }) {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return

        onAddNote({
            content
        });
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-fields">

                <textarea
                    placeholder="Add your quest notes here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button className="modal-confirm" type="submit">
                    Add Note
                </button>
            </div>

        </form>
    );
}

export default AddNoteForm;