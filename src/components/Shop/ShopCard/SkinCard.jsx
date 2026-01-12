import "./ShopCard.scss";
import coin from "/icons/coin.png";
import useGameStore from "../../../strores/useGameStore";

export default function SkinCard({ status, icon, name, price, id }) {
  const buySkin = useGameStore((s) => s.buySkin);
  const ownedSkins = useGameStore((s) => s.ownedSkins);
  const currentSkinId = useGameStore((s) => s.currentSkinId);

  const isOwned = ownedSkins.includes(id);
  const isActive = currentSkinId === id;

  const renderButton = () => {
    if (status === "available" && id !== "skin_1") {
      return (
        <button
          onClick={() => buyUpgrade(category, id)}
          className="card-button buy"
          type="button"
        >
          Buy
        </button>
      );
    } else if (id === "skin_1") {
      return <></>;
    } else {
      return <div className="card-button disabled">Unavailable</div>;
    }
  };

  return (
    <div className={`card card-${status} skin-card`}>
      <div className="card-icon">
        <img src={icon} alt="" />
      </div>
      <div className="card-body">
        <div className="card-body__title">{name}</div>
        <div className="card-body__price">
          {price}
          <div className="card-body__price-icon">
            <img src={coin} alt="" />
          </div>
        </div>
      </div>
      {isActive ? (
        <div className="card-button active">Active</div>
      ) : isOwned ? (
        <button onClick={() => buySkin(id)} className="card-button select">
          Select
        </button>
      ) : status === "locked" ? (
        <div className="card-button disabled">Unavailable</div>
      ) : (
        <button onClick={() => buySkin(id)} className="card-button buy">
          Buy
        </button>
      )}
    </div>
  );
}
