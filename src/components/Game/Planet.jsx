import useGameStore from "../../strores/useGameStore";
import { useState } from "react";
import "../../styles/components/Planet.scss";
import { motion, useAnimation, AnimatePresence } from "motion/react";
import upgrades from "../../data/upgrades";

function Planet() {
  const { balance, energy, currentLevelProgress, getRequiredClicksForLevel } =
    useGameStore();
  const currentLevel = useGameStore((s) => s.currentLevel);
  const requiredForLevel = getRequiredClicksForLevel(currentLevel);
  const handlePlanetClick = useGameStore((s) => s.handlePlanetClick);
  const clickPower = useGameStore((s) => s.clickPower);
  const passiveIncome = useGameStore((s) => s.passiveIncome);
  const incomeMultiplier = useGameStore((s) => s.incomeMultiplier);
  const currentSkinId = useGameStore((s) => s.currentSkinId);
  const skin = upgrades.skin.find((s) => s.id === currentSkinId);

  const [hits, setHits] = useState([]);

  const progressPercentage = (currentLevelProgress / requiredForLevel) * 100;

  const controls = useAnimation();

  const handleClick = async (e) => {
    handlePlanetClick();

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setHits((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        x,
        y,
        value: clickPower * incomeMultiplier,
      },
    ]);

    await controls.start({ scale: 1.03, transition: { duration: 0.08 } });
    await controls.start({ scale: 0.97, transition: { duration: 0.07 } });
    await controls.start({ scale: 1, transition: { duration: 0.09 } });
  };

  return (
    <>
      <div className="main-planet">
        <div className="income">
          <div className="income__item income-tap">
            <div className="income__item-icon">
              <img
                src={`${import.meta.env.BASE_URL}icons/up-arrow.png`}
                alt=""
              />
            </div>
            <div className="income__item-value">{clickPower}</div>
            <div className="income__item-label">Income / click</div>
          </div>
          <div className="income__item income-hour">
            <div className="income__item-icon">
              <img
                src={`${import.meta.env.BASE_URL}icons/cycle-arrow.png`}
                alt=""
              />
            </div>
            <div className="income__item-value">{passiveIncome}</div>
            <div className="income__item-label">Income / hour</div>
          </div>
        </div>
        <div className="planet-display">
          <div className="planet-balance">
            <span className="planet-balance__value">{balance}</span>
            <span className="planet-balance__icon">
              <img src={`${import.meta.env.BASE_URL}icons/coin.png`} alt="" />
            </span>
          </div>
          <motion.div
            className="planet-container"
            onPointerDown={handleClick}
            animate={controls}
          >
            {skin.type === "video" ? (
              <video autoPlay loop muted playsInline preload="auto">
                <source
                  src={`${import.meta.env.BASE_URL}${skin.video}`}
                  type="video/webm"
                />
              </video>
            ) : (
              <img
                src={`${import.meta.env.BASE_URL}${skin.image}`}
                alt={skin.name}
                draggable={false}
              />
            )}
          </motion.div>

          <div className="hits-layer">
            <AnimatePresence>
              {hits.map((hit) => (
                <motion.span
                  key={hit.id}
                  className="hit-text"
                  initial={{
                    opacity: 0,
                    x: hit.x,
                    y: hit.y,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    y: hit.y - 40,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: hit.y - 80,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onAnimationComplete={() =>
                    setHits((prev) => prev.filter((h) => h.id !== hit.id))
                  }
                >
                  +{hit.value}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="progress">
          <div className="progress-header">
            <div className="progress-header__item progress-energy">
              <span className="progress-header__item-label">Energy: </span>
              <span className="progress-header__item-value">
                {energy} / 500
              </span>
              <span className="progress-header__item-icon">
                <img
                  src={`${import.meta.env.BASE_URL}icons/energy.png`}
                  alt=""
                />
              </span>
            </div>
            <div className="progress-header__item progress-level">
              <span className="progress-header__item-label">Progress: </span>
              <span className="progress-header__item-value">
                {currentLevelProgress} / {requiredForLevel}
              </span>
            </div>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Planet;
