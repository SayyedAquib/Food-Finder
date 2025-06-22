import { useState } from "react";
import { DetailMenu } from "../index";

const MenuCard = ({ card, resInfo }) => {
  const [isOpen, setIsOpen] = useState(!!card["@type"]);

  const toggleDropDown = () => setIsOpen((prev) => !prev);

  if (card.itemCards) {
    const { title, itemCards } = card;
    return (
      <>
        <div className="mt-7">
          <div className="flex justify-between">
            <h1 className={`font-bold text-${card["@type"] ? "xl" : "base"}`}>
              {title} ({itemCards.length})
            </h1>
            <i
              className={`fi text-xl fi-rr-angle-small-${
                isOpen ? "up" : "down"
              }`}
              onClick={toggleDropDown}
            ></i>
          </div>
          {isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />}
        </div>
        <hr className={`my-5 border-${card["@type"] ? "[10px]" : "[4px]"}`} />
      </>
    );
  } else {
    const { title, categories } = card;
    return (
      <div>
        <h1 className="font-bold text-xl">{title}</h1>
        {categories.map((data, i) => (
          <MenuCard key={i} card={data} resInfo={resInfo} />
        ))}
      </div>
    );
  }
};

export default MenuCard;
