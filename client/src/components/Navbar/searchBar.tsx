import useResponsive from "@/hooks/useResponsive";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { cn } from "@/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef } from "react";

const SearchBar: React.FC<{
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  activeClassName?: string;
  isSearchActive?: boolean;
  onSearch?: (event: React.FormEvent<HTMLFormElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  setIsSearchActive?: React.Dispatch<React.SetStateAction<boolean>>;
  isPageTop?: boolean;
}> = ({
  searchInput,
  setSearchInput,
  isSearchActive = true,
  className,
  activeClassName,
  onSearch,
  onFocus,
  onBlur,
  setIsSearchActive,
  isPageTop,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isLg = useResponsive("lg");
  function searchHandler(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    if ((!searchInput || !isSearchActive) && setIsSearchActive) {
      !isSearchActive && searchInputRef.current?.focus();
      setIsSearchActive((prevState) => !prevState);
    }
  }

  useEffect(() => {
    if (!isSearchActive && !isLg) {
      searchInputRef.current?.blur();
    }
  }, [isSearchActive, isLg]);

  return (
    <form
      className={cn(
        `relative flex transition-[width] duration-700`,
        className,
        isSearchActive ? `${activeClassName}` : "w-8",
        isLg ? "" : "p-1"
      )}
      onSubmit={onSearch}
    >
      {isPageTop && (
        <Input
          ref={searchInputRef}
          value={searchInput}
          placeholder="Search for Listings"
          className={`h-8 w-full text-[12px] transition-all duration-700 xl:text-xs ${
            isSearchActive
              ? "bg-white/60 pr-20"
              : "border-0 bg-transparent p-0 text-transparent placeholder:text-transparent"
          } 
		${isLg ? "" : "mt-9 mb-4 bg-transparent  text-white placeholder:text-black p-3"}
	rounded-full w-full`}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      )}

      {isLg && (
        <div
          className={`${
            isSearchActive && "gap-1"
          } absolute right-0 top-1/2 flex -translate-y-1/2 items-center justify-between transition-all duration-700`}
        >
          <Button
            type="submit"
            variant={`${isSearchActive ? "ghost" : "outline"}`}
            className={`${
              isSearchActive
                ? "rounded-l-full p-3"
                : "w-8 h-5 p-0 rounded-full "
            } h-8 transition-[border-radius] duration-300`}
            onClick={searchHandler}
          >
            <SearchIcon size={25} />
          </Button>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
