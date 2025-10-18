import '../styles/pages/LoadingScreen.scss';
import logo from '../../public/img/logo.svg';
import tg_icon from '../../public/icons/telegram-logo.png'
import EarthAnim from '../assets/videos/earth_60fps_frames.webm'
import { useGame } from '../GameContext';


function LoadingScreen() {
    const {setIsLoading} = useGame();

    return (
        <div className="loading-screen">
            <div className="loading-header">
                <div className="loading-logo">
                    <img src={logo} alt="" />
                </div>
                <div className="loading-label">Идёт загрузка...</div>
                <span className="loader"></span>
            </div>
            <div className="loading-main">
                <div className="loading-main__title">
                    Заходи каждые 3 часа<br />и забирай прибыль!
                </div>
                <div className="loading-main__desc">Присоединяйся<br />к нашему Telegram:</div>
                <div className="loading-main__telegram"><img src={tg_icon} alt="" /></div>
                <div className="loading-main__authors">
                    &copy;PlanetUP 2025г.<br />Все права защищены.
                </div>
            </div>
            <div className="loading-content">
                <div className="earth">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onLoadedData={() => setTimeout(() => setIsLoading(false), 5000)}>

                        <source src={EarthAnim} type="video/webm" />
                            Ваш браузер не поддерживает видео.
                    </video>
                </div>
            </div>
        </div>
    )
}

export default LoadingScreen;