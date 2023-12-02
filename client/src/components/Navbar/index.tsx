// pages/index.tsx
"use client";
import SearchBar from "./searchBar";
import { cn } from "@/utils";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useUser from "@/hooks/useUser";
import { ChevronDown } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { getSearchResults } from "@/lib/fetchers/listing/filter";
import { useQuery } from "@tanstack/react-query";
import LoginPopup from "../Popups/LoginPopup";
import useResponsive from "@/hooks/useResponsive";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const router = useRouter();
  const isLg = useResponsive("lg");
  const [isSearchInputVisible, setSearchInputVisible] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [getApp, setGetApp] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isSearchMenuVisible, setIsSearchMenuVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const searchDebounce = useDebounce(searchInput);
  const [isPageTop, setIsPageTop] = useState(true);
  const searchMenuRef = useRef<HTMLUListElement>(null);
  const [isSearchSubmit, setIsSearchSubmit] = useState(false);
  const { user, isLoggedIn, logout } = useUser();
  const debouncedSearchText = useDebounce(searchInput, 400);

  function searchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearchSubmit(true);
  }

  function handleResultClick(result: any) {
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsPageTop(false);
      } else {
        setIsPageTop(true);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { data: searchResults } = useQuery({
    queryKey: ["Searchlocation", debouncedSearchText],
    queryFn: async () => {
      if (debouncedSearchText) {
        let filter = {
          searchText: debouncedSearchText,
        };
        const resp = await getSearchResults(filter);
        return resp;
      }
    },
    enabled: isSearchInputVisible, // Only execute the query if inputClicked is true
  });

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${
        isPageTop ? "fixed" : "absolute"
      } top-5 left-10 right-10 z-10 flex justify-between items-center`}
    >
      <div className="flex items-center">
        {/* <div className={`flex flex-grow flex-col  "lg:relative"`}>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            onSearch={searchHandler}
            className={`absolute ${
              !isPageTop && "bg-white"
            } ${"lg:relative"} left-0 top-14 z-10 mx-5 rounded-full lg:top-0 lg:mx-0 lg:bg-transparent lg:px-0`}
            activeClassName={"w-[calc(100%-2.5rem)] lg:w-full"}
            isSearchActive={isLg ? isSearchInputVisible : undefined}
            setIsSearchActive={isLg ? setSearchInputVisible : undefined}
            onFocus={setIsSearchMenuVisible.bind(null, true)}
            isPageTop={isPageTop}
          />
          {isSearchInputVisible &&
            searchResults &&
            searchResults?.length > 0 && (
              <div className="absolute top-full mt-0 w-60  bg-white shadow-lg z-50">
                <ul className="max-h-60 w-full overflow-auto">
                  {searchResults.map((result) => (
                    <li
                      key={result.id} // Assuming each result has a unique 'id'
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100 "
                      onClick={() => handleResultClick(result)}
                    >
                      {result.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div> */}
        {/* other items if any */}
      </div>
      <div className={`flex   ${isLg ? "items-center" : "items-center ml-6"}`}>
        <div
          className={`${isPageTop ? "fixed" : "absolute"} ${
            isLg ? "h-[10vh]" : "mr-9"
          }`}
        >
          <Image
            src={"/assets/Logo.png"}
            width={`${isLg ? 200 : 90}`}
            height={60}
            className="h-[15vh] w-[15vh]"
            alt="comfy-villas"
          />
        </div>
      </div>
      {/* Right-aligned items */}
      <div className="flex items-center justify-items-end space-x-10 pr-10">
        <button
          className={cn(
            buttonVariants({ variant: "destructive" }),
            "h-8 rounded-full p-4  text-center text-[11px] leading-3 text-base"
          )}
          onClick={() => {
            router.push("/");
          }}
        >
          {" "}
          Home{" "}
        </button>
        {isLoggedIn ? (
          <div className="p-4 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={`flex h-8 min-w-max items-center justify-center gap-1 rounded-full p-0 text-center text-[11px] leading-3 outline-none hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 xl:text-xs`}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-[10px]">
                      <Image
                        src={"/assets/user/blank_dp.webp"}
                        alt="user"
                        width={80 }
                        height={80}
                      />
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown size={15} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {user?.role === "Admin" ? (
                  <DropdownMenuItem
                    onClick={() => router.push("/managment")}
                    className=" transition-[transform] duration-200 hover:scale-105 bg-white p-5"
                  >
                    <Image
                      src={"/assets/user/profile.svg"}
                      width={20}
                      height={20}
                      alt="dashboard"
                    />
                    Managment Dashboard
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    onClick={() => router.push("/resident")}
                    className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5"
                  >
                    <Image
                      src={"/assets/user/profile.svg"}
                      width={20}
                      height={20}
                      alt="dashboard"
                    />
                    Resident Dashboard
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem
                  onClick={() => logout()}
                  className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5"
                >
                  <Image
                    src={"/assets/user/logout.svg"}
                    width={20}
                    height={20}
                    alt="logout_img"
                  />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <button
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-8 rounded-xl p-4 py-5 text-center text-[11px] leading-3 text-base"
            )}
            onClick={() => setIsLoginOpen(true)}
          >
            {" "}
            Login{" "}
          </button>
        )}
      </div>

      {isLoginOpen && (
        <LoginPopup isOpen={isLoginOpen} setOpen={setIsLoginOpen} />
      )}
    </div>
  );
}
