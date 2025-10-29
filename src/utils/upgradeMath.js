export function getUpgradeCost(basePrice, level) {
    return Math.floor(basePrice * Math.pow(1.8, level - 1));
}

export function getUpgradePower(basePower, level, type) {
    if (type === "multiplier") {
        return 1 + basePower * level;
    }

    return basePower * level;
}