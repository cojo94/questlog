export function useGameStats(games) {
    const totalGames = games.length
    const playingGames = games.filter(game => game.status === "Playing").length
    const completedGames = games.filter(game => game.status === "Completed").length
    const notStartedGames = games.filter(game => game.status === "Not Started").length

    const totalXP = completedGames * 100 + playingGames * 25
    const level = Math.floor(totalXP / 500) + 1

    const completionRate =
        totalGames > 0
            ? Math.round((completedGames / totalGames) * 100)
            : 0

    return {
        totalGames,
        playingGames,
        completedGames,
        notStartedGames,
        totalXP,
        level,
        completionRate
    }
}