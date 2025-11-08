import coin from '/icons/coin.png'
import lock_icon from '/icons/lock.svg'
import useGameStore from '../../../strores/useGameStore';

export default function UpgradeCard({ status, icon, name, type, income, requiredLevel, price, level, category, id }) {
    const buyUpgrade = useGameStore(s => s.buyUpgrade)
    const maxLevel = 10;
    const progress = (level / maxLevel) * 100;

    const renderButton = () => {
        switch(status) {
            case "available":
                return(<button onClick={() => buyUpgrade(category, id)} className="card-button buy" type="button">Купить</button>)
            case "upgradeable":
                return(<button onClick={() => buyUpgrade(category, id)} className="card-button upgrades" type="button">Апгрейд</button>)
            case "max":
                return(<button className="card-button max" type="button">Максимум</button>)
            default:
                return(<div className="card-button disabled">Закрыто</div>)
        }
    }

    return(
        <div className={`card card-${status}`}>
            <div className="card-icon"><img src={status === "locked" ? lock_icon : icon} alt="" /></div>
            <div className="card-body">
                <div className="card-body__title">{name}</div>

                {type === "additive" ? (
                    <div className="card-body__power">
                        +{income}
                        <div className="card-body__power-icon"><img src={coin} alt="" /></div>
                        {category === "click" ? " / клик" : " / час"}
                    </div>
                ) : (
                    <div className="card-body__power">
                        x{income} ко всему
                    </div>
                )}

                {status !== "locked" ? (<div className="card-divider"></div>) : ""}

                {status === "available" || status === "locked" ? (
                    <div className="card-body__required">
                        Требуется: Уровень {requiredLevel}
                    </div>
                ) : (
                    <div className="card-body__progress">
                        <div className="card-body__progress-level">Ур. {level}</div>
                        <div className="card-body__progress-bar">
                            <div className="card-body__progress-value" style={{width: `${progress}%`}}></div>
                        </div>
                        <div className="card-body__progress-percentage">{progress}%</div>
                    </div>
                )}


                {status !== "locked" && status !== "max" ? (
                    <>
                        <div className="card-divider"></div>
                        <div className="card-body__price">{price} <div className="card-body__price-icon"><img src={coin} alt="" /></div></div>
                    </>
                ) : ""}
            </div>
            <>{renderButton()}</>
        </div>
    )
}