import { create } from "zustand";

const useGameStore = create((set, get) => ({
    balance: 0,
    energy: 500,
    currentLevelProgress: 0,
    clickPower: 1,
    passiveIncome: 0,
    isLoading: true,
    currentLevel: 1,
    levelLimit: 100,

    setBalance: (value) => set({balance: value}),
    setEnergy: (value) => set({energy: value}),
    setCurrentLevelProgress: (value) => set({currentLevelProgress: value}),
    setClickPower: (value) => set({clickPower: value}),
    setPassiveIncome: (value) => set({passiveIncome: value}),
    setIsLoading: (value) => set({isLoading: value}),
    setCurrentLevel: (value) => set({currentLevel: value}),

    handlePlanetClick: () => {
        const {energy, clickPower} = get();

        if (energy > 0) {
            set((state) => ({
                balance: state.balance + clickPower,
                energy: state.energy - 1,
                currentLevelProgress: state.currentLevelProgress + 1
            }))
        }
    },
}));

export default useGameStore;