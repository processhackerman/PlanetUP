import '../../styles/components/Footer.scss'

function Footer () {
    return (
        <>
            <footer className='footer'>
                <div className="footer-item">
                    <div className="footer-item__icon footer-active"><img src="/icons/planet.png" alt="" /></div>
                    <div className="footer-item__label">Главная</div>
                </div>
                <div className="footer-item">
                    <div className="footer-item__icon"><img src="/icons/upgrades.png" alt="" /></div>
                    <div className="footer-item__label">Магазин</div>
                </div>
                <div className="footer-item">
                    <div className="footer-item__icon"><img src="/icons/games.png" alt="" /></div>
                    <div className="footer-item__label">Игры</div>
                </div>
                <div className="footer-item">
                    <div className="footer-item__icon"><img src="/icons/friends.png" alt="" /></div>
                    <div className="footer-item__label">Друзья</div>
                </div>
            </footer>
        </>
    )
}

export default Footer;