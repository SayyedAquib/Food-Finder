import { FilterButton } from "../index";

const FilterButtons = ({
  activeBtn,
  handleFilterBtn,
  selectedResDish,
  visible,
}) => {
  const filterOptions = ["Restaurant", "Dishes"];

  if (selectedResDish || visible) return null;

  return (
    <div className="my-7 flex flex-wrap gap-3">
      {filterOptions.map((filterName, i) => (
        <FilterButton
          key={i}
          filterName={filterName}
          isActive={activeBtn === filterName}
          onClick={handleFilterBtn}
        />
      ))}
    </div>
  );
};

export default FilterButtons;
