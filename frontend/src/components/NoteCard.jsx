function NoteCard({ note }) {
    return (
        <div className="card note-card">
            <p>{note.content}</p>

        </div>
    )
}

export default NoteCard