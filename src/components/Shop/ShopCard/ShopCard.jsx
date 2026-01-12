import BoostCard from "./BoostCard";
import "./ShopCard.scss";
import SkinCard from "./SkinCard";
import UpgradeCard from "./UpgradeCard";

export default function ShopCard(props) {
  const { category } = props;

  if (category === "click" || category === "passive")
    return <UpgradeCard {...props} />;
  else if (category === "boost") return <BoostCard {...props} />;
  else if (category === "skin") return <SkinCard {...props} />;
}
