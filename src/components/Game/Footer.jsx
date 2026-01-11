import "../../styles/components/Footer.scss";
import { NavLink } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `footer-item ${isActive ? "footer-active" : ""}`
        }
      >
        <div className="footer-item__icon">
          <img src={`${import.meta.env.BASE_URL}icons/planet.png`} alt="Home" />
        </div>
        <div className="footer-item__label">Home</div>
      </NavLink>

      <NavLink
        to="/shop"
        className={({ isActive }) =>
          `footer-item ${isActive ? "footer-active" : ""}`
        }
      >
        <div className="footer-item__icon">
          <img
            src={`${import.meta.env.BASE_URL}icons/upgrades.png`}
            alt="Shop"
          />
        </div>
        <div className="footer-item__label">Shop</div>
      </NavLink>

      <NavLink
        to="/games"
        className={({ isActive }) =>
          `footer-item ${isActive ? "footer-active" : ""}`
        }
      >
        <div className="footer-item__icon">
          <img src={`${import.meta.env.BASE_URL}icons/games.png`} alt="Games" />
        </div>
        <div className="footer-item__label">Games</div>
      </NavLink>
    </footer>
  );
}

export default Footer;
