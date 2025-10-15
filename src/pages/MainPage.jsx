import Header from "../components/Game/Header";
import Planet from "../components/Game/Planet";
import Footer from "../components/Game/Footer";

import '../styles/pages/MainPage.scss';

function MainPage () {

    return (
        <div className="main-page">
            <Header />
            <Planet />
            <Footer />
        </div>
    )
}

export default MainPage;