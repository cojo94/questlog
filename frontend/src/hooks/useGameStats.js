import { getGameXP, xpPerLevel } from "../utils/xp"

export function useGameStats(games) {
    const totalGames = games.length
    const playingGames = games.filter(game => game.status === "Playing").length
    const completedGames = games.filter(game => game.status === "Completed").length
    const notStartedGames = games.filter(game => game.status === "Not Started").length

    const totalXP = completedGames * getGameXP("Completed") + playingGames * getGameXP("Playing")
    const level = Math.floor(totalXP / xpPerLevel) + 1 // Level up every 500 XP

    const completionRate =
        totalGames > 0
            ? Math.round((completedGames / totalGames) * 100)
            : 0

    const genreCounts = games.reduce((counts, game) => {
        if (!game.genre) return counts

        counts[game.genre] = (counts[game.genre] || 0) + 1
        return counts
    }, {})

    const favoriteGenre =
        Object.keys(genreCounts).length > 0
            ? Object.keys(genreCounts).reduce((a, b) =>
                genreCounts[a] > genreCounts[b] ? a : b
            )
            : "N/A"

    return {
        totalGames,
        playingGames,
        completedGames,
        notStartedGames,
        totalXP,
        level,
        completionRate,
        favoriteGenre
    }
}