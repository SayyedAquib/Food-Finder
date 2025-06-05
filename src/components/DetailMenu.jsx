import { DetailMenuCard } from "./index";

const DetailMenu = ({ itemCards, resInfo }) => (
  <div className="my-5">
    {itemCards.map(({ card: { info } }) => (
      <DetailMenuCard key={info.id} info={info} resInfo={resInfo} />
    ))}
  </div>
);

export default DetailMenu;
