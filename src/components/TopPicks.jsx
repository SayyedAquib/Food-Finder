import TopPickCard from "./TopPickCard";

const TopPicks = ({ topPicksData }) => (
  <div className="w-full overflow-hidden">
    <h1 className="font-bold text-xl">{topPicksData.card.card.title}</h1>
    <div className="flex gap-4 mt-5">
      {topPicksData.card.card.carousel.map(
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
    </div>
  </div>
);

export default TopPicks;
