import { createContext, useState, useContext } from "react";


const GameContext = createContext();

export function GameProvider({ children }) {
    const [balance, setBalance] = useState(0);
    const [energy, setEnergy] = useState(500);
    const [currentLevelProgress, setCurrentLevelProgress] = useState(0);
    const [clickPower, setClickPower] = useState(1);
    const [passiveIncome, setPassiveIncome] = useState(0);

    const levelLimit = 1000;

    const handlePlanetClick = () => {
        if (energy > 0) {
            setBalance(prev => prev + clickPower);
            setEnergy(prev => prev - 1);
            setCurrentLevelProgress(prev => prev + 1)
        }
    }

    const value = {
        balance, setBalance,
        energy, setEnergy,
        currentLevelProgress, setCurrentLevelProgress,
        clickPower, setClickPower,
        passiveIncome, setPassiveIncome,
        levelLimit,
        handlePlanetClick
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    return useContext(GameContext);
}