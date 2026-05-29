import { useState } from 'react';

export function useGameFilters(games) {
    const [searchTerm, setSearchTerm] = useState("")
    const [platformFilter, setPlatformFilter] = useState("all") // "all" means no filter, or show all platforms
    const [statusFilter, setStatusFilter] = useState("all")

    const platforms = [...new Set(games.flatMap(game => game.platform))]

    const search = searchTerm.toLowerCase()

    const filteredGames = games.filter(game => {
        const matchesSearch =
            game.title.toLowerCase().includes(search)

        const matchesPlatform =
            platformFilter === "all" ||
            game.platform.includes(platformFilter)

        const matchesStatus =
            statusFilter === "all" ||
            game.status === statusFilter

        return matchesSearch && matchesPlatform && matchesStatus
    })

    const clearFilters = () => {
        setSearchTerm("")
        setPlatformFilter("all")
        setStatusFilter("all")
    }

    return {
        searchTerm,
        setSearchTerm,
        platformFilter,
        setPlatformFilter,
        statusFilter,
        setStatusFilter,
        platforms,
        filteredGames,
        clearFilters
    }
}