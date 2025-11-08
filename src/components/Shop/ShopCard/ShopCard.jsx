import './ShopCard.scss'
import UpgradeCard from './UpgradeCard';

export default function ShopCard(props) {

    const { category } = props;

    if (category === "click" || category === "passive") return <UpgradeCard {...props} />
}