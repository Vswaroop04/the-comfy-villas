import AppointmentsList from "@/components/Managment/AppointmentCard";
import Layout from "@/components/Managment/PageLayout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Appointment() {

  return (
    <div>
      <span className="container my-4 flex text-brand-gray">
        <Link href={`/managment`} className="underline">
          Managment
        </Link>
        <span className="flex">
          <ChevronRight />
          <span className="">Appointments</span>
        </span>
      </span>
      <Layout>
        <AppointmentsList  />
      </Layout>
    </div>
  );
}
