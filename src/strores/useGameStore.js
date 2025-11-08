import { create } from "zustand";
import upgrades from "../data/upgrades";
import { getUpgradeCost, getUpgradePower } from "../utils/upgradeMath";

const useGameStore = create((set, get) => ({
    balance: 30,
    energy: 500,
    currentLevelProgress: 0,
    clickPower: 1,
    passiveIncome: 0,
    isLoading: true,
    currentLevel: 1,

    upgradesLevels: {},

    setBalance: (value) => set({balance: value}),
    setEnergy: (value) => set({energy: value}),
    setCurrentLevelProgress: (value) => set({currentLevelProgress: value}),
    setClickPower: (value) => set({clickPower: value}),
    setPassiveIncome: (value) => set({passiveIncome: value}),
    setIsLoading: (value) => set({isLoading: value}),
    setCurrentLevel: (value) => set({currentLevel: value}),

    getRequiredClicksForLevel: (level = null) => {
        const lvl = level ?? get().currentLevel;
        return Math.ceil(400 * Math.pow(1.5, lvl - 1))
    },

    handlePlanetClick: () => {
        const {energy, clickPower} = get();

        if (energy <= 0) return;

        if (energy > 0) {
            set((state) => ({
                balance: state.balance + clickPower,
                energy: state.energy - 1,
                currentLevelProgress: state.currentLevelProgress + 1
            }))
        }

        const { currentLevelProgress: newProgress, currentLevel: lvlNow } = get();
        const requiredClicks = get().getRequiredClicksForLevel(lvlNow);

        if (newProgress >= requiredClicks) {
            set((state) => ({
                currentLevel: state.currentLevel + 1,
                currentLevelProgress: 0
            }));
        }
    },

    buyUpgrade: (category, id) => {
        const {currentLevel, balance, upgradesLevels} = get();
        const upgrade = upgrades[category].find((item) => item.id === id);
        if (!upgrade) return;

        const currentUpgradeLevel = upgradesLevels[id] || 0;
        if (currentUpgradeLevel >= upgrade.maxLevel) return;
        if (currentLevel < upgrade.unlockLevel) return;

        const cost = getUpgradeCost(upgrade.basePrice, currentUpgradeLevel);
        if (balance < cost) return;

        const newLevel = currentUpgradeLevel + 1;
        const newUpgrades = {
            ...upgradesLevels,
            [id]: newLevel,
        }

        const newPower = getUpgradePower(upgrade.basePower, newLevel, upgrade.type);

        set({
            balance: balance - cost,
            upgradesLevels: newUpgrades,
        });

        if (category === "click") set((state) => ({clickPower: state.clickPower + newPower}));
        else if (category === "income") set({passiveIncome: newPower});
    }
}));

export default useGameStore;