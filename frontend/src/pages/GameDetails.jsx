import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@apollo/client/react"
import { GET_GAME } from "../graphql/queries"
import { ADD_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../graphql/mutations"
import NoteCard from "../components/NoteCard"
import AddNoteForm from "../components/AddNoteForm"
import { getGameXP } from "../utils/xp"

function GameDetails() {
    const { id } = useParams()

    const { loading, error, data } = useQuery(GET_GAME, {
        variables: { id }
    })

    const [addNote] = useMutation(ADD_NOTE)
    const [deleteNote] = useMutation(DELETE_NOTE)
    const [updateNote] = useMutation(UPDATE_NOTE)

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
            <h1>{game.title}</h1>

            <p>
                Platforms: {game.platform.join(", ")}
            </p>
            <p>
                Status: {game.status}
            </p>
            <p>
                Genre: {game.genre}
            </p>
            <p>
                Personal Rating: {game.personalRating ? `${game.personalRating}/10` : "Not rated yet"}
            </p>
            <p>
                Current XP: {getGameXP(game.status)} XP
            </p>
            <section className="details-section">
                <h3>Quest Notes</h3>

                <AddNoteForm onAddNote={handleAddNote} />
                <div className="note-list">
                    {game.notes.length === 0 && (
                        <p>No notes yet</p>
                    )}

                    {game.notes.map(note => (
                        <div key={note.id} className="note-item">
                            <NoteCard note={note} />
                            <button onClick={() => handleDeleteNote(note.id)}>
                                Delete
                            </button>
                            <button onClick={() => {
                                const newContent = prompt("Edit note content:", note.content)
                                if (newContent !== null && newContent.trim() !== "") {
                                    handleUpdateNote(note.id, newContent)
                                }
                            }}>
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default GameDetails