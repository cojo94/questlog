import { useState } from 'react'

function AddGameForm({ onAdd }) {
    const [title, setTitle] = useState("")
    const [platform, setPlatform] = useState("")
    const [status, setStatus] = useState("Not Started")
    const [genre, setGenre] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !platform.trim() || !genre) return
        onAdd({ title, platform, status, genre })
        setTitle("")
        setPlatform("")
        setStatus("Not Started")
        setGenre("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-fields">
                <label>Title:
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </label>
                <label>Platform:
                    <input
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    />
                </label>
                <label>Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Not Started">Not Started</option>
                        <option value="Playing">Playing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </label>
                <label>Genre:
                    <select
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
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
                <button className="modal-confirm" type="submit">
                    Add Game
                </button>
            </div>
        </form>
    )
}

export default AddGameForm