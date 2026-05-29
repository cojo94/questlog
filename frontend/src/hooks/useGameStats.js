export function useGameStats(games) {
    const totalGames = games.length
    const playingGames = games.filter(game => game.status === "Playing").length
    const completedGames = games.filter(game => game.status === "Completed").length
    const notStartedGames = games.filter(game => game.status === "Not Started").length

    return {
        totalGames,
        playingGames,
        completedGames,
        notStartedGames
    }
}