"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import ResidentCard from "./ResidentCard";
import isLoggedIn from "@/lib/fetchers/auth/isloggedin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import getResident from "@/lib/fetchers/residents/getAllResidents";
import AddResidentPopup from "../Popups/AddResidentPopup";

export default function Resident() {
  const [isOpen, setIsOpenPopup] = useState(false);

  const router = useRouter();
  const path = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: ["resident", path],
    queryFn: async () => {
      const user = await isLoggedIn();
      toast.loading("Loading User Data");
      if (user.user?.role != "Admin") {
        toast.error("You Are Not Manangment!!!");
        setTimeout(() => {
          router.push("/");
        }, 100);
        return;
      }

      try {
        const data = await getResident();
        toast.success(`Residents has been fetched successfully`);
        return data;
      } catch (error) {
        toast.error("Error loading resident data");
        throw error;
      }
    },
  });
  return (
    <div>
      {" "}
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4">Residents</h2>
          <button
            className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setIsOpenPopup(true);
            }}
          >
            Add Resident
          </button>
        </div>
        {data?.residents?.map((resident, index) => (
          <ResidentCard key={resident.id} resident={resident} />
        ))}
      </div>
      {isOpen && <AddResidentPopup isOpen={isOpen} setOpen={setIsOpenPopup} />}
    </div>
  );
}
