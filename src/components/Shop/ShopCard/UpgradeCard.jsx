import coin from "/icons/coin.png";
import lock_icon from "/icons/lock.svg";
import useGameStore from "../../../strores/useGameStore";

export default function UpgradeCard({
  status,
  icon,
  name,
  type,
  income,
  requiredLevel,
  price,
  level,
  category,
  id,
}) {
  const buyUpgrade = useGameStore((s) => s.buyUpgrade);
  const maxLevel = 10;
  const progress = (level / maxLevel) * 100;

  const renderButton = () => {
    switch (status) {
      case "available":
        return (
          <button
            onClick={() => buyUpgrade(category, id)}
            className="card-button buy"
            type="button"
          >
            Buy
          </button>
        );
      case "upgradeable":
        return (
          <button
            onClick={() => buyUpgrade(category, id)}
            className="card-button upgrades"
            type="button"
          >
            Upgrade
          </button>
        );
      case "max":
        return (
          <button className="card-button max" type="button">
            Max
          </button>
        );
      default:
        return <div className="card-button disabled">Unavailable</div>;
    }
  };

  return (
    <div className={`card card-${status}`}>
      <div className="card-icon">
        <img src={status === "locked" ? lock_icon : icon} alt="" />
      </div>
      <div className="card-body">
        <div className="card-body__title">{name}</div>

        {type === "additive" ? (
          <div className="card-body__advantage">
            +{income}
            <div className="card-body__advantage-icon">
              <img src={coin} alt="" />
            </div>
            {category === "click" ? " / click" : " / hour"}
          </div>
        ) : (
          <div className="card-body__advantage">x{income} for all</div>
        )}

        {status !== "locked" ? <div className="card-divider"></div> : ""}

        {status === "locked" ? (
          <div className="card-body__required">
            Needed: Level {requiredLevel}
          </div>
        ) : status === "upgradeable" ? (
          <div className="card-body__progress">
            <div className="card-body__progress-level">Lvl. {level}</div>
            <div className="card-body__progress-bar">
              <div
                className="card-body__progress-value"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="card-body__progress-percentage">{progress}%</div>
          </div>
        ) : (
          ""
        )}

        {status !== "locked" && status !== "max" ? (
          <>
            {status !== "available" ? <div className="card-divider"></div> : ""}
            <div className="card-body__price">
              {price}{" "}
              <div className="card-body__price-icon">
                <img src={coin} alt="" />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <>{renderButton()}</>
    </div>
  );
}
