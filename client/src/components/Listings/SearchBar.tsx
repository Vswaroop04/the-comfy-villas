import { getSearchResults } from "@/lib/fetchers/listing/filter";
import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import RatingComponent from "../Home/RatingComponent";

const SearchComponent = () => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchText = useDebounce(searchInput, 500);
  const [isSearchInputVisible, setSearchInputVisible] = useState(false);
  const searchRef = useRef(null);
  const placeholderImageUrl =
    "https://res.cloudinary.com/dpbuff0qs/image/upload/v1700000971/thumbnails/eepadzv1wozeg8rcpygh.jpg";
  const { data: searchResults } = useQuery({
    queryKey: ["Searchlocation", debouncedSearchText],
    queryFn: () => getSearchResults({ searchText: debouncedSearchText }),
    enabled: !!debouncedSearchText && isSearchInputVisible,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !(searchRef.current as HTMLElement).contains(
          event.target as HTMLElement
        )
      ) {
        setSearchInputVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={searchRef}
      className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 mx-auto flex items-center"
    >
      <div className="p-2">
        <SearchIcon size={25} className="text-gray-500" />
      </div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setSearchInputVisible(true);
        }}
        placeholder="Search for listing"
        className="w-full max-w-md p-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      />

      {isSearchInputVisible && (
        <div className="absolute mt-6 ml-5 top-6 left-4 w-full max-w-md bg-white border-t border-gray-500 z-10">
          {searchResults?.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 transition-colors duration-150"
            >
              <div className="flex items-center">
                <img
                  src={
                    result?.images?.[0]?.thumbnailImageUrl || placeholderImageUrl
                  }
                  alt={result.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <div className="font-bold text-xl mb-2">{result.name}</div>
                  <p className="text-gray-700 text-base">{result.location}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <RatingComponent rating={result.averageRating || 4} />
                <div className="font-bold text-xl">${result.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
