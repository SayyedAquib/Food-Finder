import { TopPickCard, HorizontalScroller } from "../index";

const TopPicks = ({ topPicksData }) => {
  const title = topPicksData?.card?.card?.title;
  const items = topPicksData?.card?.card?.carousel || [];

  return (
    <HorizontalScroller title={title}>
      {items.map(
        ({
          creativeId,
          dish: {
            info: { defaultPrice, price, id },
          },
        }) => (
          <TopPickCard
            key={id}
            creativeId={creativeId}
            defaultPrice={defaultPrice}
            price={price}
          />
        )
      )}
    </HorizontalScroller>
  );
};

export default TopPicks;
