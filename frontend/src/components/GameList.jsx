import GameCard from "./GameCard";
import { useState } from "react";
import { useMutation } from "@apollo/client/react"
import { UPDATE_GAME } from "../graphql/mutations";

function GameList({ games, onDelete }) {
    const [gameToEdit, setGameToEdit] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editPlatform, setEditPlatform] = useState("")
    const [editStatus, setEditStatus] = useState("Not Started")
    const [updateGame] = useMutation(UPDATE_GAME);

    const handleOpenEditModal = (game) => {
        setGameToEdit(game)
        setEditTitle(game.title)
        setEditPlatform(game.platform.join(", "))
        setEditStatus(game.status)
    };

    const handleSaveEdit = async () => {
        await updateGame({
            variables: {
                id: gameToEdit.id,
                edits: {
                    title: editTitle,
                    platform: editPlatform.split(", ").map(p => p.trim()).filter(Boolean),
                    status: editStatus
                }
            }
        });
        setGameToEdit(null);
    };

    return (
        <>
            <div className="grid">
                {games.map(game => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onDelete={onDelete}
                        onEdit={handleOpenEditModal}
                    />
                ))}
            </div>
            {gameToEdit && (
                <div className="modal-backdrop" >
                    <div className="modal">
                        <button className="modal-close" onClick={() => setGameToEdit(null)}>
                            x
                        </button>
                        <h2>Edit Game</h2>

                        <div className="form-fields">
                            <label>
                                Title:
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                />
                            </label>
                            <label>
                                Platform:
                                <input
                                    type="text"
                                    value={editPlatform}
                                    onChange={(e) => setEditPlatform(e.target.value)}
                                />
                            </label>
                            <label>
                                Status:
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                >
                                    <option value="Not Started">Not Started</option>
                                    <option value="Playing">Playing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </label>
                        </div>

                        <div className="modal-actions">
                            <button className="modal-cancel" onClick={() => setGameToEdit(null)}>
                                Cancel
                            </button>
                            <button className="modal-confirm" onClick={handleSaveEdit}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default GameList;