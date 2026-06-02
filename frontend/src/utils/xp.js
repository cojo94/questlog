export const getGameXP = (status) => {
    switch (status) {
        case "Completed":
            return 100;
        case "Playing":
            return 25;
        default:
            return 0;
    }
}

export const xpPerLevel = 500