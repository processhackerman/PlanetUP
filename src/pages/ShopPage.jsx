import Footer from "../components/Game/Footer"
import useGameStore from "../strores/useGameStore"
import { NavLink, Outlet } from "react-router";
import '../styles/pages/ShopPage.scss'

export default function ShopPage () {
    const { currentLevel, balance } = useGameStore();

    return (
        <div className="shop">
            <div className="shop-wrapper">
                <header className="shop-header">
                    <NavLink to="/">
                        <button className="back-btn"><div className="back-btn__image"><img src={`${import.meta.env.BASE_URL}icons/back.svg`} alt="" /></div><span>Главная</span></button>
                    </NavLink>
                    <div className="shop-header__title">Магазин</div>
                    <div className="shop-header__balance">
                        <span className="shop-header__balance-value">{balance}</span>
                        <span className="shop-header__balance-image"><img src={`${import.meta.env.BASE_URL}icons/coin.png`} alt="" /></span>
                    </div>
                </header>
                <div className="shop-level"><span>Текущий уровень: </span><span>{currentLevel}</span></div>
                <nav className="shop-navigation">
                    <NavLink to="clicks" className={({isActive}) => `shop-navigation__button ${isActive ? "active" : ""}`}>Клики</NavLink>
                    <NavLink to="passive" className={({isActive}) => `shop-navigation__button ${isActive ? "active" : ""}`}>Доход</NavLink>
                    <NavLink to="boosts" className={({isActive}) => `shop-navigation__button ${isActive ? "active" : ""}`}>Бусты</NavLink>
                    <NavLink to="skin" className={({isActive}) => `shop-navigation__button ${isActive ? "active" : ""}`}>Скин</NavLink>
                </nav>
                <div className="divider" />
                <div className="shop-content">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}