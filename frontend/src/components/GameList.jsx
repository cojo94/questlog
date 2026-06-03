import GameCard from "./GameCard";
import { useState } from "react";
import { useMutation } from "@apollo/client/react"
import { UPDATE_GAME } from "../graphql/mutations";

function GameList({ games, onDelete }) {
    const [gameToEdit, setGameToEdit] = useState(null)
    const [editTitle, setEditTitle] = useState("")
    const [editPlatform, setEditPlatform] = useState("")
    const [editStatus, setEditStatus] = useState("Not Started")
    const [editGenre, setEditGenre] = useState("")
    const [editPersonalRating, setEditPersonalRating] = useState("")
    const [updateGame] = useMutation(UPDATE_GAME);

    const handleOpenEditModal = (game) => {
        setGameToEdit(game)
        setEditTitle(game.title)
        setEditPlatform(game.platform.join(", "))
        setEditStatus(game.status)
        setEditGenre(game.genre || "")
        setEditPersonalRating(game.personalRating ? String(game.personalRating) : "")
    };

    const handleSaveEdit = async () => {
        await updateGame({
            variables: {
                id: gameToEdit.id,
                edits: {
                    title: editTitle,
                    platform: editPlatform.split(",").map(p => p.trim()).filter(Boolean),
                    status: editStatus,
                    genre: editGenre,
                    personalRating: editPersonalRating ? Number(editPersonalRating) : null
                },
            },
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

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSaveEdit();
                        }}>
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
                                <label>
                                    Genre:
                                    <select
                                        value={editGenre}
                                        onChange={(e) => setEditGenre(e.target.value)}
                                    >
                                        <option value="">Select Genre</option>
                                        <option value="RPG">RPG</option>
                                        <option value="Action">Action</option>
                                        <option value="Adventure">Adventure</option>
                                        <option value="Strategy">Strategy</option>
                                        <option value="Horror">Horror</option>
                                        <option value="Simulation">Simulation</option>
                                        <option value="Racing">Racing</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </label>
                                <label>
                                    Personal Rating (optional):
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        placeholder="1-10"
                                        value={editPersonalRating}
                                        onChange={(e) => setEditPersonalRating(e.target.value)}
                                    />
                                </label>
                                <button className="modal-confirm" type="submit">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default GameList;