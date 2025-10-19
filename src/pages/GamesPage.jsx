import Header from "../components/Game/Header";
import Footer from "../components/Game/Footer";

function GamesPage() {
    return (
        <>
            <Header />
            <div className="games-content">
                <h1>Игры</h1>
                {/* Добавь контент игр здесь */}
            </div>
            <Footer />
        </>
    )
}

export default GamesPage;