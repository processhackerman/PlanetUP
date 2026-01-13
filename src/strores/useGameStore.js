import { create } from "zustand";
import upgrades from "../data/upgrades";
import { getUpgradeCost, getUpgradePower } from "../utils/upgradeMath";

const useGameStore = create((set, get) => {
  return {
    balance: 250,
    energy: 500,
    maxEnergy: 500,
    currentLevelProgress: 0,
    clickPower: 1,
    passiveIncome: 1000,
    isLoading: true,
    currentLevel: 3,
    incomeMultiplier: 1,
    critBoostActive: false,
    currentSkinId: "skin_1",
    ownedSkins: ["skin_1"],
    passiveInterval: null,
    lastActiveAt: Date.now(),

    upgradesLevels: {},

    boostsState: {
      boost_1: { active: false, remaining: 0, cooldown: 0 },
      boost_2: { active: false, remaining: 0, cooldown: 0 },
      boost_3: { active: false, remaining: 0, cooldown: 0 },
    },

    setBalance: (value) => set({ balance: value }),
    setEnergy: (value) => set({ energy: value }),
    setCurrentLevelProgress: (value) => set({ currentLevelProgress: value }),
    setClickPower: (value) => set({ clickPower: value }),
    setPassiveIncome: (value) => set({ passiveIncome: value }),
    setIsLoading: (value) => set({ isLoading: value }),
    setCurrentLevel: (value) => set({ currentLevel: value }),

    getRequiredClicksForLevel: (level = null) => {
      const lvl = level ?? get().currentLevel;
      return Math.ceil(400 * Math.pow(1.5, lvl - 1));
    },

    handlePlanetClick: () => {
      const { energy, clickPower, critBoostActive, incomeMultiplier } = get();

      let income = clickPower * incomeMultiplier;

      if (energy <= 0) return;

      if (critBoostActive) {
        if (Math.random() < 0.1) income *= 10;
      }

      if (energy > 0) {
        set((state) => ({
          balance: state.balance + income,
          energy: state.energy - 1,
          currentLevelProgress: state.currentLevelProgress + income,
        }));
      }

      console.log(income);

      const { currentLevelProgress: newProgress, currentLevel: lvlNow } = get();
      const requiredClicks = get().getRequiredClicksForLevel(lvlNow);

      if (newProgress >= requiredClicks) {
        set((state) => ({
          currentLevel: state.currentLevel + 1,
          currentLevelProgress: 0,
        }));
      }
    },

    buyUpgrade: (category, id) => {
      const { currentLevel, balance, upgradesLevels } = get();
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
      };

      const newPower = getUpgradePower(
        upgrade.basePower,
        newLevel,
        upgrade.type
      );

      set({
        balance: balance - cost,
        upgradesLevels: newUpgrades,
      });

      if (category === "click")
        set((state) => ({ clickPower: state.clickPower + newPower }));
      else if (category === "passive") set({ passiveIncome: newPower });
    },

    buyBoost: (boostId) => {
      const boosts = get().boostsState;
      const boost = boosts[boostId];
      const index = boostId.toString().slice(-1) - 1;
      const boostData = upgrades["boost"][index];

      const balance = get().balance;

      if (boost.cooldown > 0) return;
      if (boost.active) return;
      if (balance < boostData.basePrice) return;

      set({ balance: balance - boostData.basePrice });

      set((state) => ({
        boostsState: {
          ...state.boostsState,
          [boostId]: {
            active: true,
            remaining: boostData.duration,
            cooldown: boostData.reload,
          },
        },
      }));

      get().activateBoostEffect(boostId);
      get().startBoostTimers(boostId);
    },

    activateBoostEffect: (boostId) => {
      if (boostId === "boost_1") {
        set((s) => ({ incomeMultiplier: s.incomeMultiplier * 2 }));
      } else if (boostId === "boost_2") {
        const interval = setInterval(() => {
          if (!get().boostsState[boostId].active) return;
          get().handlePlanetClick();
        }, 100);
      }

      if (boostId === "boost_3") {
        set({ critBoostActive: true });
      }
    },

    startBoostTimers: (id) => {
      const tick = setInterval(() => {
        set((state) => {
          const b = state.boostsState[id];

          if (b.remaining <= 1) {
            clearInterval(tick);
            get().endBoostEffects(id);

            return {
              boostsState: {
                ...state.boostsState,
                [id]: {
                  ...b,
                  active: false,
                },
              },
            };
          }

          return {
            boostsState: {
              ...state.boostsState,
              [id]: {
                ...b,
                remaining: b.remaining - 1,
              },
            },
          };
        });
      }, 1000);

      const cooldown = setInterval(() => {
        set((state) => {
          const b = state.boostsState[id];

          if (b.cooldown <= 1) {
            clearInterval(cooldown);
            return {
              boostsState: {
                ...state.boostsState,
                [id]: {
                  ...b,
                  cooldown: 0,
                },
              },
            };
          }

          return {
            boostsState: {
              ...state.boostsState,
              [id]: {
                ...b,
                cooldown: b.cooldown - 1,
              },
            },
          };
        });
      }, 1000);
    },

    endBoostEffects: (id) => {
      if (id === "boost_1") {
        set((s) => ({ incomeMultiplier: s.incomeMultiplier / 2 }));
      }

      if (id === "boost_3") {
        set({ critBoostActive: false });
      }
    },

    restoreEnergy: () => {
      set((state) => {
        if (state.energy >= state.maxEnergy) return {};
        return { energy: state.energy + 1 };
      });
    },

    buySkin: (skinId) => {
      const { balance, ownedSkins } = get();
      if (ownedSkins.includes(skinId)) {
        set({ currentSkinId: skinId });
        return;
      }

      const skin = upgrades.skin.find((s) => s.id === skinId);
      if (!skin || balance < skin.price) return;

      set({
        balance: balance - skin.price,
        ownedSkins: [...ownedSkins, skinId],
        currentSkinId: skinId,
      });
    },

    startPassiveIncome: () => {
      const { passiveInterval } = get();
      if (passiveInterval) return;

      const interval = setInterval(() => {
        const income = Math.ceil(get().passiveIncome / 60 / 3);
        if (income <= 0) return;

        set((state) => ({
          balance: state.balance + income,
        }));
      }, 20000); // каждые 10 сек

      set({ passiveInterval: interval });
    },

    stopPassiveIncome: () => {
      const interval = get().passiveInterval;
      if (interval) {
        clearInterval(interval);
        set({ passiveInterval: null });
      }
    },

    applyOfflineIncome: () => {
      const { lastActiveAt, passiveIncome, balance } = get();

      if (!lastActiveAt || passiveIncome <= 0) return;

      const now = Date.now();
      const diffMs = now - lastActiveAt;

      const maxAfkMs = 3 * 60 * 60 * 1000; // 3 часа
      const effectiveMs = Math.min(diffMs, maxAfkMs);

      const seconds = Math.floor(effectiveMs / 1000);
      const income = Math.floor((passiveIncome / 3600) * seconds);

      if (income > 0) {
        set({ balance: balance + income });
      }

      set({ lastActiveAt: now });
    },

    startPassiveIncome: () => {
      setInterval(() => {
        const { passiveIncome, balance } = get();
        if (passiveIncome <= 0) return;

        set({ balance: Math.round(balance + passiveIncome / 180) });
      }, 20000); // раз в секунду
    },

    saveLastActive: () => {
      const state = get();

      localStorage.setItem(
        "planetup-save",
        JSON.stringify({
          balance: state.balance,
          energy: state.energy,
          maxEnergy: state.maxEnergy,
          currentLevel: state.currentLevel,
          currentLevelProgress: state.currentLevelProgress,
          upgradesLevels: state.upgradesLevels,
          passiveIncome: state.passiveIncome,
          currentPlanet: state.currentPlanet,
          lastActiveAt: Date.now(),
        })
      );
    },

    saveGame: () => {
      const state = get();

      const data = {
        balance: state.balance,
        energy: state.energy,
        currentLevel: state.currentLevel,
        currentLevelProgress: state.currentLevelProgress,
        upgradesLevels: state.upgradesLevels,
        passiveIncome: state.passiveIncome,
        currentPlanet: state.currentPlanet,
        lastActiveAt: state.lastActiveAt,
      };

      localStorage.setItem("planetup-save", JSON.stringify(data));
    },

    loadGame: () => {
      const raw = localStorage.getItem("planetup-save");
      if (!raw) return;

      try {
        const data = JSON.parse(raw);

        set({
          balance: data.balance ?? 0,
          energy: data.energy ?? 500,
          currentLevel: data.currentLevel ?? 1,
          currentLevelProgress: data.currentLevelProgress ?? 0,
          upgradesLevels: data.upgradesLevels ?? {},
          passiveIncome: data.passiveIncome ?? 0,
          currentPlanet: data.currentPlanet ?? "earth",
          lastActiveAt: data.lastActiveAt ?? Date.now(),
        });
      } catch {
        console.error("Save broken");
      }
    },
  };
});

export default useGameStore;
