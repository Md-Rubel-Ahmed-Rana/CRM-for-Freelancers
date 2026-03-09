import { LogOut } from "lucide-react";
import { toast } from "react-toastify";

const Logout = () => {
  const handleLogout = () => {
    toast.info("Logout feature is coming soon. Stay tuned!");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
};

export default Logout;
