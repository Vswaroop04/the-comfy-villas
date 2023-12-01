import AppointmentsList from "@/components/Managment/AppointmentCard";
import Layout from "@/components/Managment/PageLayout";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Resident from "@/components/Managment/Resident";

export default function Appointment() {
  return (
    <div>
      <span className="mt-44 container my-4 flex text-brand-gray">
        <Link href={`/managment`} className="underline">
          Managment
        </Link>
        <span className="flex">
          <ChevronRight />
          <span className="">Residents</span>
        </span>
      </span>
      <Layout>
        <Resident />
      </Layout>
    </div>
  );
}
