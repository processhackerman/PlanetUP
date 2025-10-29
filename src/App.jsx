import MainPage from "./pages/MainPage"
import ShopPage from "./pages/ShopPage";
import FriendsPage from "./pages/FriendsPage";
import GamesPage from "./pages/GamesPage";
import useGameStore from "./strores/useGameStore";
import LoadingScreen from "./pages/LoadingScreen";
import { Route, Routes } from "react-router";

function App() {
  const isLoading = useGameStore((s) => s.isLoading);

  return (
        <div className="main-page">
            <div className={`loading-wrapper ${isLoading ? 'visible' : 'hidden'}`}>
                <LoadingScreen />
            </div>
            
            <div className={`content-wrapper ${isLoading ? 'hidden' : 'visible'}`}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/friends" element={<FriendsPage />} />
                </Routes>
            </div>
        </div>
  )
}

export default App
