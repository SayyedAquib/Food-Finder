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
        <button
          key={i}
          onClick={() => handleFilterBtn(filterName)}
          className={
            "filterBtn flex gap-2 " + (activeBtn === filterName ? "active" : "")
          }
        >
          <p>{filterName}</p>
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
