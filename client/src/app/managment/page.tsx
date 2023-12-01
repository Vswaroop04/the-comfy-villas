import Managment from "@/components/Managment";
import { Smile, User } from "lucide-react";

export default function Page() {
  return (
    <div className="mt-40 mx-10">
      <div className="flex items-center justify-center space-x-4 bg-yellow-100 p-6 rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800">Hi Management</h1>
        <User size={48} className="text-indigo-600" />
        <Smile size={48} className="text-yellow-400" />
      </div>
      <Managment />
    </div>
  );
}
