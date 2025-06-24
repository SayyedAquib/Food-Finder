import { useEffect, useState } from "react";
import { RestaurantCard, FilterButton } from "../index";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../../redux/slices/filterSlice";

const OnlineFoodDelivery = ({ data, title }) => {
  const filterOptions = [
    "Ratings 4.0+",
    "Rs. 300-Rs. 600",
    "Less than Rs. 300",
  ];

  const [activeBtn, setActiveBtn] = useState(null);
  const dispatch = useDispatch();

  const handleFilterBtn = (filterName) => {
    setActiveBtn(activeBtn === filterName ? null : filterName);
  };

  useEffect(() => {
    dispatch(setFilterValue(activeBtn));
  }, [activeBtn, dispatch]);

  return (
    <div>
      <h1 className="font-bold my-7 text-2xl">{title}</h1>
      <div className="my-7 flex flex-wrap gap-3">
        {filterOptions.map((filterName, i) => (
          <FilterButton
            key={i}
            filterName={filterName}
            isActive={activeBtn === filterName}
            onClick={handleFilterBtn}
            showCrossIcon={true}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
        {data.map(({ info, cta: { link } }) => (
          <div className="hover:scale-95 duration-300" key={info.id}>
            <RestaurantCard {...info} link={link} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineFoodDelivery;
