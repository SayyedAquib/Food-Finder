import { HorizontalScroller, RestaurantCard } from "../index";

const TopRestaurant = ({ data = [], title }) => {
  return (
    <HorizontalScroller title={title} itemWidth="150px" snap>
      {data.map(({ info, cta: { link } }) => (
        <RestaurantCard key={info.id} {...info} link={link} />
      ))}
    </HorizontalScroller>
  );
};

export default TopRestaurant;
