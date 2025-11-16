import useGameStore from '../../../strores/useGameStore'
import coin from '/icons/coin.png'


export default function BoostCard({ icon, name, price, id, description, duration }) {

    const buyBoost = useGameStore(s => s.buyBoost)

    return(
        <div className="card card-boost">
            <div className="card-icon"><img src={icon} alt="" /></div>
            <div className="card-body">
                <div className="card-body__title">{name}</div>
                <div className="card-body__advantage">{description}</div>
                <div className="card-divider"></div>
                <div className="card-body__price">{price}<div className="card-body__price-icon"><img src={coin} alt="" /></div></div>
                <div className="card-divider"></div>
                <div className="card-body__duration">{duration} сек</div>
            </div>
            <button onClick={() => buyBoost(id)} className="card-button upgrades" type="button">Купить</button>
        </div>
    )
}