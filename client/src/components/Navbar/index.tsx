// pages/index.tsx
"use client";
import { buttonVariants } from "../ui/button";
import SearchBar from "./searchBar";
import { cn } from "@/utils";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import useResponsive from "@/hooks/useResponsive";
import Image from "next/image";

export default function Navbar() {
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
  function searchHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSearchSubmit(true);
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
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${
        isPageTop ? "fixed" : "absolute"
      } top-5 left-10 right-10 z-10 flex justify-between items-center`}
    >
      <div className="flex items-center">
        <div className={`flex flex-grow flex-col  "lg:relative"`}>
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
          <ul
            ref={searchMenuRef}
            className={`absolute left-5 top-24 z-10 w-[calc(100%-2.5rem)] overflow-hidden rounded-md bg-white lg:left-0 lg:top-11 lg:w-full`}
          >
            {/* <ScrollArea
              className={`${
                data?.searchResults?.length &&
                (!isLg || isNavVisible) &&
                isSearchMenuVisible
                  ? "max-h-60"
                  : "max-h-0"
              } flex w-full flex-col px-0 transition-all duration-700`}
            ></ScrollArea> */}
          </ul>
        </div>
        {/* other items if any */}
      </div>
      <div className={`flex   ${isLg ? "items-center" : "items-center ml-6"}`}>
        <div
          className={`${isPageTop ? "fixed" : "absolute"} ${
            isLg ? "" : "mr-9"
          }`}
        >
            <Image
              src={"/assets/Logo.png"}
              width={`${isLg ? 120 : 90}`}
              height={40}
              className="h-50"
              alt="comfy-villas"
            />
        </div>
      </div>
      {/* Right-aligned items */}
      <div className="{flex items-center justify-items-end space-x-10 pr-10}">
        <button
          className={cn(
            buttonVariants({ variant: "destructive" }),
            "h-8 rounded-full p-4  text-center text-[11px] leading-3 text-base"
          )}
        >
          {" "}
          Home{" "}
        </button>
        <button
          className={cn(
            buttonVariants({ variant: "default" }),
            "h-8 rounded-xl p-4 py-5 text-center text-[11px] leading-3 text-base"
          )}
        >
          {" "}
          Login{" "}
        </button>

        {/* other items if any */}
      </div>

      {/* Put your navbar content here */}
    </div>
  );
}
