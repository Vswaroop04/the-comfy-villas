import Managment from "@/components/Managment";
import { SmilePlus, User2 } from "lucide-react";

export default function page() {
  return (
    <div className="mt-44 mx-14">
      <div className="flex justify-center align-middle text-4xl rounded-lg outline-1">
        Hi Managment <User2 size={40} />
      </div>
      <Managment />
    </div>
  );
}
