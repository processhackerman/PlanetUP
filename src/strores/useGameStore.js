import { create } from "zustand";

const useGameStore = create((set, get) => ({
    balance: 0,
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
        return Math.ceil(100 * Math.pow(1.4, lvl - 1))
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
}));

export default useGameStore;