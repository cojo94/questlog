import { getGameXP, xpPerLevel } from "../utils/xp"

function ProgressionHero({ completedGames, playingGames }) {
    const xpFromCompleted = completedGames * getGameXP("Completed")
    const xpFromPlaying = playingGames * getGameXP("Playing")
    const totalXP = xpFromCompleted + xpFromPlaying

    const level = Math.floor(totalXP / xpPerLevel) + 1 // Level up every 500 XP
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
                            {currentLevelXP} / {xpPerLevel} XP
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