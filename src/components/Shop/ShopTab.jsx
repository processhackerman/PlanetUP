import useGameStore from "../../strores/useGameStore"
import upgrades from '../../data/upgrades'
import {getUpgradeCost, getUpgradePower} from '../../utils/upgradeMath'
import ShopCard from "./ShopCard/ShopCard"
import '../../styles/components/ShopTab.scss'

export default function ShopTab({ category }) {
    const url = import.meta.env.BASE_URL;
    const list = upgrades[category]

    const levels = useGameStore(s => s.upgradesLevels)
    const playerLevel = useGameStore(s => s.currentLevel)

    // логика "как будет выглядеть карточка"

    return (
        <div className="shop-tab">
            {list.map((item) => {
                const currentCardLevel = levels[item.id] || 0;
                let status = "";
                

                if (currentCardLevel >= item.maxLevel) status = "max";
                else if (playerLevel < item.unlockLevel) status = "locked";
                else if (currentCardLevel === 0) status = "available";
                else status = "upgradeable";

                const cardPrice = getUpgradeCost(item.basePrice, currentCardLevel)
                const cardPower = Math.max(getUpgradePower(item.basePower, currentCardLevel, item.type), item.basePower) 

                return(
                    <ShopCard
                        key={item.id}
                        status={status}
                        icon={`${url}icons/${category}/${item.id}.png`}
                        name={item.name}
                        type={item.type}
                        income={cardPower}
                        requiredLevel={item.unlockLevel}
                        price={cardPrice}
                        level={currentCardLevel}
                        category={category}
                        id={item.id}
                    />
                )
            })}
        </div>
    )
}