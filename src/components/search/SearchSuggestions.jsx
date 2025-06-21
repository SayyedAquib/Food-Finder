import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants";

const SearchSuggestions = ({
  searchSuggestions,
  visible,
  setSearchQuery,
  setVisible,
  setActiveBtn,
}) => {
  if (!searchSuggestions.length || !visible) return null;

  return (
    <div className="my-7 flex flex-col gap-2">
      {searchSuggestions.map((suggestion, i) => (
        <Link
          onClick={() => {
            setSearchQuery(suggestion.text);
            setVisible(false);
            setActiveBtn("Dishes");
          }}
          key={i}
          href="#"
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
            <img
              src={`${IMAGE_URL}${suggestion.cloudinaryId}`}
              alt={suggestion.text}
              className="object-cover w-full h-full rounded"
            />
          </div>

          <div>
            <p className="text-base font-semibold text-gray-900">
              {suggestion.text}
            </p>
            <p className="text-sm text-gray-500">{suggestion.type}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchSuggestions;
