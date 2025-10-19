import '../../styles/components/Footer.scss'
import { NavLink } from 'react-router'

function Footer() {
    return (
        <footer className='footer'>
            <NavLink 
                to="/"
                className={({ isActive }) => 
                    `footer-item ${isActive ? 'footer-active' : ''}`
                }
            >
                <div className="footer-item__icon">
                    <img src={`${import.meta.env.BASE_URL}icons/planet.png`} alt="Главная" />
                </div>
                <div className="footer-item__label">Главная</div>
            </NavLink>
            
            <NavLink 
                to="/shop"
                className={({ isActive }) => 
                    `footer-item ${isActive ? 'footer-active' : ''}`
                }
            >
                <div className="footer-item__icon">
                    <img src={`${import.meta.env.BASE_URL}icons/upgrades.png`} alt="Магазин" />
                </div>
                <div className="footer-item__label">Магазин</div>
            </NavLink>
            
            <NavLink 
                to="/games"
                className={({ isActive }) => 
                    `footer-item ${isActive ? 'footer-active' : ''}`
                }
            >
                <div className="footer-item__icon">
                    <img src={`${import.meta.env.BASE_URL}icons/games.png`} alt="Игры" />
                </div>
                <div className="footer-item__label">Игры</div>
            </NavLink>
            
            <NavLink 
                to="/friends"
                className={({ isActive }) => 
                    `footer-item ${isActive ? 'footer-active' : ''}`
                }
            >
                <div className="footer-item__icon">
                    <img src={`${import.meta.env.BASE_URL}icons/friends.png`} alt="Друзья" />
                </div>
                <div className="footer-item__label">Друзья</div>
            </NavLink>
        </footer>
    )
}

export default Footer;