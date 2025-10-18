import Header from "../components/Game/Header";
import Planet from "../components/Game/Planet";
import Footer from "../components/Game/Footer";
import LoadingScreen from "./LoadingScreen";
import { useGame } from "../GameContext";

import '../styles/pages/MainPage.scss';

function MainPage () {
    const {isLoading} = useGame();

    return (
        <div className="main-page">
            <div className={`loading-wrapper ${isLoading ? 'visible' : 'hidden'}`}>
                <LoadingScreen />
            </div>
            
            <div className={`content-wrapper ${isLoading ? 'hidden' : 'visible'}`}>
                <Header />
                <Planet />
                <Footer />
            </div>
        </div>
    )
}

export default MainPage;