import useGameStore from '../../strores/useGameStore';
import EarthAnim from '../../assets/videos/earth_60fps_frames.webm'
import '../../styles/components/Planet.scss'

function Planet () {
    const {balance, energy, currentLevelProgress} = useGameStore();
    const levelLimit = useGameStore(s => s.levelLimit);
    const handlePlanetClick = useGameStore(s => s.handlePlanetClick);
    const clickPower = useGameStore(s => s.clickPower);
    const passiveIncome = useGameStore(s => s.passiveIncome);

    const progressPercentage = (currentLevelProgress / levelLimit) * 100;

    return (
        <>
            <div className="main-planet">
                <div className="income">
                    <div className="income__item income-tap">
                        <div className="income__item-icon"><img src={`${import.meta.env.BASE_URL}icons/up-arrow.png`} alt="" /></div>
                        <div className="income__item-value">{clickPower}</div>
                        <div className="income__item-label">Прибыль / клик</div>
                    </div>
                    <div className="income__item income-hour">
                        <div className="income__item-icon"><img src={`${import.meta.env.BASE_URL}icons/cycle-arrow.png`} alt="" /></div>
                        <div className="income__item-value">{passiveIncome}</div>
                        <div className="income__item-label">Прибыль / час</div>
                    </div>
                </div>
                <div className="planet-display">
                    <div className="planet-balance">
                        <span className="planet-balance__value">{balance}</span>
                        <span className="planet-balance__icon"><img src={`${import.meta.env.BASE_URL}icons/coin.png`} alt="" /></span>
                    </div>
                    <div className="planet-container" onClick={handlePlanetClick}>
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto">

                            <source src={EarthAnim} type="video/webm" />
                                Ваш браузер не поддерживает видео.
                        </video>
                    </div>
                </div>
                <div className="progress">
                    <div className="progress-header">
                        <div className="progress-header__item progress-energy">
                            <span className="progress-header__item-label">Энергия: </span>
                            <span className="progress-header__item-value">{energy} / 500</span>
                            <span className="progress-header__item-icon"><img src={`${import.meta.env.BASE_URL}icons/energy.png`} alt="" /></span>
                        </div>
                        <div className="progress-header__item progress-level">
                            <span className="progress-header__item-label">Прогресс: </span>
                            <span className="progress-header__item-value">{currentLevelProgress} / {levelLimit}</span>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{width: `${progressPercentage}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Planet;