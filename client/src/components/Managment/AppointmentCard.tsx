"use client"
import React from "react";
import { useQuery } from "@tanstack/react-query";
import isLoggedIn from "@/lib/fetchers/auth/isloggedin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import viewAppointments from "@/lib/fetchers/appointment/viewAppointment";

const AppointmentCard = (appointment: any) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">{appointment.name}</h3>
      <p>Email: {appointment.email}</p>
      <p>Phone: {appointment.phone}</p>
      <p>Listing ID: {appointment.listingId}</p>
    </div>
  );
};

const AppointmentsList = (appointments: any) => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["resident"],
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
        const data = await viewAppointments();
        toast.success(`Appointments has been fetched successfully`);
        return data;
      } catch (error) {
        toast.error("Error loading resident data");
        throw error;
      }
    },
  });
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      {appointments?.map((appointment: any, index: any) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentsList;
