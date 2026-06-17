import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client/react"
import { GET_GAME } from "../graphql/queries"
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../graphql/mutations"
import NoteCard from "../components/NoteCard"
import AddNoteForm from "../components/AddNoteForm"
import { getGameXP } from "../utils/xp"
import ConfirmModal from "../components/ConfirmModal"
import EditNoteModal from "../components/EditNoteModal"

function GameDetails() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: { id }
    })

    const [addNote] = useMutation(ADD_NOTE)
    const [deleteNote] = useMutation(DELETE_NOTE)
    const [updateNote] = useMutation(UPDATE_NOTE)
    const [noteToDelete, setNoteToDelete] = useState(null)
    const [noteToEdit, setNoteToEdit] = useState(null)

    const handleAddNote = ({ content }) => {
        addNote({
            variables: {
                note: {
                    content,
                    gameId: id
                }
            },
            refetchQueries: [{ query: GET_GAME, variables: { id } }]
        })
    }

    const handleDeleteNote = (noteId) => {
        deleteNote({
            variables: { id: noteId },
            refetchQueries: [{ query: GET_GAME, variables: { id } }]
        })
    }

    const handleUpdateNote = (noteId, content) => {
        updateNote({
            variables: { id: noteId, edits: { content } },
            refetchQueries: [{ query: GET_GAME, variables: { id } }]
        })
    }

    if (loading) return <h2>Loading...</h2>
    if (error) return <h2>Error: {error.message}</h2>

    const game = data.game

    return (
        <div className="container">
            <div className="game-header">
                <h1>{game.title}</h1>
            </div>
            <div className="game-meta">
                <div className="game-meta-item">
                    <span className="game-meta-label">Platforms</span>
                    <span className="game-meta-value">{game.platform.join(", ")}</span>
                </div>
                <div className="game-meta-item">
                    <span className="game-meta-label">Status</span>
                    <span className="game-meta-value">{game.status}</span>
                </div>
                <div className="game-meta-item">
                    <span className="game-meta-label">Genre</span>
                    <span className="game-meta-value">{game.genre}</span>
                </div>
                <div className="game-meta-item">
                    <span className="game-meta-label">Rating</span>
                    <span className="game-meta-value">{game.personalRating ? `${game.personalRating}/10` : "Not rated yet"}</span>
                </div>
                <div className="game-meta-item">
                    <span className="game-meta-label">XP</span>
                    <span className="game-meta-value">{getGameXP(game.status)} XP</span>
                </div>
            </div>
            <section className="details-section">
                <h3>Quest Notes</h3>

                {noteToDelete && (
                    <ConfirmModal
                        title="Confirm Delete"
                        message={`Are you sure you want to delete ${noteToDelete.content.substring(0, 50)}...?`}
                        onConfirm={() => {
                            handleDeleteNote(noteToDelete.id)
                            setNoteToDelete(null)
                        }}
                        onCancel={() => setNoteToDelete(null)}
                    />
                )}

                <AddNoteForm onAddNote={handleAddNote} />
                <div className="note-list">
                    {game.notes.length === 0 && (
                        <p>No notes yet, add your first note!</p>
                    )}

                    {game.notes.map(note => (
                        <div key={note.id} className="note-item">
                            <NoteCard note={note} />
                            <div className="note-actions">
                                <button className="edit" onClick={() => setNoteToEdit(note)}>
                                    Edit
                                </button>
                                <button className="delete" onClick={() => setNoteToDelete(note)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {noteToEdit && (
                <EditNoteModal
                    title="Edit Note"
                    noteContent={noteToEdit.content}
                    onClose={() => setNoteToEdit(null)}
                    onSave={(newContent) => {
                        handleUpdateNote(noteToEdit.id, newContent)
                        setNoteToEdit(null)
                    }}
                />
            )}
        </div>
    )
}

export default GameDetails