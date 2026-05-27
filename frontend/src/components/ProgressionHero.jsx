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
            <div className="xp-main-row">
                <div className="level-display">
                    Level {level}
                </div>

                <div className="xp-bar-wrapper">
                    <div className="xp-progress-outer">
                        <div className="xp-progress-inner" style={{ width: `${xpProgress}%` }}>
                            {currentLevelXP} / 500 XP
                        </div>
                    </div>
                </div>

                <div className="xp-next">
                    {xpToNextLevel} XP to level {level + 1}
                </div>
            </div>

            <p className="xp-total">
                Total XP: {totalXP}
            </p>
        </section>
    );
}

export default ProgressionHero