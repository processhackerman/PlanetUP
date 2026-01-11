import "../styles/pages/LoadingScreen.scss";
import logo from "../../public/img/logo.svg";
import tg_icon from "../../public/icons/telegram-logo.png";
import EarthAnim from "../assets/videos/earth_60fps_frames.webm";
import useGameStore from "../strores/useGameStore";

function LoadingScreen() {
  const setIsLoading = useGameStore((s) => s.setIsLoading);

  setTimeout(() => setIsLoading(false), 5000);

  return (
    <div className="loading-screen">
      <div className="loading-header">
        <div className="loading-logo">
          <img src={logo} alt="" />
        </div>
        <div className="loading-label">Loading...</div>
        <span className="loader"></span>
      </div>
      <div className="loading-main">
        <div className="loading-main__title">
          Come in every 3 hours
          <br />
          and collect your profit!
        </div>
        <div className="loading-main__desc">
          Join
          <br />
          our Telegram:
        </div>
        <div className="loading-main__telegram">
          <img src={tg_icon} alt="" />
        </div>
        <div className="loading-main__authors">
          &copy;PlanetUP 2025.
          <br />
          All rights reserved.
        </div>
      </div>
      <div className="loading-content">
        {/* <div className="earth">
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
                </div> */}
      </div>
    </div>
  );
}

export default LoadingScreen;
