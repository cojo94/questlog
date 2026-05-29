function GameFilters({ searchTerm, setSearchTerm, platformFilter, setPlatformFilter, statusFilter, setStatusFilter, clearFilters, platforms }) {

    return (
        <div className="filters">
            <input
                type="text"
                placeholder="Search by game title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
            >
                <option value="all">All Platforms</option>

                {platforms.map(platform => (
                    <option key={platform} value={platform}>
                        {platform}
                    </option>
                ))}
            </select>

            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
            >
                <option value="all">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="Playing">Playing</option>
                <option value="Completed">Completed</option>

            </select>

            <button onClick={clearFilters} disabled={searchTerm === "" && platformFilter === "all" && statusFilter === "all"}>
                Clear
            </button>
        </div>
    )
}

export default GameFilters