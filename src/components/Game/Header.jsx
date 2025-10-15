import '../../styles/components/MainHeader.scss'

function Header () {
    let level = 1;

    return(
        <>
            <header className="main-header">
                <div className="info">
                    <span className="info__level">Уровень: {level}</span>
                    <span className="info__planets"><img src={`${import.meta.env.BASE_URL}icons/info.png`} alt="" /></span>
                </div>
                <div className="settings">
                    <button type="button" className="settings-button"><img src={`${import.meta.env.BASE_URL}icons/settings.png`} alt="" /></button>
                </div>
            </header>
        </>
    )
}

export default Header;