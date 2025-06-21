const SearchInput = ({ searchQuery, setSearchQuery, setVisible, handleSearchQuery }) => {
  return (
    <div className="w-full relative">
      <i className="fi fi-rr-angle-small-left text-2xl ml-2 mt-1 absolute top-1/2 -translate-y-1/2"></i>
      <i className="fi fi-rr-search absolute top-1/2 right-0 -translate-y-1/2 mr-5"></i>
      <input
        className="border-2 w-full pl-8 py-3 text-xl focus:outline-none"
        type="text"
        placeholder="Search for restaurant and food"
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