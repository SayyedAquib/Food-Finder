import { PromotedRestaurant, SearchRestaurant, Dish } from "../index";

const SearchResults = ({
  selectedResDish,
  similarResDishes,
  activeBtn,
  dishes,
  restaurantData,
}) => {
  const PromotedRes = PromotedRestaurant(SearchRestaurant);

  return (
    <div className="w-full md:w-[800px] mt-5 grid grid-cols-1 md:grid-cols-2 bg-[#f4f5f7]">
      {selectedResDish ? (
        <>
          <div>
            <p className="p-4 text-lg font-semibold text-gray-700 mt-6">
              Item added to cart
            </p>
            <Dish data={selectedResDish.card.card} />
            <p className="p-4 text-lg font-semibold text-gray-700 mt-6">
              More dishes from this restaurant
            </p>
          </div>
          <br />

          {similarResDishes.map((data, i) => (
            <Dish
              key={i}
              data={{
                ...data.card,
                restaurant: selectedResDish.card.card.restaurant,
              }}
            />
          ))}
        </>
      ) : activeBtn === "Dishes" ? (
        dishes?.map((data, i) => <Dish key={i} data={data.card.card} />)
      ) : (
        restaurantData.map((data, i) =>
          data?.card?.card?.info?.promoted ? (
            <PromotedRes data={data} key={i} />
          ) : (
            <SearchRestaurant data={data} key={i} />
          )
        )
      )}
    </div>
  );
};

export default SearchResults;
