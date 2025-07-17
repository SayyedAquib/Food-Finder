const SearchOverlay = ({
  visible,
  onClose,
  onSearch,
  searchResult,
  onPlaceSelect,
  query,
}) => (
  <div className="w-full">
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/50 z-30 transition-opacity ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    />
    <div
      className={`bg-white fixed top-0 left-0 h-full w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%] z-40 p-5 transition-transform duration-500 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-4 mt-3 w-full mr-6">
        <i className="fi fi-br-cross cursor-pointer" onClick={onClose}></i>
        <input
          type="text"
          className="border p-4 w-full rounded-md focus:outline-none focus:shadow-lg"
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search for area, street name..."
        />
        <div className="overflow-auto max-h-[70vh]">
          <ul>
            {searchResult.map((data, index) => (
              <div className="my-5 cursor-pointer" key={index}>
                <div className="flex gap-4">
                  <i className="fi mt-1 fi-rr-marker"></i>
                  <li onClick={() => onPlaceSelect(data.place_id)}>
                    {data.structured_formatting.main_text}
                    <p className="text-sm opacity-65">
                      {data.structured_formatting.secondary_text}
                    </p>
                    {index !== searchResult.length - 1 && (
                      <hr className="my-2 border-gray-300 border-dashed" />
                    )}
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default SearchOverlay;
