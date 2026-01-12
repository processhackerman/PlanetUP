import useGameStore from "../../strores/useGameStore";
import upgrades from "../../data/upgrades";
import { getUpgradeCost, getUpgradePower } from "../../utils/upgradeMath";
import ShopCard from "./ShopCard/ShopCard";
import "../../styles/components/ShopTab.scss";

export default function ShopTab({ category }) {
  const url = import.meta.env.BASE_URL;
  const list = upgrades[category];

  const levels = useGameStore((s) => s.upgradesLevels);
  const playerLevel = useGameStore((s) => s.currentLevel);
  const balance = useGameStore((s) => s.balance);

  console.log(list);

  // логика "как будет выглядеть карточка"

  return (
    <div className="shop-tab">
      {list.map((item) => {
        if (category == "skin") {
          const locked = balance < item.price;

          return (
            <ShopCard
              key={item.id}
              category="skin"
              status={locked ? "locked" : "available"}
              icon={`${url}icons/skin/${item.id}.png`}
              name={item.name}
              description={item.desc}
              price={item.price}
              unlockLevel={item.unlockLevel}
              skinType={item.type}
              id={item.id}
            />
          );
        }

        const currentCardLevel = levels[item.id] || 0;
        let status = "available";

        if (currentCardLevel >= item.maxLevel) status = "max";
        else if (playerLevel < item.unlockLevel) status = "locked";
        else status = "upgradeable";

        const cardPrice =
          category !== "boost"
            ? getUpgradeCost(item.basePrice, currentCardLevel)
            : item.basePrice;

        const cardPower =
          category !== "click"
            ? Math.max(
                getUpgradePower(item.basePower, currentCardLevel, item.type),
                item.basePower
              )
            : currentCardLevel + 1;

        return (
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
            description={item.description}
            duration={item.duration}
          />
        );
      })}

      {category === "skin" ? (
        <div className="info">
          All skins are currently in their static, non-animated state. Dynamic,
          animated versions are scheduled for future content updates.
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
