const FilterButton = ({
  filterName,
  isActive,
  onClick,
  showCrossIcon = false,
}) => {
  return (
    <button
      onClick={() => onClick(filterName)}
      className={`filterBtn flex gap-2 ${isActive ? "active" : ""}`}
    >
      <p>{filterName}</p>
      {showCrossIcon && <i className="fi text-sm mt-1 fi-br-cross hidden"></i>}
    </button>
  );
};

export default FilterButton;
