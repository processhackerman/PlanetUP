import MainPage from "./pages/MainPage";
import ShopPage from "./pages/ShopPage";
import ShopTab from "./components/Shop/ShopTab";
import GamesPage from "./pages/GamesPage";
import useGameStore from "./strores/useGameStore";
import LoadingScreen from "./pages/LoadingScreen";
import { Route, Routes, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import PageWrapper from "./components/UI/PageWrapper";

function App() {
  const isLoading = useGameStore((s) => s.isLoading);
  const location = useLocation();

  return (
    <div className="main-page">
      <div className={`loading-wrapper ${isLoading ? "visible" : "hidden"}`}>
        <LoadingScreen />
      </div>

      <div className={`content-wrapper ${isLoading ? "hidden" : "visible"}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname.split("/")[1]}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <MainPage />
                </PageWrapper>
              }
            />
            <Route
              path="/shop"
              element={
                <PageWrapper>
                  <ShopPage />
                </PageWrapper>
              }
            >
              <Route index element={<ShopTab category="click" />} />
              <Route path="clicks" element={<ShopTab category="click" />} />
              <Route path="passive" element={<ShopTab category="passive" />} />
              <Route path="boosts" element={<ShopTab category="boost" />} />
              <Route path="skin" element={<ShopTab category="skin" />} />
            </Route>
            <Route
              path="/games"
              element={
                <PageWrapper>
                  <GamesPage />
                </PageWrapper>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
