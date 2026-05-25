import { useState } from 'react'

function AddGameForm({ onAdd }) {
    const [title, setTitle] = useState("")
    const [platform, setPlatform] = useState("")
    const [status, setStatus] = useState("Not Started")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !platform.trim()) return
        onAdd({ title, platform, status })
        setTitle("")
        setPlatform("")
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-fields">
                <input
                    placeholder="Game title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    placeholder="Platform"
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Not Started">Not Started</option>
                    <option value="Playing">Playing</option>
                    <option value="Completed">Completed</option>
                </select>
                <button type="submit">
                    Add Game
                </button>
            </div>
        </form>
    )
}

export default AddGameForm