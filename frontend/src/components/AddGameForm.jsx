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
                <button className="modal-confirm" type="submit">
                    Add Game
                </button>
            </div>
        </form>
    )
}

export default AddGameForm