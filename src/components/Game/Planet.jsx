import { useRef, useState } from "react";
import '../../styles/components/Planet.scss'

function Planet () {

    const energy = 500;
    let current_energy = energy;
    const level_limit = 1000;
    let current_level_progress = 11;

    return (
        <>
            <div className="main-planet">
                <div className="income">
                    <div className="income__item income-tap">
                        <div className="income__item-icon"><img src="/icons/up-arrow.png" alt="" /></div>
                        <div className="income__item-value">0</div>
                        <div className="income__item-label">Прибыль / клик</div>
                    </div>
                    <div className="income__item income-hour">
                        <div className="income__item-icon"><img src="/icons/cycle-arrow.png" alt="" /></div>
                        <div className="income__item-value">0</div>
                        <div className="income__item-label">Прибыль / час</div>
                    </div>
                </div>
                <div className="planet-display">
                    <div className="planet-balance">
                        <span className="planet-balance__value">2 000 000</span>
                        <span className="planet-balance__icon"><img src="/icons/coin.png" alt="" /></span>
                    </div>
                    <div className="planet-container">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto">
                            <source src="/videos/earth_60fps_frames.webm" type="video/webm" />
                                Ваш браузер не поддерживает видео.
                        </video>
                    </div>
                </div>
                <div className="progress">
                    <div className="progress-header">
                        <div className="progress-header__item progress-energy">
                            <span className="progress-header__item-label">Энергия: </span>
                            <span className="progress-header__item-value">{current_energy} / {energy}</span>
                            <span className="progress-header__item-icon"><img src="/icons/energy.png" alt="" /></span>
                        </div>
                        <div className="progress-header__item progress-level">
                            <span className="progress-header__item-label">Прогресс: </span>
                            <span className="progress-header__item-value">{current_level_progress} / {level_limit}</span>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Planet;