export const calculateTotalPrice = (items) =>
  items.reduce((acc, item) => acc + (item.price || item.defaultPrice) / 100, 0);

export const extractSelectedRestaurantDish = (cards) => {
  try {
    const selectedDishCard = cards[1];

    if (!selectedDishCard) {
      console.warn("No selected restaurant dish found in API response");
      return null;
    }

    return selectedDishCard || null;
  } catch (error) {
    console.warn("Error extracting selected restaurant dish:", error);
    return null;
  }
};

export const extractSimilarRestaurantDishes = (cards) => {
  try {
    const similarDishesCard = cards[2];

    if (!similarDishesCard?.card?.card?.cards) {
      console.warn("No similar restaurant dishes found in API response");
      return [];
    }

    const dishes = similarDishesCard.card.card.cards;

    if (!Array.isArray(dishes)) {
      console.warn("Similar dishes data is not an array:", dishes);
      return [];
    }

    return dishes || [];
  } catch (error) {
    console.warn("Error extracting similar restaurant dishes:", error);
    return [];
  }
};

export const extractDishesFromResponse = (cards) => {
  try {
    const groupedCard = cards.find((card) => card?.groupedCard);

    if (!groupedCard?.groupedCard?.cardGroupMap?.DISH?.cards) {
      console.warn("No dish data found in API response");
      return [];
    }

    const dishCards = groupedCard.groupedCard.cardGroupMap.DISH.cards;

    const validDishes = dishCards.filter((card) => {
      const cardType = card?.card?.card?.["@type"];
      return cardType && cardType.includes("food.v2.Dish");
    });

    if (validDishes.length === 0) {
      console.warn("No valid dishes found in response");
      return [];
    }

    return validDishes || [];
  } catch (error) {
    console.warn("Error extracting dishes from response:", error);
    return [];
  }
};

export const generateTrackingId = () => {
  return "xxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, () => {
    return ((Math.random() * 16) | 0).toString(16);
  });
};

export const generateQueryId = () => {
  return "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, () => {
    return ((Math.random() * 16) | 0).toString(16);
  });
};

export const extractRestaurantsFromResponse = (cards) => {
  try {
    if (!Array.isArray(cards) || cards.length === 0) {
      console.warn("No cards found in API response");
      return [];
    }

    const restaurantCard = cards[0];

    if (!restaurantCard?.groupedCard?.cardGroupMap?.RESTAURANT?.cards) {
      console.warn("No restaurant data found in API response structure");
      return [];
    }

    const restaurantCards =
      restaurantCard.groupedCard.cardGroupMap.RESTAURANT.cards;

    if (!Array.isArray(restaurantCards)) {
      console.warn("Restaurant cards is not an array:", restaurantCards);
      return [];
    }

    const validRestaurants = restaurantCards.filter((card) => {
      return card?.card?.card?.info;
    });

    if (validRestaurants.length === 0) {
      console.warn("No valid restaurants found in response");
      return [];
    }

    return validRestaurants || [];
  } catch (error) {
    console.warn("Error extracting restaurants from response:", error);
    return [];
  }
};

export const extractRestaurantInfo = (cards) => {
  try {
    return (
      cards.find((card) =>
        card?.card?.card?.["@type"]?.includes("food.v2.Restaurant")
      )?.card?.card?.info || null
    );
  } catch (error) {
    console.warn("Error extracting restaurant info:", error);
    return null;
  }
};

export const extractDiscountInfo = (cards) => {
  try {
    return (
      cards.find((card) =>
        card?.card?.card?.["@type"]?.includes("v2.GridWidget")
      )?.card?.card?.gridElements?.infoWithStyle?.offers || []
    );
  } catch (error) {
    console.warn("Error extracting discount info:", error);
    return [];
  }
};

export const extractMenuData = (cards) => {
  try {
    const menuCard = cards.find((card) => card?.groupedCard);

    if (!menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards) {
      return { topPicks: null, menuItems: [] };
    }

    const regularCards = menuCard.groupedCard.cardGroupMap.REGULAR.cards;

    const topPicks =
      regularCards.find((card) => card?.card?.card?.title === "Top Picks") ||
      null;

    const menuItems = regularCards.filter(
      (card) => card?.card?.card?.itemCards || card?.card?.card?.categories
    );

    return { topPicks, menuItems } || { topPicks: null, menuItems: [] };
  } catch (error) {
    console.warn("Error extracting menu data:", error);
    return { topPicks: null, menuItems: [] };
  }
};