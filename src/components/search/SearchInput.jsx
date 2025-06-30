import { Link } from "react-router-dom";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  setVisible,
  handleSearchQuery,
}) => {
  return (
    <div className="w-full relative max-w-xl mx-auto">
      <Link to="/">
        <i className="fi fi-rr-angle-small-left text-2xl absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </Link>
      <i className="fi fi-rr-search text-xl absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        className="w-full py-3 pl-10 pr-12 rounded-full text-base sm:text-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 transition duration-300 ease-in-out"
        type="text"
        placeholder="Search for restaurants and food"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setVisible(true);
        }}
        onKeyDown={handleSearchQuery}
      />
    </div>
  );
};

export default SearchInput;
