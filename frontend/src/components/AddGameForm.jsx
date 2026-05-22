import { useState } from 'react'

function AddGameForm({ onAdd }) {
    const [title, setTitle] = useState("")
    const [platform, setPlatform] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim() || !platform.trim()) return
        onAdd({ title, platform })
        setTitle("")
        setPlatform("")
    }

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">
                Add Game
            </button>
        </form>
    )
}

export default AddGameForm