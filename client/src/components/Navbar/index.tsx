// pages/index.tsx
"use client";
import useResponsive from "@/hooks/useResponsive";
import { Search } from "lucide-react";

export default function Navbar() {
  const isLg = useResponsive("lg");

  return (
    <div className="bg-white rounded-lg shadow-md p-8 fixed top-5 left-10 right-10 z-10 flex justify-between items-center">
      <div className="relative bottom-2 w-5">
        <div className="absolute">
          <Search />
        </div>

        <div className="absolute"></div>
      </div>

      {/* Put your navbar content here */}
    </div>
  );
}
