import React, { useMemo } from "react";
import { IMAGE_URL } from "../../utils/constants";

const TopPickCard = React.memo(({ creativeId, defaultPrice, price }) => {
  const imageSrc = useMemo(
    () => `${IMAGE_URL}fl_lossy,f_auto,q_auto,w_400,h_400/${creativeId}`,
    [creativeId]
  );

  const displayPrice = useMemo(
    () => defaultPrice / 100 || price / 100,
    [defaultPrice, price]
  );

  return (
    <div className="min-w-[400px] relative h-[405px]">
      <img
        className="w-full h-full"
        src={imageSrc}
        alt="Top Pick Item"
        width={400}
        height={400}
        loading="lazy"
      />
      <div className="absolute bottom-4 text-white flex justify-between w-full px-5">
        <p>₹{displayPrice}</p>
        <button
          className="px-10 py-2 font-bold text-green-400 bg-white rounded-xl"
          aria-label="Add top pick to cart"
        >
          Add
        </button>
      </div>
    </div>
  );
});

TopPickCard.displayName = "TopPickCard";

export default TopPickCard;
