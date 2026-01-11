import Footer from "../components/Game/Footer";
import useGameStore from "../strores/useGameStore";
import { NavLink, Outlet } from "react-router";
import "../styles/pages/ShopPage.scss";

export default function ShopPage() {
  const { currentLevel, balance } = useGameStore();

  return (
    <div className="shop">
      <div className="shop-wrapper">
        <header className="shop-header">
          <NavLink to="/">
            <button className="back-btn">
              <div className="back-btn__image">
                <img src={`${import.meta.env.BASE_URL}icons/back.svg`} alt="" />
              </div>
              <span>To home</span>
            </button>
          </NavLink>
          <div className="shop-header__title">Shop</div>
          <div className="shop-header__balance">
            <span className="shop-header__balance-value">{balance}</span>
            <span className="shop-header__balance-image">
              <img src={`${import.meta.env.BASE_URL}icons/coin.png`} alt="" />
            </span>
          </div>
        </header>
        <div className="shop-level">
          <span>Current level: </span>
          <span>{currentLevel}</span>
        </div>
        <nav className="shop-navigation">
          <NavLink
            to="clicks"
            className={({ isActive }) =>
              `shop-navigation__button ${isActive ? "active" : ""}`
            }
          >
            Clicks
          </NavLink>
          <NavLink
            to="passive"
            className={({ isActive }) =>
              `shop-navigation__button ${isActive ? "active" : ""}`
            }
          >
            Income
          </NavLink>
          <NavLink
            to="boosts"
            className={({ isActive }) =>
              `shop-navigation__button ${isActive ? "active" : ""}`
            }
          >
            Boosts
          </NavLink>
          <NavLink
            to="skin"
            className={({ isActive }) =>
              `shop-navigation__button ${isActive ? "active" : ""}`
            }
          >
            Skins
          </NavLink>
        </nav>
        <div className="divider" />
        <div className="shop-content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
