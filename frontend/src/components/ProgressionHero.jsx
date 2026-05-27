function ProgressionHero({ completedGames, playingGames }) {
    const xpFromCompleted = completedGames * 100
    const xpFromPlaying = playingGames * 25 // Assuming 25 XP per game in progress
    const totalXP = xpFromCompleted + xpFromPlaying

    const xpPerLevel = 500
    const level = Math.floor(totalXP / 500) + 1 // Level up every 500 XP
    const currentLevelXP = totalXP % xpPerLevel
    const xpToNextLevel = xpPerLevel - currentLevelXP
    const xpProgress = (currentLevelXP / xpPerLevel) * 100

    return (
        <section className="progression-hero">
            <h2 className="xp-level">Level: {level}</h2>

            <div className="xp-progress-outer">
                <div className="xp-progress-inner" style={{ width: `${xpProgress}%` }}>
                    {xpProgress.toFixed(0)}%
                </div>
            </div>

            <div className="xp-meta">
                <p>{currentLevelXP} / {xpPerLevel}</p>
                <p>{xpToNextLevel} XP to next level</p>
                <p>Total XP: {totalXP}</p>
            </div>
        </section>
    );
}

export default ProgressionHero